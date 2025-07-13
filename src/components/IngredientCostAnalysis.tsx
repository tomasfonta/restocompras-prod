
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingDown, TrendingUp, AlertTriangle, Search, Filter, ShoppingCart } from "lucide-react";
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';
import { getProductImage } from '../utils/productImages';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useToast } from '@/hooks/use-toast';

interface IngredientCostAnalysisProps {
  products: Product[];
  dishes: Dish[];
}

interface IngredientUsage {
  name: string;
  productImage: string;
  currentCost: number;
  quantity: number;
  unit: string;
  dishes: Array<{
    name: string;
    monthlyServings: number;
  }>;
  totalMonthlyServings: number;
  cheapestAlternative: Product | null;
  potentialSavingsPerUnit: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
}

const conversionFactors: { [key: string]: { baseUnit: string; factor: number } } = {
  // Weight -> base: 'g'
  g: { baseUnit: 'g', factor: 1 },
  gramo: { baseUnit: 'g', factor: 1 },
  gramos: { baseUnit: 'g', factor: 1 },
  kg: { baseUnit: 'g', factor: 1000 },
  kilogramo: { baseUnit: 'g', factor: 1000 },
  kilogramos: { baseUnit: 'g', factor: 1000 },

  // Volume -> base: 'ml'
  ml: { baseUnit: 'ml', factor: 1 },
  "ml.": { baseUnit: "ml", factor: 1 },
  mililitro: { baseUnit: 'ml', factor: 1 },
  mililitros: { baseUnit: 'ml', factor: 1 },
  l: { baseUnit: 'ml', factor: 1000 },
  "l.": { baseUnit: "ml", factor: 1000 },
  litro: { baseUnit: 'ml', factor: 1000 },
  litros: { baseUnit: 'ml', factor: 1000 },
  L: { baseUnit: 'ml', factor: 1000 },

  // Count -> base: 'unidad'
  c: { baseUnit: 'unidad', factor: 1 },
  C: { baseUnit: 'unidad', factor: 1 },
  unit: { baseUnit: 'unidad', factor: 1 },
  units: { baseUnit: 'unidad', factor: 1 },
  unidad: { baseUnit: 'unidad', factor: 1 },
  unidades: { baseUnit: 'unidad', factor: 1 },
};

const getUnitInBase = (quantity: number, unit: string | undefined) => {
  if (!unit) return { value: quantity, baseUnit: 'unidad' };
  const unitLower = unit.toLowerCase().trim();
  const conversion = conversionFactors[unitLower];
  if (conversion) {
    return {
      value: quantity * conversion.factor,
      baseUnit: conversion.baseUnit,
    };
  }
  return { value: quantity, baseUnit: unitLower };
};

