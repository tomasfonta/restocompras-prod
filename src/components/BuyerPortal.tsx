
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import ProductTable from './ProductTable';
import SupplierProfile from './SupplierProfile';
import MenuManagement from './MenuManagement';
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
      {/* Management Tabs */}
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger value="catalog" className="data-[state=active]:bg-white">Catálogo de Productos</TabsTrigger>
          <TabsTrigger value="menu" className="data-[state=active]:bg-white">Mi Menú</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Menú</h2>
            <p className="text-gray-600">Administra los platos de tu restaurante y sus ingredientes</p>
          </div>
          <MenuManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerPortal;
