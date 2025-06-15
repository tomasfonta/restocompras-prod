import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingDown, TrendingUp, AlertTriangle, Search, Filter } from "lucide-react";
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';
import { getProductImage } from '../utils/productImages';

interface IngredientCostAnalysisProps {
  products: Product[];
  dishes: Dish[];
}

interface IngredientUsage {
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  totalUsed: number;
  dimension: string;
  averagePrice: number;
  totalCost: number;
  usedInDishes: string[];
}

interface CostOptimization {
  productName: string;
  currentSupplier: string;
  currentPrice: number;
  bestAlternative: {
    supplier: string;
    price: number;
    savings: number;
    savingsPercentage: number;
  };
}

const getUniqueProducts = (products: Product[]): Product[] => {
  if (!products || !Array.isArray(products)) {
    return [];
  }
  
  const uniqueMap = new Map();
  products.forEach(product => {
    const key = `${product.name}-${product.brand}`;
    if (!uniqueMap.has(key) || uniqueMap.get(key).price > product.price) {
      uniqueMap.set(key, product);
    }
  });
  return Array.from(uniqueMap.values());
};

const IngredientCostAnalysis = ({ products = [], dishes = [] }: IngredientCostAnalysisProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const uniqueProducts = useMemo(() => getUniqueProducts(products), [products]);
  
  const ingredientUsage = useMemo((): IngredientUsage[] => {
    const usageMap = new Map<string, IngredientUsage>();
    
    dishes.forEach(dish => {
      dish.ingredients?.forEach(ingredient => {
        const product = uniqueProducts.find(p => p.id === ingredient.productId);
        if (product) {
          const key = `${product.name}-${product.brand}`;
          const existing = usageMap.get(key);
          
          if (existing) {
            existing.totalUsed += ingredient.quantity;
            existing.totalCost += ingredient.quantity * product.price;
            if (!existing.usedInDishes.includes(dish.name)) {
              existing.usedInDishes.push(dish.name);
            }
          } else {
            usageMap.set(key, {
              productId: product.id,
              productName: product.name,
              productImage: getProductImage(product),
              brand: product.brand,
              totalUsed: ingredient.quantity,
              dimension: product.dimension,
              averagePrice: product.price,
              totalCost: ingredient.quantity * product.price,
              usedInDishes: [dish.name]
            });
          }
        }
      });
    });
    
    return Array.from(usageMap.values()).sort((a, b) => b.totalCost - a.totalCost);
  }, [uniqueProducts, dishes]);

  const costOptimizations = useMemo((): CostOptimization[] => {
    const optimizations: CostOptimization[] = [];
    
    ingredientUsage.forEach(usage => {
      const alternatives = products.filter(p => 
        p.name === usage.productName && 
        p.brand !== usage.brand &&
        p.price < usage.averagePrice
      );
      
      if (alternatives.length > 0) {
        const bestAlternative = alternatives.reduce((best, current) => 
          current.price < best.price ? current : best
        );
        
        const savings = usage.averagePrice - bestAlternative.price;
        const savingsPercentage = (savings / usage.averagePrice) * 100;
        
        optimizations.push({
          productName: usage.productName,
          currentSupplier: usage.brand,
          currentPrice: usage.averagePrice,
          bestAlternative: {
            supplier: bestAlternative.brand,
            price: bestAlternative.price,
            savings,
            savingsPercentage
          }
        });
      }
    });
    
    return optimizations.sort((a, b) => b.bestAlternative.savings - a.bestAlternative.savings);
  }, [ingredientUsage, products]);

  const totalMonthlyCost = ingredientUsage.reduce((sum, usage) => sum + usage.totalCost, 0);
  const potentialSavings = costOptimizations.reduce((sum, opt) => sum + opt.bestAlternative.savings, 0);

  const filteredUsage = ingredientUsage.filter(usage => {
    const matchesSearch = usage.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usage.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Análisis de Costos de Ingredientes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Optimiza tus costos analizando el uso y precios de ingredientes
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Costo Total Mensual</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${totalMonthlyCost.toFixed(2)}
                </p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ahorro Potencial</p>
                <p className="text-2xl font-bold text-green-600">
                  ${potentialSavings.toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Productos Analizados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {ingredientUsage.length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="usage">Uso de Ingredientes</TabsTrigger>
          <TabsTrigger value="optimization">Optimización de Costos</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Usage Table */}
          <Card>
            <CardHeader>
              <CardTitle>Uso de Ingredientes por Plato</CardTitle>
              <CardDescription>
                Análisis detallado del consumo y costo de cada ingrediente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Ingrediente</th>
                      <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Cantidad Usada</th>
                      <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Precio Promedio</th>
                      <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Costo Total</th>
                      <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Platos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsage.map((usage, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={usage.productImage} 
                              alt={usage.productName}
                              className="w-10 h-10 object-cover rounded border border-gray-200 dark:border-gray-700"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';
                              }}
                            />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">{usage.productName}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{usage.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {usage.totalUsed} {usage.dimension}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            ${usage.averagePrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-red-600 dark:text-red-400">
                            ${usage.totalCost.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {usage.usedInDishes.slice(0, 3).map((dish, dishIndex) => (
                              <Badge key={dishIndex} variant="outline" className="text-xs">
                                {dish}
                              </Badge>
                            ))}
                            {usage.usedInDishes.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{usage.usedInDishes.length - 3} más
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Oportunidades de Ahorro
              </CardTitle>
              <CardDescription>
                Compara precios entre proveedores para optimizar costos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {costOptimizations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>No se encontraron oportunidades de ahorro</p>
                  <p className="text-sm">Ya estás usando los mejores precios disponibles</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {costOptimizations.map((opt, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{opt.productName}</h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Ahorro: ${opt.bestAlternative.savings.toFixed(2)} ({opt.bestAlternative.savingsPercentage.toFixed(1)}%)
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Proveedor actual:</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {opt.currentSupplier} - ${opt.currentPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Mejor alternativa:</p>
                          <p className="font-medium text-green-600 dark:text-green-400">
                            {opt.bestAlternative.supplier} - ${opt.bestAlternative.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IngredientCostAnalysis;
