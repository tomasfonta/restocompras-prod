
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Package } from "lucide-react";
import { Dish, Ingredient } from '../types/Dish';

const DISH_CATEGORIES = [
  'Entradas',
  'Pizzas', 
  'Pastas',
  'Carnes',
  'Pescados',
  'Ensaladas',
  'Postres',
  'Bebidas'
];

const UNITS = ['g', 'kg', 'ml', 'L', 'unidad', 'porción', 'pizca', 'cucharada', 'taza', 'hojas'];

interface DishFormProps {
  initialData?: Dish | null;
  onSubmit: (data: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const DishForm = ({ initialData, onSubmit, onCancel }: DishFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    price: initialData?.price || 0,
    preparationTime: initialData?.preparationTime || 0,
    isActive: initialData?.isActive ?? true,
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || []
  );

  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
    name: '',
    quantity: 0,
    unit: '',
    category: '',
    cost: 0,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.unit) {
      const ingredient: Ingredient = {
        ...newIngredient,
        id: Date.now().toString(),
      };
      setIngredients(prev => [...prev, ingredient]);
      setNewIngredient({
        name: '',
        quantity: 0,
        unit: '',
        category: '',
        cost: 0,
      });
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleUpdateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ingredients,
    });
  };

  const totalCost = ingredients.reduce((sum, ing) => sum + (ing.cost || 0), 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Plato</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ej: Pizza Margherita"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descripción del plato..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preparationTime">Tiempo de Preparación (min)</Label>
          <Input
            id="preparationTime"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => handleInputChange('preparationTime', parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isActive">Estado</Label>
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
            <span className="text-sm">{formData.isActive ? 'Activo' : 'Inactivo'}</span>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Ingredientes
            {totalCost > 0 && (
              <Badge variant="outline" className="ml-auto bg-green-50 text-green-700">
                Costo total: ${totalCost}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Ingredient */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-4 bg-gray-50 rounded-lg">
            <Input
              placeholder="Nombre del ingrediente"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Cantidad"
              value={newIngredient.quantity || ''}
              onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
            />
            <Select value={newIngredient.unit} onValueChange={(value) => setNewIngredient(prev => ({ ...prev, unit: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Unidad" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {UNITS.map(unit => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Costo"
                value={newIngredient.cost || ''}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                step="0.01"
              />
              <Button type="button" onClick={handleAddIngredient} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="space-y-2">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                  <Input
                    value={ingredient.name}
                    onChange={(e) => handleUpdateIngredient(ingredient.id, 'name', e.target.value)}
                    placeholder="Nombre"
                  />
                  <div className="flex space-x-1">
                    <Input
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) => handleUpdateIngredient(ingredient.id, 'quantity', parseFloat(e.target.value) || 0)}
                      placeholder="Cantidad"
                    />
                    <Select 
                      value={ingredient.unit} 
                      onValueChange={(value) => handleUpdateIngredient(ingredient.id, 'unit', value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {UNITS.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    type="number"
                    value={ingredient.cost || ''}
                    onChange={(e) => handleUpdateIngredient(ingredient.id, 'cost', parseFloat(e.target.value) || 0)}
                    placeholder="Costo"
                    step="0.01"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {ingredients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No hay ingredientes agregados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
          {initialData ? 'Actualizar Plato' : 'Crear Plato'}
        </Button>
      </div>
    </form>
  );
};

export default DishForm;
