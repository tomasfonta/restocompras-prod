
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SupplierPortal from '../components/SupplierPortal';
import BuyerPortal from '../components/BuyerPortal';
import { Product } from '../types/Product';
import { useUser } from '../contexts/UserContext';

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    size: 1,
    dimension: 'L',
    brand: 'La Serenísima',
    price: 45.50,
    category: 'Lácteos',
    quality: 'Alta',
    deliveryDays: 2,
    supplierId: 'user-2',
    supplierName: 'Lácteos del Valle',
    inStock: true,
    lastUpdated: '2024-06-13T10:00:00Z'
  },
  {
    id: '2',
    name: 'Pan de Molde Integral',
    size: 500,
    dimension: 'g',
    brand: 'Bimbo',
    price: 32.00,
    category: 'Panadería',
    quality: 'Media',
    deliveryDays: 1,
    supplierId: 'supplier-2',
    supplierName: 'Panadería Artesanal',
    inStock: true,
    lastUpdated: '2024-06-13T09:30:00Z'
  },
  {
    id: '3',
    name: 'Aceite de Oliva Extra Virgen',
    size: 500,
    dimension: 'mL',
    brand: 'Cocinero',
    price: 125.75,
    category: 'Aceites',
    quality: 'Alta',
    deliveryDays: 3,
    supplierId: 'supplier-1',
    supplierName: 'Lácteos del Valle',
    inStock: true,
    lastUpdated: '2024-06-13T08:15:00Z'
  },
  {
    id: '4',
    name: 'Tomate Perita',
    size: 1,
    dimension: 'kg',
    brand: 'Del Campo',
    price: 28.90,
    category: 'Verduras',
    quality: 'Alta',
    deliveryDays: 1,
    supplierId: 'supplier-3',
    supplierName: 'Verduras Frescas SA',
    inStock: true,
    lastUpdated: '2024-06-13T07:45:00Z'
  },
  {
    id: '5',
    name: 'Carne Molida Especial',
    size: 1,
    dimension: 'kg',
    brand: 'Frigorífico San Jorge',
    price: 89.50,
    category: 'Carnes',
    quality: 'Alta',
    deliveryDays: 2,
    supplierId: 'supplier-4',
    supplierName: 'Carnicería Premium',
    inStock: true,
    lastUpdated: '2024-06-13T06:20:00Z'
  },
  {
    id: '6',
    name: 'Yogur Natural',
    size: 900,
    dimension: 'g',
    brand: 'Danone',
    price: 67.25,
    category: 'Lácteos',
    quality: 'Media',
    deliveryDays: 2,
    supplierId: 'supplier-1',
    supplierName: 'Lácteos del Valle',
    inStock: true,
    lastUpdated: '2024-06-13T05:10:00Z'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      supplierId: currentUser.id,
      supplierName: currentUser.companyName,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(p => p.id === id ? { 
      ...productData, 
      id,
      supplierId: currentUser.id,
      supplierName: currentUser.companyName
    } : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Filter products for supplier view
  const userProducts = currentUser.userType === 'supplier' 
    ? products.filter(p => p.supplierId === currentUser.id)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {currentUser.userType === 'supplier' ? (
          <SupplierPortal 
            products={userProducts}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        ) : (
          <BuyerPortal products={products} />
        )}
      </main>
    </div>
  );
};

export default Index;
