import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { Dish } from '../types/Dish';
import { DIMENSIONS } from '../types/Dimension';
import { CATEGORIES } from '../types/Category';

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

// Generate sample products for current supplier (user-2) - Only 10 products
const generateCurrentSupplierProducts = (): Product[] => {
  const products: Product[] = [];
  const validDimensions = DIMENSIONS.map(d => d.name);
  const validCategories = CATEGORIES.map(c => c.name);
  const brands = ['La Serenísima', 'Sancor', 'Mastellone'];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  const productTemplates = [
    { name: 'Leche Entera', category: 'Lácteos', dimension: 'L', size: 1 },
    { name: 'Leche Descremada', category: 'Lácteos', dimension: 'L', size: 1 },
    { name: 'Yogur Natural', category: 'Lácteos', dimension: 'g', size: 200 },
    { name: 'Queso Cremoso', category: 'Lácteos', dimension: 'kg', size: 0.5 },
    { name: 'Manteca', category: 'Lácteos', dimension: 'g', size: 200 },
    { name: 'Pan Lactal', category: 'Panadería', dimension: 'C', size: 1 },
    { name: 'Aceite de Girasol', category: 'Aceites', dimension: 'L', size: 0.9 },
    { name: 'Tomate Perita', category: 'Verduras', dimension: 'kg', size: 1 },
    { name: 'Cebolla', category: 'Verduras', dimension: 'kg', size: 1 },
    { name: 'Papa', category: 'Verduras', dimension: 'kg', size: 2 }
  ];

  for (let i = 0; i < 10; i++) {
    const template = productTemplates[i];
    const brand = brands[i % brands.length];
    
    products.push({
      id: `current-${i + 1}`,
      name: `${template.name} ${brand}`,
      size: template.size,
      dimension: template.dimension,
      brand: brand,
      price: Math.round((Math.random() * 100 + 20) * 100) / 100,
      category: template.category,
      quality: qualities[i % qualities.length],
      deliveryDays: Math.floor(Math.random() * 3) + 1,
      supplierId: 'user-2',
      supplierName: 'Lácteos del Valle',
      inStock: true,
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
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
  
  const validDimensions = DIMENSIONS.map(d => d.name);
  const validCategories = CATEGORIES.map(c => c.name);
  const brands = ['La Serenísima', 'Sancor', 'Mastellone', 'Danone', 'Nestlé', 'Arcor', 'Molinos Río de la Plata', 'AGD', 'Bimbo', 'Fargo', 'Unilever', 'P&G'];
  const productTypes = [
    'Leche', 'Yogur', 'Queso', 'Manteca', 'Pan', 'Facturas', 'Aceite', 'Vinagre', 'Tomate', 'Cebolla', 'Papa', 'Zanahoria', 
    'Carne', 'Pollo', 'Pescado', 'Manzana', 'Banana', 'Naranja', 'Gaseosa', 'Agua', 'Jugo', 'Arroz', 'Fideos', 'Sal', 
    'Azúcar', 'Harina', 'Detergente', 'Jabón', 'Shampoo', 'Helado', 'Pizza', 'Hamburguesas'
  ];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  // Helper function to get appropriate size based on dimension
  const getSizeForDimension = (dimension: string): number => {
    switch (dimension) {
      case 'kg':
        return Math.round((Math.random() * 4.5 + 0.5) * 100) / 100;
      case 'g':
        return Math.round(Math.random() * 900 + 100);
      case 'L':
        return Math.round((Math.random() * 2.5 + 0.5) * 100) / 100;
      case 'mL':
        return Math.round(Math.random() * 750 + 250);
      case 'C':
        return Math.round(Math.random() * 11 + 1);
      case 'm':
      case 'cm':
      case 'mm':
        return Math.round((Math.random() * 99 + 1) * 100) / 100;
      case 'm2':
      case 'm3':
        return Math.round((Math.random() * 9 + 1) * 100) / 100;
      default:
        return 1;
    }
  };

  for (let i = 0; i < 500; i++) {
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
    const category = validCategories[Math.floor(Math.random() * validCategories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const dimension = validDimensions[Math.floor(Math.random() * validDimensions.length)];
    const size = getSizeForDimension(dimension);
    
    products.push({
      id: `other-${i + 1}`,
      name: `${productType} ${brand}`,
      size: size,
      dimension: dimension,
      brand: brand,
      price: Math.round((Math.random() * 300 + 5) * 100) / 100,
      category: category,
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