const IngredientCostAnalysis = ({ products = [], dishes = [] }: IngredientCostAnalysisProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useShoppingCart();
  const { toast } = useToast();
  
  const ingredientAnalysis = useMemo((): IngredientUsage[] => {
    const ingredientMap = new Map();

    // Agrupar ingredientes por nombre
    dishes.forEach(dish => {
      dish.ingredients?.forEach(ingredient => {
        const key = ingredient.name.toLowerCase().trim();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, {
            name: ingredient.name,
            currentCost: ingredient.cost || 0,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            dishes: [{
              name: dish.name,
              monthlyServings: dish.monthlyServings || 1
            }],
            totalMonthlyServings: dish.monthlyServings || 1
          });
        } else {
          const existing = ingredientMap.get(key);
          existing.dishes.push({
            name: dish.name,
            monthlyServings: dish.monthlyServings || 1
          });
          existing.totalMonthlyServings += dish.monthlyServings || 1;
          if (ingredient.cost && ingredient.cost > existing.currentCost) {
            existing.currentCost = ingredient.cost;
          }
        }
      });
    });

    // Analizar cada ingrediente para encontrar alternativas más baratas
    const analysis = Array.from(ingredientMap.values()).map(ingredient => {
      // Convertir ingrediente a unidad base
      const { value: ingQtyInBase, baseUnit: ingBaseUnit } = getUnitInBase(
        ingredient.quantity,
        ingredient.unit
      );

      if (ingQtyInBase === 0 || !ingBaseUnit || ingredient.currentCost === 0) {
        return {
          ...ingredient,
          productImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
          cheapestAlternative: null,
          potentialSavingsPerUnit: 0,
          monthlySavings: 0,
          annualSavings: 0,
          savingsPercentage: 0
        };
      }

      const ingredientCostPerBaseUnit = ingredient.currentCost / ingQtyInBase;

      // Buscar productos compatibles
      const ingredientKeyword = ingredient.name.toLowerCase().split(' ')[0];
      const similarProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        return (
          productName.includes(ingredient.name.toLowerCase()) ||
          ingredient.name.toLowerCase().includes(productName.split(' ')[0]) ||
          productName.includes(ingredientKeyword)
        );
      });

      // Filtrar productos con unidad base compatible
      const compatibleAlternatives = similarProducts
        .map(product => {
          const { value: productQtyInBase, baseUnit: productBaseUnit } = getUnitInBase(
            product.size,
            product.dimension
          );
          if (productQtyInBase > 0 && productBaseUnit === ingBaseUnit) {
            return {
              product,
              costPerBaseUnit: product.price / productQtyInBase,
            };
          }
          return null;
        })
        .filter(Boolean);

      let cheapestAlternative = null;
      let potentialSavingsPerUnit = 0;
      let monthlySavings = 0;
      let annualSavings = 0;
      let savingsPercentage = 0;

      if (compatibleAlternatives.length > 0) {
        const cheapest = compatibleAlternatives.reduce((min, current) =>
          current.costPerBaseUnit < min.costPerBaseUnit ? current : min
        );

      // Solo si es más barato
      if (cheapest.costPerBaseUnit < ingredientCostPerBaseUnit) {
        cheapestAlternative = cheapest.product;
        const savingsPerBaseUnit = ingredientCostPerBaseUnit - cheapest.costPerBaseUnit;
        potentialSavingsPerUnit = savingsPerBaseUnit * ingQtyInBase;

        if (ingredient.totalMonthlyServings > 0) {
          monthlySavings = potentialSavingsPerUnit * ingredient.totalMonthlyServings;
          annualSavings = monthlySavings * 12;
        }
        if (ingredient.currentCost > 0) {
          savingsPercentage = (savingsPerBaseUnit / ingredientCostPerBaseUnit) * 100;
        }
      }
      }

      return {
        ...ingredient,
        productImage: getProductImage({ name: ingredient.name } as Product),
        cheapestAlternative,
        potentialSavingsPerUnit,
        monthlySavings,
        annualSavings,
        savingsPercentage,
      };
    });

    return analysis.sort((a, b) => b.monthlySavings - a.monthlySavings);
  }, [dishes, products]);

  const totalCurrentCost = ingredientAnalysis.reduce((sum, item) => sum + item.currentCost, 0);
  const totalMonthlySavings = ingredientAnalysis.reduce((sum, item) => sum + item.monthlySavings, 0);
  const totalAnnualSavings = ingredientAnalysis.reduce((sum, item) => sum + item.annualSavings, 0);

  const filteredUsage = ingredientAnalysis.filter(usage => {
    const matchesSearch = usage.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddToCart = (product: Product, ingredientName: string) => {
    addToCart(product, 1);
    toast({
      title: "Producto agregado al carrito",
      description: `${product.name} se agregó como alternativa para ${ingredientName}`,
    });
  };

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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Costo Total Actual</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${totalCurrentCost.toFixed(2)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ahorro Mensual</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalMonthlySavings.toFixed(2)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ahorro Anual</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${totalAnnualSavings.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
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

      {/* Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis Detallado de Ingredientes</CardTitle>
          <CardDescription>
            Comparación de precios y oportunidades de ahorro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Ingrediente</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Cantidad</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Costo Actual</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Mejor Alternativa</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Ahorro %</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Ahorro Mensual</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Ahorro Anual</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Platos</th>
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsage.map((usage, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={usage.productImage} 
                          alt={usage.name}
                          className="w-10 h-10 object-cover rounded border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';
                          }}
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{usage.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {usage.quantity} {usage.unit}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        ${usage.currentCost.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      {usage.cheapestAlternative ? (
                        <div>
                          <div className="font-medium text-green-600">{usage.cheapestAlternative.name}</div>
                          <div className="text-sm text-gray-500">
                            ${usage.cheapestAlternative.price} / {usage.cheapestAlternative.size}{usage.cheapestAlternative.dimension}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No encontrado</span>
                      )}
                    </td>
                    <td className="p-4">
                      {usage.savingsPercentage > 0 ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {usage.savingsPercentage.toFixed(1)}%
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      {usage.monthlySavings > 0 ? (
                        <div className="text-green-600 font-medium">
                          ${usage.monthlySavings.toFixed(2)}
                        </div>
                      ) : (
                        <span className="text-gray-400">Sin ahorro</span>
                      )}
                    </td>
                    <td className="p-4">
                      {usage.annualSavings > 0 ? (
                        <div className="text-blue-600 font-medium">
                          ${usage.annualSavings.toFixed(2)}
                        </div>
                      ) : (
                        <span className="text-gray-400">Sin ahorro</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {usage.dishes.slice(0, 2).map(dish => (
                          <div key={dish.name}>
                            {dish.name} ({dish.monthlyServings}/mes)
                          </div>
                        ))}
                        {usage.dishes.length > 2 && (
                          <span className="text-gray-500">
                            +{usage.dishes.length - 2} más
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {usage.cheapestAlternative ? (
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(usage.cheapestAlternative!, usage.name)}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Agregar al Carro
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">No disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientCostAnalysis;
