
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, ShoppingCart, TrendingUp, Package } from "lucide-react";
import ProductTable from './ProductTable';
import SupplierProfile from './SupplierProfile';
import { Product } from '../types/Product';
import { CATEGORIES } from '../types/Category';

interface BuyerPortalProps {
  products: Product[];
}

const BuyerPortal = ({ products }: BuyerPortalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceFilter === 'low') matchesPrice = product.price < 50;
      else if (priceFilter === 'medium') matchesPrice = product.price >= 50 && product.price < 200;
      else if (priceFilter === 'high') matchesPrice = product.price >= 200;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceFilter]);

  // Calculate stats
  const totalProducts = filteredProducts.length;
  const avgPrice = filteredProducts.length > 0 ? 
    filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length : 0;
  const suppliersCount = new Set(filteredProducts.map(p => p.supplierId)).size;

  if (selectedSupplier) {
    return (
      <SupplierProfile 
        supplierId={selectedSupplier}
        products={products.filter(p => p.supplierId === selectedSupplier)}
        onBack={() => setSelectedSupplier(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Encuentra los mejores productos para tu restaurante
            </h1>
            <p className="text-gray-600 text-lg">
              Compara precios, calidad y tiempos de entrega de múltiples proveedores
            </p>
          </div>
          <div className="hidden md:block">
            <ShoppingCart className="w-20 h-20 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">{totalProducts}</CardTitle>
            <CardDescription className="text-gray-600">Productos Disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              En stock
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(2)}</CardTitle>
            <CardDescription className="text-gray-600">Precio Promedio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              Por unidad
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">{suppliersCount}</CardTitle>
            <CardDescription className="text-gray-600">Proveedores Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              Disponibles
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-amber-600" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos o marcas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Menos de $50</SelectItem>
                <SelectItem value="medium">$50 - $200</SelectItem>
                <SelectItem value="high">Más de $200</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="border-gray-300"
            >
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            Compara productos de diferentes proveedores y encuentra las mejores ofertas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={filteredProducts}
            onEdit={() => {}}
            onDelete={() => {}}
            isSupplierView={false}
            onSupplierClick={setSelectedSupplier}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerPortal;
