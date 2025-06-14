
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';

interface DataContextType {
  products: Product[];
  dishes: Dish[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  getProductsBySupplier: (supplierId: string) => Product[];
  addDish: (dish: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDish: (id: string, dish: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteDish: (id: string) => void;
  getDishesByUser: (userId: string) => Dish[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

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

// Sample dishes for demo
const generateSampleDishes = (): Dish[] => [
  {
    id: 'dish-1',
    name: 'Pasta Carbonara',
    description: 'Deliciosa pasta con salsa carbonara, bacon y queso parmesano',
    price: 25.99,
    preparationTime: 20,
    isActive: true,
    userId: 'user-1',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    ingredients: [
      { id: 'ing-1', name: 'Pasta', quantity: 200, unit: 'g', cost: 2.50 },
      { id: 'ing-2', name: 'Bacon', quantity: 100, unit: 'g', cost: 5.00 },
      { id: 'ing-3', name: 'Huevos', quantity: 2, unit: 'unidades', cost: 1.00 },
      { id: 'ing-4', name: 'Queso Parmesano', quantity: 50, unit: 'g', cost: 3.00 }
    ]
  }
];

// Initialize data
const initialProducts = [
  ...generateCurrentSupplierProducts(),
  ...generateOtherSuppliersProducts()
];

const initialDishes = generateSampleDishes();

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);

  // Products management
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { 
        ...productData, 
        id,
        lastUpdated: new Date().toISOString()
      } : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductsBySupplier = (supplierId: string) => {
    return products.filter(p => p.supplierId === supplierId);
  };

  // Dishes management
  const addDish = (dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDish: Dish = {
      ...dishData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDishes(prev => [...prev, newDish]);
  };

  const updateDish = (id: string, dishData: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>) => {
    setDishes(prev => prev.map(d => 
      d.id === id ? { 
        ...d,
        ...dishData,
        updatedAt: new Date().toISOString()
      } : d
    ));
  };

  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
  };

  const getDishesByUser = (userId: string) => {
    return dishes.filter(d => d.userId === userId);
  };

  return (
    <DataContext.Provider value={{
      products,
      dishes,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductsBySupplier,
      addDish,
      updateDish,
      deleteDish,
      getDishesByUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
