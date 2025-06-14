
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SupplierPortal from '../components/SupplierPortal';
import BuyerPortal from '../components/BuyerPortal';
import { Product } from '../types/Product';
import { useUser } from '../contexts/UserContext';

// Generate sample products for current supplier (user-2)
const generateCurrentSupplierProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ['Lácteos', 'Panadería', 'Aceites', 'Verduras', 'Carnes', 'Frutas', 'Bebidas', 'Cereales', 'Condimentos', 'Conservas'];
  const brands = ['La Serenísima', 'Sancor', 'Mastellone', 'Danone', 'Nestlé', 'Arcor', 'Molinos Río de la Plata', 'AGD', 'Bimbo', 'Fargo'];
  const productNames = [
    'Leche Entera', 'Leche Descremada', 'Yogur Natural', 'Queso Cremoso', 'Manteca', 'Crema de Leche',
    'Pan Lactal', 'Pan Integral', 'Facturas Surtidas', 'Medialunas', 'Pan Francés', 'Pan de Salvado',
    'Aceite de Girasol', 'Aceite de Maíz', 'Aceite de Oliva', 'Vinagre Blanco', 'Vinagre de Alcohol',
    'Tomate Perita', 'Cebolla', 'Papa', 'Zanahoria', 'Lechuga', 'Acelga', 'Zapallito', 'Pimiento',
    'Carne Molida', 'Asado', 'Pollo Entero', 'Pechuga de Pollo', 'Milanesas', 'Chorizo',
    'Manzana Roja', 'Banana', 'Naranja', 'Limón', 'Pera', 'Uva', 'Frutilla', 'Durazno',
    'Coca Cola', 'Pepsi', 'Sprite', 'Fanta', 'Agua Mineral', 'Jugo de Naranja', 'Cerveza',
    'Arroz', 'Fideos', 'Polenta', 'Avena', 'Quinoa', 'Lentejas', 'Garbanzos'
  ];
  const dimensions = ['kg', 'g', 'L', 'mL', 'unidad', 'paquete', 'docena'];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  for (let i = 0; i < 50; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const dimension = dimensions[Math.floor(Math.random() * dimensions.length)];
    const size = dimension === 'kg' ? Math.round(Math.random() * 5 + 0.5) : 
                 dimension === 'g' ? Math.round(Math.random() * 1000 + 100) :
                 dimension === 'L' ? Math.round(Math.random() * 3 + 0.5) :
                 dimension === 'mL' ? Math.round(Math.random() * 1000 + 250) :
                 Math.round(Math.random() * 12 + 1);
    
    products.push({
      id: `current-${i + 1}`,
      name: `${name} ${brand}`,
      size,
      dimension,
      brand,
      price: Math.round((Math.random() * 200 + 10) * 100) / 100,
      category,
      quality: qualities[Math.floor(Math.random() * qualities.length)],
      deliveryDays: Math.floor(Math.random() * 5) + 1,
      supplierId: 'user-2',
      supplierName: 'Lácteos del Valle',
      inStock: Math.random() > 0.1,
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  return products;
};

// Generate sample products for other suppliers
const generateOtherSuppliersProducts = (): Product[] => {
  const products: Product[] = [];
  const suppliers = [
    { id: 'supplier-2', name: 'Panadería Artesanal' },
    { id: 'supplier-3', name: 'Verduras Frescas SA' },
    { id: 'supplier-4', name: 'Carnicería Premium' },
    { id: 'supplier-5', name: 'Distribuidora Central' },
    { id: 'supplier-6', name: 'Mercado Mayorista' },
    { id: 'supplier-7', name: 'Alimentos Naturales' },
    { id: 'supplier-8', name: 'Proveedora del Sur' },
    { id: 'supplier-9', name: 'Comercializadora Norte' },
    { id: 'supplier-10', name: 'Distribuciones Oeste' }
  ];
  
  const categories = ['Lácteos', 'Panadería', 'Aceites', 'Verduras', 'Carnes', 'Frutas', 'Bebidas', 'Cereales', 'Condimentos', 'Conservas', 'Limpieza', 'Congelados'];
  const brands = ['La Serenísima', 'Sancor', 'Mastellone', 'Danone', 'Nestlé', 'Arcor', 'Molinos Río de la Plata', 'AGD', 'Bimbo', 'Fargo', 'Unilever', 'P&G', 'Johnson & Johnson'];
  const productTypes = [
    'Leche', 'Yogur', 'Queso', 'Manteca', 'Pan', 'Facturas', 'Aceite', 'Vinagre', 'Tomate', 'Cebolla', 'Papa', 'Zanahoria', 
    'Carne', 'Pollo', 'Pescado', 'Manzana', 'Banana', 'Naranja', 'Gaseosa', 'Agua', 'Jugo', 'Arroz', 'Fideos', 'Sal', 
    'Azúcar', 'Harina', 'Detergente', 'Jabón', 'Shampoo', 'Helado', 'Pizza', 'Hamburguesas'
  ];
  const dimensions = ['kg', 'g', 'L', 'mL', 'unidad', 'paquete', 'docena', 'caja'];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  for (let i = 0; i < 500; i++) {
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const dimension = dimensions[Math.floor(Math.random() * dimensions.length)];
    const size = dimension === 'kg' ? Math.round((Math.random() * 5 + 0.5) * 100) / 100 : 
                 dimension === 'g' ? Math.round(Math.random() * 1000 + 100) :
                 dimension === 'L' ? Math.round((Math.random() * 3 + 0.5) * 100) / 100 :
                 dimension === 'mL' ? Math.round(Math.random() * 1000 + 250) :
                 Math.round(Math.random() * 12 + 1);
    
    products.push({
      id: `other-${i + 1}`,
      name: `${productType} ${brand}`,
      size,
      dimension,
      brand,
      price: Math.round((Math.random() * 300 + 5) * 100) / 100,
      category,
      quality: qualities[Math.floor(Math.random() * qualities.length)],
      deliveryDays: Math.floor(Math.random() * 7) + 1,
      supplierId: supplier.id,
      supplierName: supplier.name,
      inStock: Math.random() > 0.15,
      lastUpdated: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  return products;
};

// Combine all sample products
const sampleProducts: Product[] = [
  ...generateCurrentSupplierProducts(),
  ...generateOtherSuppliersProducts()
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
