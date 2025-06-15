
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Truck, Star, ShoppingCart as CartIcon } from "lucide-react";
import { Product } from '../types/Product';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../contexts/LanguageContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import MenuManagement from './MenuManagement';
import ProductTable from './ProductTable';
import IngredientCostAnalysis from './IngredientCostAnalysis';
import SupplierProfile from './SupplierProfile';
import ShoppingCart from './ShoppingCart';

interface BuyerPortalProps {
  products: Product[];
}

const BuyerPortal: React.FC<BuyerPortalProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const { currentUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const { t } = useTranslation();
  const { cartItems } = useShoppingCart();

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
    setSelectedSupplierId(supplierId);
  };

  const handleBackToCatalog = () => {
    setSelectedSupplierId(null);
  };

  // Helper to switch tab to "analisis"
  const handleAnalysisTab = () => setActiveTab('analysis');

  // Get supplier products for profile view
  const supplierProducts = selectedSupplierId 
    ? products.filter(p => p.supplierId === selectedSupplierId)
    : [];

  // If viewing supplier profile, show that instead
  if (selectedSupplierId) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <SupplierProfile
          supplierId={selectedSupplierId}
          products={supplierProducts}
          onBack={handleBackToCatalog}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('buyerPortal.title')}</h1>
        <p className="text-gray-600">{t('buyerPortal.description')}</p>
      </div>

      <Tabs value={activeTab} defaultValue="catalog" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="catalog">{t('buyerPortal.tabs.catalog')}</TabsTrigger>
          <TabsTrigger value="menu">{t('buyerPortal.tabs.menu')}</TabsTrigger>
          <TabsTrigger value="analysis">{t('buyerPortal.tabs.costAnalysis')}</TabsTrigger>
          <TabsTrigger value="cart" className="relative">
            <CartIcon className="w-4 h-4 mr-2" />
            {t('shoppingCart.title')}
            {cartItems.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                {cartItems.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
          {/* Search and Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="search"
              placeholder={t('buyerPortal.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('buyerPortal.filter.category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('buyerPortal.filter.allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedQuality} defaultValue={selectedQuality}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('buyerPortal.filter.quality')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('buyerPortal.filter.allQualities')}</SelectItem>
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
          <MenuManagement />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <IngredientCostAnalysis />
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <ShoppingCart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerPortal;
