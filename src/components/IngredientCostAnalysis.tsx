import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Calendar, CalendarDays, ShoppingCart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from '../contexts/UserContext';
import { useData } from '../contexts/DataContext';
import { useTranslation } from '../contexts/LanguageContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import SavingsDashboard from './SavingsDashboard';
import { toast } from "sonner";

const conversionFactors: { [key: string]: { baseUnit: string; factor: number } } = {
  g: { baseUnit: 'g', factor: 1 },
  gramo: { baseUnit: 'g', factor: 1 },
  gramos: { baseUnit: 'g', factor: 1 },
  kg: { baseUnit: 'g', factor: 1000 },
  kilogramo: { baseUnit: 'g', factor: 1000 },
  kilogramos: { baseUnit: 'g', factor: 1000 },
  ml: { baseUnit: 'ml', factor: 1 },
  "ml.": { baseUnit: "ml", factor: 1 },
  mililitro: { baseUnit: 'ml', factor: 1 },
  mililitros: { baseUnit: 'ml', factor: 1 },
  l: { baseUnit: 'ml', factor: 1000 },
  "l.": { baseUnit: "ml", factor: 1000 },
  litro: { baseUnit: 'ml', factor: 1000 },
  litros: { baseUnit: 'ml', factor: 1000 },
  c: { baseUnit: 'unidad', factor: 1 },
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

const IngredientCostAnalysis: React.FC = () => {
  const { currentUser } = useUser();
  const { getDishesByUser, products } = useData();
  const { t } = useTranslation();
  const { addToCart } = useShoppingCart();

  const userDishes = currentUser ? getDishesByUser(currentUser.id) : [];
  const dishesWithDefaultServings = userDishes.map((dish: any) => ({
    ...dish,
    monthlyServings: dish.monthlyServings ?? 1,
  }));

  const ingredientAnalysis = useMemo(() => {
    const ingredientMap = new Map();

    dishesWithDefaultServings.forEach((dish: any) => {
      dish.ingredients.forEach((ingredient: any) => {
        const key = ingredient.name.toLowerCase().trim();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, {
            name: ingredient.name,
            currentCost: ingredient.cost || 0,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            dishes: [{
              name: dish.name,
              monthlyServings: dish.monthlyServings || 1 // por defecto 1
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

    const analysis = Array.from(ingredientMap.values()).map((ingredient: any) => {
      const { value: ingQtyInBase, baseUnit: ingBaseUnit } = getUnitInBase(
        ingredient.quantity,
        ingredient.unit
      );
      if (ingQtyInBase === 0 || !ingBaseUnit || ingredient.currentCost === 0) {
        return {
          ...ingredient,
          cheapestAlternative: null,
          potentialSavingsPerUnit: 0,
          monthlySavings: 0,
          annualSavings: 0,
          savingsPercentage: 0
        };
      }
      const ingredientCostPerBaseUnit = ingredient.currentCost / ingQtyInBase;
      const ingredientKeyword = ingredient.name.toLowerCase().split(' ')[0];
      const similarProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        return (
          productName.includes(ingredient.name.toLowerCase()) ||
          ingredient.name.toLowerCase().includes(productName.split(' ')[0]) ||
          productName.includes(ingredientKeyword)
        );
      });

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
        cheapestAlternative,
        potentialSavingsPerUnit,
        monthlySavings,
        annualSavings,
        savingsPercentage,
      };
    });

    return analysis.sort((a: any, b: any) => b.monthlySavings - a.monthlySavings);
  }, [dishesWithDefaultServings, products]);

  const totalCurrentCost = ingredientAnalysis.reduce((sum, item) => sum + item.currentCost, 0);
  const totalMonthlySavings = ingredientAnalysis.reduce((sum, item) => sum + item.monthlySavings, 0);
  const totalAnnualSavings = ingredientAnalysis.reduce((sum, item) => sum + item.annualSavings, 0);

  const handleAddToCart = (product: any, monthlyServings: number) => {
    addToCart(product, 1, monthlyServings);
    toast.success(`${product.name} agregado al carrito`, {
      description: `Cantidad mensual: ${monthlyServings}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('costAnalysis.title')}</h2>
        <p className="text-gray-600">{t('costAnalysis.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('costAnalysis.currentTotalCost')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCurrentCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              En {ingredientAnalysis.length} {t('costAnalysis.ingredients')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('costAnalysis.monthlySavings')}</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalMonthlySavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {t('costAnalysis.potentialMonthlySavings')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('costAnalysis.annualSavings')}</CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalAnnualSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {t('costAnalysis.potentialAnnualSavings')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('costAnalysis.ingredientsCount')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ingredientAnalysis.length}</div>
            <p className="text-xs text-muted-foreground">
              En {userDishes.length} {t('costAnalysis.dishes')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('costAnalysis.detailedAnalysis')}</CardTitle>
        </CardHeader>
        <CardContent>
          {ingredientAnalysis.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">{t('costAnalysis.noIngredients')}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingrediente</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Costo Actual</TableHead>
                  <TableHead>Porciones/Mes</TableHead>
                  <TableHead>Alternativa Más Barata</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Ahorro Mensual</TableHead>
                  <TableHead>Ahorro Anual</TableHead>
                  <TableHead>Platos</TableHead>
                  <TableHead>Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredientAnalysis.map((ingredient: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity} {ingredient.unit}</TableCell>
                    <TableCell>${ingredient.currentCost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ingredient.totalMonthlyServings}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ingredient.cheapestAlternative ? (
                        <div>
                          <div className="font-medium">{ingredient.cheapestAlternative.name}</div>
                          <div className="text-sm text-gray-500">
                            ${ingredient.cheapestAlternative.price} / {ingredient.cheapestAlternative.size}{ingredient.cheapestAlternative.dimension}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No encontrado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {ingredient.cheapestAlternative ? (
                        <div className="text-sm">
                          <div>{ingredient.cheapestAlternative.supplierName}</div>
                          <Badge variant="outline" className="mt-1">
                            {ingredient.cheapestAlternative.deliveryDays} días
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {ingredient.monthlySavings > 0 ? (
                        <div className="text-green-600">
                          <div className="font-medium">
                            ${ingredient.monthlySavings.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            ({ingredient.savingsPercentage.toFixed(1)}%)
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Sin ahorro</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {ingredient.annualSavings > 0 ? (
                        <div className="text-blue-600 font-medium">
                          ${ingredient.annualSavings.toFixed(2)}
                        </div>
                      ) : (
                        <span className="text-gray-400">Sin ahorro</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {ingredient.dishes.slice(0, 2).map((dish: any) => (
                          <div key={dish.name}>
                            {dish.name} ({dish.monthlyServings}/mes)
                          </div>
                        ))}
                        {ingredient.dishes.length > 2 && (
                          <span className="text-gray-500">
                            +{ingredient.dishes.length - 2} más
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {ingredient.cheapestAlternative ? (
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(ingredient.cheapestAlternative, ingredient.totalMonthlyServings)}
                          className="flex items-center space-x-1"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Agregar</span>
                        </Button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Savings Dashboard */}
      {totalMonthlySavings > 0 && (
        <SavingsDashboard totalMonthlySavings={totalMonthlySavings} />
      )}
    </div>
  );
};

export default IngredientCostAnalysis;
