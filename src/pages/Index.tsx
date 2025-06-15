
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import Header from '../components/Header';
import SupplierPortal from '../components/SupplierPortal';
import BuyerPortal from '../components/BuyerPortal';
import { Product } from '../types/Product';
import { useUser } from '../contexts/UserContext';
import { useData } from '../contexts/DataContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProductsBySupplier 
  } = useData();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProductData = {
      ...productData,
      supplierId: currentUser.id,
      supplierName: currentUser.companyName,
    };
    addProduct(newProductData);
  };

  const handleUpdateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    const updatedProductData = {
      ...productData,
      supplierId: currentUser.id,
      supplierName: currentUser.companyName
    };
    updateProduct(id, updatedProductData);
  };

  // Filter products for supplier view
  const userProducts = currentUser.userType === 'supplier' 
    ? getProductsBySupplier(currentUser.id)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      {/* Cost Analysis Button for Restaurants */}
      {currentUser.userType === 'restaurant' && (
        <div className="max-w-7xl mx-auto p-6 pb-0">
          <div className="flex justify-end">
            <Button 
              onClick={() => navigate('/cost-analysis')}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Análisis de Costos
            </Button>
          </div>
        </div>
      )}
      
      <main className="backdrop-blur-sm">
        {currentUser.userType === 'supplier' ? (
          <SupplierPortal 
            products={userProducts}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={deleteProduct}
            supplierId={currentUser.id}
            supplierName={currentUser.companyName}
          />
        ) : (
          <BuyerPortal products={products} />
        )}
      </main>
    </div>
  );
};

export default Index;
