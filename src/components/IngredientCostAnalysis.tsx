import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useTranslation } from '../contexts/LanguageContext';

interface IngredientCostAnalysisProps {
  dishes: Dish[];
  products: Product[];
}

interface CostAnalysis {
  ingredientName: string;
  currentCost: number;
  cheapestAlternative: Product | null;
  potentialSavings: number;
  savingsPercentage: number;
  monthlyQuantityNeeded: number;
}

const IngredientCostAnalysis = ({ dishes, products }: { dishes: Dish[]; products: Product[] }) => {
  const { addToCart } = useShoppingCart();
  const { t } = useTranslation();

  const calculateCostAnalysis = (): CostAnalysis[] => {
    const analysisMap = new Map<string, {
      currentCost: number;
      totalQuantity: number;
      alternatives: Product[];
    }>();

    dishes.forEach(dish => {
      dish.ingredients.forEach(ingredient => {
        const monthlyQuantity = (ingredient.quantity * dish.monthlyServings) || 0;
        
        if (!analysisMap.has(ingredient.name)) {
          analysisMap.set(ingredient.name, {
            currentCost: ingredient.cost,
            totalQuantity: monthlyQuantity,
            alternatives: []
          });
        } else {
          const existing = analysisMap.get(ingredient.name)!;
          existing.totalQuantity += monthlyQuantity;
        }

        // Find alternative products
        const alternatives = products.filter(product => 
          product.name.toLowerCase().includes(ingredient.name.toLowerCase()) ||
          ingredient.name.toLowerCase().includes(product.name.toLowerCase().split(' ')[0])
        );
        
        if (alternatives.length > 0) {
          analysisMap.get(ingredient.name)!.alternatives = alternatives;
        }
      });
    });

    return Array.from(analysisMap.entries()).map(([ingredientName, data]) => {
      const cheapestAlternative = data.alternatives.length > 0 
        ? data.alternatives.reduce((cheapest, current) => 
            current.price < cheapest.price ? current : cheapest
          )
        : null;

      const potentialSavings = cheapestAlternative 
        ? Math.max(0, (data.currentCost - cheapestAlternative.price) * data.totalQuantity)
        : 0;

      const savingsPercentage = data.currentCost > 0 
        ? (potentialSavings / (data.currentCost * data.totalQuantity)) * 100 
        : 0;

      return {
        ingredientName,
        currentCost: data.currentCost,
        cheapestAlternative,
        potentialSavings,
        savingsPercentage,
        monthlyQuantityNeeded: data.totalQuantity
      };
    }).sort((a, b) => b.potentialSavings - a.potentialSavings);
  };

  const handleAddToCart = (alternative: Product, quantity: number) => {
    addToCart(alternative, quantity);
  };

  const costAnalysis = calculateCostAnalysis();
  const totalSavings = costAnalysis.reduce((sum, item) => sum + item.potentialSavings, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t('ingredientCostAnalysis')}
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <TrendingDown className="w-5 h-5 mr-2" />
              <span className="text-lg font-semibold">
                ${totalSavings.toFixed(2)} {t('totalPotentialSavings')}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('ingredient')}</TableHead>
                <TableHead>{t('currentCost')}</TableHead>
                <TableHead>{t('cheapestAlternative')}</TableHead>
                <TableHead>{t('monthlyQuantity')}</TableHead>
                <TableHead>{t('potentialSavings')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costAnalysis.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.ingredientName}</TableCell>
                  <TableCell>${item.currentCost.toFixed(2)}</TableCell>
                  <TableCell>
                    {item.cheapestAlternative ? (
                      <div className="space-y-1">
                        <div className="font-medium">{item.cheapestAlternative.name}</div>
                        <div className="text-sm text-gray-600">
                          ${item.cheapestAlternative.price.toFixed(2)} - {item.cheapestAlternative.supplierName}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">{t('noAlternativeFound')}</span>
                    )}
                  </TableCell>
                  <TableCell>{item.monthlyQuantityNeeded.toFixed(1)}</TableCell>
                  <TableCell>
                    {item.potentialSavings > 0 ? (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          ${item.potentialSavings.toFixed(2)}
                        </Badge>
                        <span className="text-sm text-green-600">
                          ({item.savingsPercentage.toFixed(1)}%)
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {t('noSavings')}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.cheapestAlternative && item.potentialSavings > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToCart(item.cheapestAlternative!, item.monthlyQuantityNeeded)}
                        className="flex items-center space-x-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{t('addToCart')}</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientCostAnalysis;
