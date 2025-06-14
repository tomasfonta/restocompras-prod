
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

// Generate sample products for current supplier (user-2)
const generateCurrentSupplierProducts = (): Product[] => {
  const products: Product[] = [];
  const validDimensions = DIMENSIONS.map(d => d.name);
  const validCategories = CATEGORIES.map(c => c.name);
  const brands = ['La Serenísima', 'Sancor', 'Mastellone', 'Danone', 'Nestlé', 'Arcor'];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  const productTemplates = [
    { name: 'Leche Entera', category: 'Lácteos', dimension: 'L', sizeRange: [0.5, 2] },
    { name: 'Leche Descremada', category: 'Lácteos', dimension: 'L', sizeRange: [0.5, 2] },
    { name: 'Yogur Natural', category: 'Lácteos', dimension: 'g', sizeRange: [150, 500] },
    { name: 'Queso Cremoso', category: 'Lácteos', dimension: 'kg', sizeRange: [0.2, 1] },
    { name: 'Manteca', category: 'Lácteos', dimension: 'g', sizeRange: [200, 500] },
    { name: 'Pan Lactal', category: 'Panadería', dimension: 'C', sizeRange: [1, 2] },
    { name: 'Pan Integral', category: 'Panadería', dimension: 'kg', sizeRange: [0.5, 1] },
    { name: 'Aceite de Girasol', category: 'Aceites', dimension: 'L', sizeRange: [0.5, 1.5] },
    { name: 'Aceite de Oliva', category: 'Aceites', dimension: 'mL', sizeRange: [250, 750] },
    { name: 'Tomate Perita', category: 'Verduras', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Cebolla', category: 'Verduras', dimension: 'kg', sizeRange: [1, 3] },
    { name: 'Papa', category: 'Verduras', dimension: 'kg', sizeRange: [1, 5] },
    { name: 'Zanahoria', category: 'Verduras', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Carne Molida', category: 'Carnes', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Pollo Entero', category: 'Carnes', dimension: 'kg', sizeRange: [1, 3] },
    { name: 'Manzana Roja', category: 'Frutas', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Banana', category: 'Frutas', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Naranja', category: 'Frutas', dimension: 'kg', sizeRange: [1, 3] },
    { name: 'Coca Cola', category: 'Bebidas', dimension: 'L', sizeRange: [0.5, 2.5] },
    { name: 'Agua Mineral', category: 'Bebidas', dimension: 'L', sizeRange: [0.5, 2] },
    { name: 'Arroz', category: 'Cereales', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Fideos', category: 'Cereales', dimension: 'g', sizeRange: [500, 1000] },
    { name: 'Azúcar', category: 'Condimentos', dimension: 'kg', sizeRange: [0.5, 2] },
    { name: 'Sal', category: 'Condimentos', dimension: 'g', sizeRange: [500, 1000] },
    { name: 'Atún en Lata', category: 'Conservas', dimension: 'g', sizeRange: [150, 300] }
  ];

  for (let i = 0; i < 50; i++) {
    const template = productTemplates[i % productTemplates.length];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const size = Math.round((Math.random() * (template.sizeRange[1] - template.sizeRange[0]) + template.sizeRange[0]) * 100) / 100;
    
    products.push({
      id: `current-${i + 1}`,
      name: `${template.name} ${brand}`,
      size: size,
      dimension: template.dimension,
      brand: brand,
      price: Math.round((Math.random() * 200 + 10) * 100) / 100,
      category: template.category,
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
