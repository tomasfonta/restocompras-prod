
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, ChefHat, Clock, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DishForm from './DishForm';
import { Dish } from '../types/Dish';

// Sample data for dishes
const sampleDishes: Dish[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Pizza clásica con tomate, mozzarella y albahaca fresca',
    category: 'Pizzas',
    price: 850,
    preparationTime: 15,
    isActive: true,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    ingredients: [
      { id: '1', name: 'Masa de pizza', quantity: 1, unit: 'porción', category: 'Base', cost: 50 },
      { id: '2', name: 'Salsa de tomate', quantity: 100, unit: 'ml', category: 'Salsa', cost: 30 },
      { id: '3', name: 'Mozzarella', quantity: 150, unit: 'g', category: 'Queso', cost: 120 },
      { id: '4', name: 'Albahaca', quantity: 5, unit: 'hojas', category: 'Hierbas', cost: 10 }
    ]
  },
  {
    id: '2',
    name: 'Ensalada César',
    description: 'Lechuga romana, pollo grillado, parmesano y aderezo césar',
    category: 'Ensaladas',
    price: 650,
    preparationTime: 10,
    isActive: true,
    createdAt: '2024-06-02T11:00:00Z',
    updatedAt: '2024-06-02T11:00:00Z',
    ingredients: [
      { id: '5', name: 'Lechuga romana', quantity: 200, unit: 'g', category: 'Verduras', cost: 40 },
      { id: '6', name: 'Pechuga de pollo', quantity: 150, unit: 'g', category: 'Proteína', cost: 180 },
      { id: '7', name: 'Queso parmesano', quantity: 50, unit: 'g', category: 'Queso', cost: 80 },
      { id: '8', name: 'Aderezo césar', quantity: 50, unit: 'ml', category: 'Aderezo', cost: 25 }
    ]
  }
];

const MenuManagement = () => {
  const [dishes, setDishes] = useState<Dish[]>(sampleDishes);
  const [showDishForm, setShowDishForm] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDish = (dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDish: Dish = {
      ...dishData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDishes(prev => [...prev, newDish]);
    setShowDishForm(false);
  };

  const handleUpdateDish = (id: string, dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => {
    setDishes(prev => prev.map(d => 
      d.id === id 
        ? { ...dishData, id, createdAt: d.createdAt, updatedAt: new Date().toISOString() }
        : d
    ));
    setShowDishForm(false);
    setEditingDish(null);
  };

  const handleEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setShowDishForm(true);
  };

  const handleDeleteDish = (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  const calculateDishCost = (dish: Dish) => {
    return dish.ingredients.reduce((total, ingredient) => total + (ingredient.cost || 0), 0);
  };

  const totalDishes = dishes.length;
  const activeDishes = dishes.filter(d => d.isActive).length;
  const avgPrice = dishes.length > 0 ? dishes.reduce((sum, d) => sum + d.price, 0) / dishes.length : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">{totalDishes}</CardTitle>
            <CardDescription className="text-gray-600">Total de Platos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <ChefHat className="w-4 h-4 mr-1" />
              En menú
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">{activeDishes}</CardTitle>
            <CardDescription className="text-gray-600">Platos Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <ChefHat className="w-4 h-4 mr-1" />
              Disponibles
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(0)}</CardTitle>
            <CardDescription className="text-gray-600">Precio Promedio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="w-4 h-4 mr-1" />
              Por plato
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Mis Platos</h3>
          <p className="text-gray-600">Gestiona los platos de tu menú</p>
        </div>
        <Button 
          onClick={() => setShowDishForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Plato
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar platos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Dish Form */}
      {showDishForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingDish ? 'Editar Plato' : 'Nuevo Plato'}</CardTitle>
          </CardHeader>
          <CardContent>
            <DishForm
              initialData={editingDish}
              onSubmit={editingDish 
                ? (data) => handleUpdateDish(editingDish.id, data)
                : handleAddDish
              }
              onCancel={() => {
                setShowDishForm(false);
                setEditingDish(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <Card key={dish.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{dish.name}</CardTitle>
                  <Badge 
                    variant={dish.isActive ? "default" : "secondary"}
                    className={dish.isActive ? "bg-green-500" : ""}
                  >
                    {dish.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditDish(dish)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteDish(dish.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{dish.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-amber-600">${dish.price}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {dish.preparationTime} min
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ingredientes:</span>
                  <span className="font-medium">{dish.ingredients.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Costo estimado:</span>
                  <span className="font-medium text-green-600">${calculateDishCost(dish)}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Categoría: <span className="font-medium">{dish.category}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay platos</h3>
            <p className="text-gray-600">
              {searchTerm ? 'No se encontraron platos que coincidan con tu búsqueda' : 'Agrega tu primer plato al menú'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MenuManagement;
