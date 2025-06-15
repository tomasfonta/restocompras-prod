
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Calculator, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useTranslation } from '../contexts/LanguageContext';

interface IngredientCostAnalysisProps {
  products: Product[];
  dishes: Dish[];
}

interface AnalysisIngredient {
  productId: string;
  product: Product;
  quantityNeeded: number;
  unit: string;
  cost: number;
  suppliers: Product[];
  selectedSupplierId: string;
}

const IngredientCostAnalysis = ({ products = [], dishes = [] }: IngredientCostAnalysisProps) => {
  const { t } = useTranslation();
  const { addToCart } = useShoppingCart();
  const [selectedDish, setSelectedDish] = useState<string>('');
  const [analysisIngredients, setAnalysisIngredients] = useState<AnalysisIngredient[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  // Get unique products by name (combining from different suppliers)
  const getUniqueProducts = () => {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    
    const uniqueProducts = new Map<string, Product[]>();
    
    products.forEach(product => {
      const key = `${product.name}-${product.dimension}`;
      if (!uniqueProducts.has(key)) {
        uniqueProducts.set(key, []);
      }
      uniqueProducts.get(key)?.push(product);
    });
    
    return Array.from(uniqueProducts.entries()).map(([key, suppliers]) => ({
      name: suppliers[0].name,
      dimension: suppliers[0].dimension,
      suppliers: suppliers.sort((a, b) => a.price - b.price) // Sort by price
    }));
  };

  const addIngredient = () => {
    const uniqueProducts = getUniqueProducts();
    if (uniqueProducts.length === 0) return;

    const firstProduct = uniqueProducts[0];
    const cheapestSupplier = firstProduct.suppliers[0];
    
    const newIngredient: AnalysisIngredient = {
      productId: `${Date.now()}`,
      product: cheapestSupplier,
      quantityNeeded: 1,
      unit: cheapestSupplier.dimension,
      cost: cheapestSupplier.price,
      suppliers: firstProduct.suppliers,
      selectedSupplierId: cheapestSupplier.id
    };
    
    setAnalysisIngredients([...analysisIngredients, newIngredient]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = analysisIngredients.filter((_, i) => i !== index);
    setAnalysisIngredients(newIngredients);
  };

  const updateIngredientProduct = (index: number, productName: string) => {
    const uniqueProducts = getUniqueProducts();
    const selectedProduct = uniqueProducts.find(p => p.name === productName);
    
    if (!selectedProduct) return;
    
    const cheapestSupplier = selectedProduct.suppliers[0];
    const newIngredients = [...analysisIngredients];
    newIngredients[index] = {
      ...newIngredients[index],
      product: cheapestSupplier,
      suppliers: selectedProduct.suppliers,
      selectedSupplierId: cheapestSupplier.id,
      unit: cheapestSupplier.dimension,
      cost: cheapestSupplier.price * newIngredients[index].quantityNeeded
    };
    setAnalysisIngredients(newIngredients);
  };

  const updateIngredientSupplier = (index: number, supplierId: string) => {
    const ingredient = analysisIngredients[index];
    const selectedSupplier = ingredient.suppliers.find(s => s.id === supplierId);
    
    if (!selectedSupplier) return;
    
    const newIngredients = [...analysisIngredients];
    newIngredients[index] = {
      ...newIngredients[index],
      product: selectedSupplier,
      selectedSupplierId: supplierId,
      cost: selectedSupplier.price * newIngredients[index].quantityNeeded
    };
    setAnalysisIngredients(newIngredients);
  };

  const updateIngredientQuantity = (index: number, quantity: number) => {
    const newIngredients = [...analysisIngredients];
    newIngredients[index] = {
      ...newIngredients[index],
      quantityNeeded: quantity,
      cost: newIngredients[index].product.price * quantity
    };
    setAnalysisIngredients(newIngredients);
  };

  const loadDishIngredients = (dishId: string) => {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;

    const uniqueProducts = getUniqueProducts();
    const dishIngredients: AnalysisIngredient[] = dish.ingredients.map(ingredient => {
      const matchingProduct = uniqueProducts.find(p => 
        p.name.toLowerCase().includes(ingredient.name.toLowerCase()) ||
        ingredient.name.toLowerCase().includes(p.name.toLowerCase())
      );
      
      if (matchingProduct) {
        const cheapestSupplier = matchingProduct.suppliers[0];
        return {
          productId: `${ingredient.id}-${Date.now()}`,
          product: cheapestSupplier,
          quantityNeeded: ingredient.quantity,
          unit: ingredient.unit,
          cost: cheapestSupplier.price * ingredient.quantity,
          suppliers: matchingProduct.suppliers,
          selectedSupplierId: cheapestSupplier.id
        };
      } else {
        // If no matching product found, create a placeholder
        const defaultProduct: Product = {
          id: `placeholder-${ingredient.id}`,
          name: ingredient.name,
          size: 1,
          dimension: ingredient.unit,
          brand: 'No disponible',
          price: 0,
          category: 'Sin categoría',
          quality: 'Media',
          deliveryDays: 1,
          supplierId: 'unknown',
          supplierName: 'Proveedor no encontrado',
          inStock: false,
          lastUpdated: new Date().toISOString(),
          imageUrl: ''
        };
        
        return {
          productId: `${ingredient.id}-${Date.now()}`,
          product: defaultProduct,
          quantityNeeded: ingredient.quantity,
          unit: ingredient.unit,
          cost: 0,
          suppliers: [defaultProduct],
          selectedSupplierId: defaultProduct.id
        };
      }
    });
    
    setAnalysisIngredients(dishIngredients);
  };

  const addToShoppingCart = (ingredient: AnalysisIngredient) => {
    if (ingredient.product.id.startsWith('placeholder-')) {
      return; // Don't add placeholder products
    }
    
    addToCart(ingredient.product, ingredient.quantityNeeded);
  };

  useEffect(() => {
    const total = analysisIngredients.reduce((sum, ingredient) => sum + ingredient.cost, 0);
    setTotalCost(total);
  }, [analysisIngredients]);

  const uniqueProducts = getUniqueProducts();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('costAnalysis.title')}</h2>
          <p className="text-gray-600">{t('costAnalysis.subtitle')}</p>
        </div>
      </div>

      {/* Dish Selection */}
      {dishes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-amber-600" />
              {t('costAnalysis.loadFromDish')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="dish-select">{t('costAnalysis.selectDish')}</Label>
                <Select value={selectedDish} onValueChange={setSelectedDish}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('costAnalysis.selectDishPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {dishes.map(dish => (
                      <SelectItem key={dish.id} value={dish.id}>
                        {dish.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={() => selectedDish && loadDishIngredients(selectedDish)}
                  disabled={!selectedDish}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {t('costAnalysis.loadIngredients')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ingredients Analysis */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('costAnalysis.ingredientAnalysis')}</CardTitle>
            <Button onClick={addIngredient} size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              {t('costAnalysis.addIngredient')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {analysisIngredients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>{t('costAnalysis.noIngredients')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analysisIngredients.map((ingredient, index) => (
                <div key={ingredient.productId} className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <Label>{t('costAnalysis.product')}</Label>
                      <Select 
                        value={ingredient.product.name} 
                        onValueChange={(value) => updateIngredientProduct(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {uniqueProducts.map(product => (
                            <SelectItem key={product.name} value={product.name}>
                              {product.name} ({product.dimension})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{t('costAnalysis.supplier')}</Label>
                      <Select 
                        value={ingredient.selectedSupplierId} 
                        onValueChange={(value) => updateIngredientSupplier(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {ingredient.suppliers.map(supplier => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.supplierName} - ${supplier.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{t('costAnalysis.quantity')}</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={ingredient.quantityNeeded}
                        onChange={(e) => updateIngredientQuantity(index, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div>
                      <Label>{t('costAnalysis.totalCost')}</Label>
                      <div className="flex items-center h-10 px-3 bg-gray-50 border rounded-md">
                        <span className="font-semibold">${ingredient.cost.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToShoppingCart(ingredient)}
                        disabled={ingredient.product.id.startsWith('placeholder-')}
                        className="hover:bg-green-50 text-green-600"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeIngredient(index)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Total Cost Summary */}
      {analysisIngredients.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('costAnalysis.totalRecipeCost')}</h3>
                <p className="text-gray-600">{analysisIngredients.length} {t('costAnalysis.ingredients')}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">${totalCost.toFixed(2)}</div>
                <Badge variant="secondary" className="mt-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {t('costAnalysis.optimized')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IngredientCostAnalysis;
