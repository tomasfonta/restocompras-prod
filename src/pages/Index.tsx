
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SupplierPortal from '../components/SupplierPortal';
import BuyerPortal from '../components/BuyerPortal';
import { Product } from '../types/Product';

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    dimension: '1L',
    brand: 'La Serenísima',
    price: 45.50,
    category: 'Lácteos',
    quality: 'Alta',
    deliveryDays: 2,
    supplierId: 'supplier-1',
    supplierName: 'Lácteos del Valle',
    inStock: true,
    lastUpdated: '2024-06-13T10:00:00Z'
  },
  {
    id: '2',
    name: 'Pan de Molde Integral',
    dimension: '500g',
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
    dimension: '500ml',
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
    dimension: '1kg',
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
    dimension: '1kg',
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
    dimension: '900g',
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
  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'supplier' | 'buyer'>('buyer');
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  useEffect(() => {
    // Obtener el tipo de usuario desde el state del login o usar valor por defecto
    if (location.state?.userType) {
      setUserType(location.state.userType);
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...productData, id } : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userType={userType} 
        onUserTypeChange={setUserType}
        onLogout={handleLogout}
      />
      
      <main>
        {userType === 'supplier' ? (
          <SupplierPortal 
            products={products.filter(p => p.supplierId === 'supplier-1')}
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
