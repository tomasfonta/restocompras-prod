
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
import { Dish } from '../types/Dish';
import { useUser } from '../contexts/UserContext';
import { useData } from '../contexts/DataContext';
import DishForm from './DishForm';

const MenuManagement = () => {
  const { currentUser } = useUser();
  const { getDishesByUser, addDish, updateDish, deleteDish } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | undefined>();

  // Get dishes for current user
  const userDishes = currentUser ? getDishesByUser(currentUser.id) : [];

  const handleAddDish = () => {
    setEditingDish(undefined);
    setShowForm(true);
  };

  const handleEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setShowForm(true);
  };

  const handleDeleteDish = (dishId: string) => {
    deleteDish(dishId);
  };

  const handleSaveDish = (dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingDish) {
      // Update existing dish
      updateDish(editingDish.id, dishData);
    } else {
      // Add new dish
      addDish(dishData);
    }
    setShowForm(false);
    setEditingDish(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDish(undefined);
  };

  if (showForm) {
    return (
      <DishForm
        dish={editingDish}
        onSave={handleSaveDish}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mi Menú</h2>
        <Button onClick={handleAddDish} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Plato
        </Button>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userDishes.map((dish) => (
          <Card key={dish.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{dish.name}</CardTitle>
                <Badge variant={dish.isActive ? "default" : "secondary"}>
                  {dish.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{dish.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">${dish.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">{dish.preparationTime}min</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Ingredientes:</h4>
                <div className="text-xs text-gray-600">
                  {dish.ingredients.map(ing => ing.name).join(', ')}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditDish(dish)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDish(dish.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {userDishes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 mb-4">No tienes platos en tu menú aún</p>
            <Button onClick={handleAddDish} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar tu primer plato
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MenuManagement;
