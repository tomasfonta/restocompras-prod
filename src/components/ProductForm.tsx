
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from '../types/Product';
import { CATEGORIES } from '../types/Category';
import { DIMENSIONS } from '../types/Dimension';

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    size: 0,
    dimension: '',
    brand: '',
    price: 0,
    category: '',
    quality: 'Media' as 'Alta' | 'Media' | 'Básica',
    deliveryDays: 1,
    supplierId: 'supplier-1',
    supplierName: 'Mi Empresa',
    inStock: true,
    lastUpdated: new Date().toISOString()
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        size: initialData.size,
        dimension: initialData.dimension,
        brand: initialData.brand,
        price: initialData.price,
        category: initialData.category,
        quality: initialData.quality,
        deliveryDays: initialData.deliveryDays,
        supplierId: initialData.supplierId,
        supplierName: initialData.supplierName,
        inStock: initialData.inStock,
        lastUpdated: new Date().toISOString()
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Producto*</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ej: Leche Entera"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Marca*</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              placeholder="Ej: La Serenísima"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="size">Tamaño*</Label>
              <Input
                id="size"
                type="number"
                step="0.01"
                min="0"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: parseFloat(e.target.value) || 0})}
                placeholder="Ej: 1, 500, 0.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="dimension">Dimensión*</Label>
              <Select value={formData.dimension} onValueChange={(value) => setFormData({...formData, dimension: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {DIMENSIONS.map(dimension => (
                    <SelectItem key={dimension.id} value={dimension.name}>
                      {dimension.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="category">Categoría*</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="price">Precio*</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="quality">Calidad*</Label>
            <Select value={formData.quality} onValueChange={(value: 'Alta' | 'Media' | 'Básica') => setFormData({...formData, quality: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona calidad" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Básica">Básica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deliveryDays">Días de Entrega*</Label>
            <Input
              id="deliveryDays"
              type="number"
              min="1"
              value={formData.deliveryDays}
              onChange={(e) => setFormData({...formData, deliveryDays: parseInt(e.target.value) || 1})}
              required
            />
          </div>
        </div>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
              className="rounded border-gray-300"
            />
            <Label htmlFor="inStock">Producto en stock y disponible</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
          {initialData ? 'Actualizar' : 'Crear'} Producto
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
