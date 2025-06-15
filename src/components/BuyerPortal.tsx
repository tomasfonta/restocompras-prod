
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Truck, Star, BarChart3 } from "lucide-react";
import { Product } from '../types/Product';
import { useUser } from '../contexts/UserContext';
import MenuManagement from './MenuManagement';
import ProductTable from './ProductTable';
import IngredientCostAnalysis from './IngredientCostAnalysis';

interface BuyerPortalProps {
  products: Product[];
}

const BuyerPortal: React.FC<BuyerPortalProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState('catalog');
  const { currentUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');

  // Get unique categories and qualities for filters
  const categories = Array.from(new Set(products.map(p => p.category)));
  const qualities = Array.from(new Set(products.map(p => p.quality)));

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesQuality = selectedQuality === 'all' || product.quality === selectedQuality;
    return matchesSearch && matchesCategory && matchesQuality;
  });

  const handleSupplierClick = (supplierId: string) => {
    // For future: Navigate to supplier profile or show supplier details
  };

  // Helper to switch tab to "analisis"
  const handleAnalysisTab = () => setActiveTab('analysis');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portal del Comprador</h1>
        <p className="text-gray-600">Explora productos de proveedores y gestiona tu menú</p>
      </div>

      <Tabs value={activeTab} defaultValue="catalog" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="catalog">Catálogo de Productos</TabsTrigger>
          <TabsTrigger value="menu">Mi Menú</TabsTrigger>
          <TabsTrigger value="analysis">Análisis de Costos</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
          {/* Cost Analysis Button - switches to analysis tab */}
          <div className="flex justify-end">
            <Button 
              onClick={handleAnalysisTab}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Análisis de Costos
            </Button>
          </div>
          {/* Search and Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedQuality} defaultValue={selectedQuality}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Calidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las calidades</SelectItem>
                {qualities.map(quality => (
                  <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <ProductTable
            products={filteredProducts}
            onEdit={() => {}} // Not used in buyer view
            onDelete={() => {}} // Not used in buyer view
            isSupplierView={false}
            onSupplierClick={handleSupplierClick}
          />
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          {/* Cost Analysis Button - switches to analysis tab */}
          <div className="flex justify-end">
            <Button 
              onClick={handleAnalysisTab}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Análisis de Costos
            </Button>
          </div>
          <MenuManagement />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <IngredientCostAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerPortal;
