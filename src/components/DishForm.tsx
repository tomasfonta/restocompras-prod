
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Dish, Ingredient } from '../types/Dish';
import { useUser } from '../contexts/UserContext';

interface DishFormProps {
  dish?: Dish;
  onSave: (dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const DishForm: React.FC<DishFormProps> = ({ dish, onSave, onCancel }) => {
  const { currentUser } = useUser();
  const [name, setName] = useState(dish?.name || '');
  const [description, setDescription] = useState(dish?.description || '');
  const [price, setPrice] = useState(dish?.price || 0);
  const [preparationTime, setPreparationTime] = useState(dish?.preparationTime || 0);
  const [monthlyServings, setMonthlyServings] = useState(dish?.monthlyServings || 0);
  const [isActive, setIsActive] = useState(dish?.isActive ?? true);
  const [ingredients, setIngredients] = useState<Ingredient[]>(dish?.ingredients || []);
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
    name: '',
    quantity: 0,
    unit: '',
    cost: 0
  });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity > 0) {
      const ingredient: Ingredient = {
        ...newIngredient,
        id: Date.now().toString()
      };
      setIngredients([...ingredients, ingredient]);
      setNewIngredient({
        name: '',
        quantity: 0,
        unit: '',
        cost: 0
      });
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Omit<Ingredient, 'id'>, value: any) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    onSave({
      name,
      description,
      price,
      preparationTime,
      monthlyServings,
      ingredients,
      isActive,
      userId: currentUser.id
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dish ? 'Editar Plato' : 'Nuevo Plato'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre del Plato</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preparationTime">Tiempo de Preparación (minutos)</Label>
              <Input
                id="preparationTime"
                type="number"
                value={preparationTime}
                onChange={(e) => setPreparationTime(parseInt(e.target.value))}
                required
              />
            </div>

            <div>
              <Label htmlFor="monthlyServings">Porciones Mensuales Promedio</Label>
              <Input
                id="monthlyServings"
                type="number"
                value={monthlyServings}
                onChange={(e) => setMonthlyServings(parseInt(e.target.value))}
                placeholder="¿Cuántas veces al mes sirves este plato?"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="isActive">Plato Activo</Label>
          </div>

          {/* Ingredients Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ingredientes</h3>
            
            {/* Add New Ingredient - Now with Table+Header */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm mb-2">Agregar Ingrediente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Costo</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="Nombre"
                          value={newIngredient.name}
                          onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Cantidad"
                          value={newIngredient.quantity}
                          onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseFloat(e.target.value) })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Unidad"
                          value={newIngredient.unit}
                          onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Costo"
                          value={newIngredient.cost}
                          onChange={(e) => setNewIngredient({ ...newIngredient, cost: parseFloat(e.target.value) })}
                        />
                      </TableCell>
                      <TableCell>
                        <Button type="button" onClick={addIngredient} size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Ingredients List - Now with Table+Header */}
            {ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Lista de Ingredientes</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Costo</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell>
                          <Input
                            value={ingredient.name}
                            onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(ingredient.id, 'quantity', parseFloat(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={ingredient.unit}
                            onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={ingredient.cost || 0}
                            onChange={(e) => updateIngredient(ingredient.id, 'cost', parseFloat(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeIngredient(ingredient.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {dish ? 'Actualizar' : 'Crear'} Plato
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DishForm;

