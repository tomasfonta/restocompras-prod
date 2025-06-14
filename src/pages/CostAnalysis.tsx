
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingDown, TrendingUp, DollarSign, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from '../contexts/UserContext';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

const CostAnalysis = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { getDishesByUser, products } = useData();

  // Get user's dishes and extract all ingredients
  const userDishes = currentUser ? getDishesByUser(currentUser.id) : [];
  
  const ingredientAnalysis = useMemo(() => {
    const ingredientMap = new Map();
    
    // Collect all ingredients from user's dishes
    userDishes.forEach(dish => {
      dish.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, {
            name: ingredient.name,
            currentCost: ingredient.cost || 0,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            dishes: [dish.name]
          });
        } else {
          const existing = ingredientMap.get(key);
          existing.dishes.push(dish.name);
          // Use the higher cost if there's a difference
          if (ingredient.cost && ingredient.cost > existing.currentCost) {
            existing.currentCost = ingredient.cost;
          }
        }
      });
    });

    // Find cheapest alternatives from supplier products
    const analysis = Array.from(ingredientMap.values()).map(ingredient => {
      // Search for similar products in the supplier database
      const similarProducts = products.filter(product => 
        product.name.toLowerCase().includes(ingredient.name.toLowerCase()) ||
        ingredient.name.toLowerCase().includes(product.name.toLowerCase().split(' ')[0])
      );

      let cheapestAlternative = null;
      let potentialSavings = 0;

      if (similarProducts.length > 0) {
        // Find the cheapest alternative
        cheapestAlternative = similarProducts.reduce((cheapest, current) => 
          current.price < cheapest.price ? current : cheapest
        );

        // Calculate potential savings (simplified calculation)
        const alternativeCostPerUnit = cheapestAlternative.price / cheapestAlternative.size;
        const currentCostPerUnit = ingredient.currentCost / ingredient.quantity;
        
        if (alternativeCostPerUnit < currentCostPerUnit) {
          potentialSavings = (currentCostPerUnit - alternativeCostPerUnit) * ingredient.quantity;
        }
      }

      return {
        ...ingredient,
        cheapestAlternative,
        potentialSavings,
        savingsPercentage: ingredient.currentCost > 0 && potentialSavings > 0 
          ? (potentialSavings / ingredient.currentCost) * 100 
          : 0
      };
    });

    return analysis.sort((a, b) => b.potentialSavings - a.potentialSavings);
  }, [userDishes, products]);

  const totalCurrentCost = ingredientAnalysis.reduce((sum, item) => sum + item.currentCost, 0);
  const totalPotentialSavings = ingredientAnalysis.reduce((sum, item) => sum + item.potentialSavings, 0);

  if (!currentUser || currentUser.userType !== 'restaurant') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <p className="text-center text-gray-600">Esta página es solo para restaurantes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análisis de Costos</h1>
            <p className="text-gray-600">Compara los costos de tus ingredientes con alternativas más baratas</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Costo Total Actual</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCurrentCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                En {ingredientAnalysis.length} ingredientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ahorro Potencial</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalPotentialSavings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {totalCurrentCost > 0 ? ((totalPotentialSavings / totalCurrentCost) * 100).toFixed(1) : 0}% de ahorro posible
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingredientes</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ingredientAnalysis.length}</div>
              <p className="text-xs text-muted-foreground">
                En {userDishes.length} platos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients Analysis Table */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado de Ingredientes</CardTitle>
          </CardHeader>
          <CardContent>
            {ingredientAnalysis.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No tienes ingredientes registrados en tus platos</p>
                <Button onClick={() => navigate('/dashboard')}>
                  Ir a Gestión de Menú
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingrediente</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Costo Actual</TableHead>
                    <TableHead>Alternativa Más Barata</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Ahorro Potencial</TableHead>
                    <TableHead>Platos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredientAnalysis.map((ingredient, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{ingredient.name}</TableCell>
                      <TableCell>{ingredient.quantity} {ingredient.unit}</TableCell>
                      <TableCell>${ingredient.currentCost.toFixed(2)}</TableCell>
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
                        {ingredient.potentialSavings > 0 ? (
                          <div className="text-green-600">
                            <div className="font-medium">
                              ${ingredient.potentialSavings.toFixed(2)}
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
                        <div className="text-sm">
                          {ingredient.dishes.slice(0, 2).join(', ')}
                          {ingredient.dishes.length > 2 && (
                            <span className="text-gray-500">
                              {' '}+{ingredient.dishes.length - 2} más
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;
