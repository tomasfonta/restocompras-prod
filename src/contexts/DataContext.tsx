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

// Generate sample products for current supplier (user-2) - Adding cheese and bacon products
const generateCurrentSupplierProducts = (): Product[] => {
  const products: Product[] = [];
  const qualities: ('Alta' | 'Media' | 'Básica')[] = ['Alta', 'Media', 'Básica'];

  const productTemplates = [
    { name: 'Pollo (varios cortes)', category: 'Proteínas', dimension: 'kg', size: 5, pricePerUnit: 4.50, brand: 'Avícola Galo/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ternera (varios cortes)', category: 'Proteínas', dimension: 'kg', size: 10, pricePerUnit: 12.00, brand: 'Asturiana de Valles/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cerdo (varios cortes)', category: 'Proteínas', dimension: 'kg', size: 10, pricePerUnit: 7.00, brand: 'El Pozo/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salmón', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 15.00, brand: 'Pescanova/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bacalao/Pescado Blanco', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Congelados Apolo/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Gambas/Camarones', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 18.00, brand: 'Pescanova/Dist. Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Huevos', category: 'Lácteos y Huevos', dimension: 'u', size: 30, pricePerUnit: 0.15, brand: 'Dagu/Pascual', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Leche', category: 'Lácteos y Huevos', dimension: 'L', size: 10, pricePerUnit: 1.00, brand: 'Central Lechera Asturiana/Nestlé Professional', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Mantequilla', category: 'Lácteos y Huevos', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'President/Arias', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Nata para montar', category: 'Lácteos y Huevos', dimension: 'L', size: 1, pricePerUnit: 4.00, brand: 'President/Asturiana', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Queso Parmesano', category: 'Lácteos y Huevos', dimension: 'kg', size: 1, pricePerUnit: 18.00, brand: 'Galbani/Zanetti', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Queso Mozzarella', category: 'Lácteos y Huevos', dimension: 'kg', size: 2.5, pricePerUnit: 9.00, brand: 'Galbani/Granarolo', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Queso Cheddar', category: 'Lácteos y Huevos', dimension: 'kg', size: 2.5, pricePerUnit: 10.00, brand: 'Kerrygold/Arla', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Tofu', category: 'Proteínas Vegetales', dimension: 'kg', size: 0.5, pricePerUnit: 5.00, brand: 'Fanya/Soria Natural', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Lentejas', category: 'Legumbres', dimension: 'kg', size: 1, pricePerUnit: 2.50, brand: 'Luengo/La Asturiana', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Garbanzos', category: 'Legumbres', dimension: 'kg', size: 1, pricePerUnit: 2.80, brand: 'Luengo/La Asturiana', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Frijoles Negros', category: 'Legumbres', dimension: 'kg', size: 1, pricePerUnit: 3.00, brand: 'La Asturiana/La Granja', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Judías Blancas', category: 'Legumbres', dimension: 'kg', size: 1, pricePerUnit: 2.70, brand: 'Luengo/La Asturiana', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cebollas (amarillas)', category: 'Verduras', dimension: 'kg', size: 10, pricePerUnit: 0.80, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Cebollas (rojas)', category: 'Verduras', dimension: 'kg', size: 5, pricePerUnit: 1.20, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Ajo', category: 'Verduras', dimension: 'kg', size: 1, pricePerUnit: 4.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Patatas (Russet)', category: 'Verduras', dimension: 'kg', size: 25, pricePerUnit: 0.60, brand: 'Patatas Meléndez/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Patatas (Yukon Gold)', category: 'Verduras', dimension: 'kg', size: 10, pricePerUnit: 0.80, brand: 'Patatas Meléndez/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Zanahorias', category: 'Verduras', dimension: 'kg', size: 5, pricePerUnit: 0.90, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Apio', category: 'Verduras', dimension: 'u', size: 1, pricePerUnit: 1.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Tomates (Roma)', category: 'Verduras', dimension: 'kg', size: 10, pricePerUnit: 1.80, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Tomates Cherry', category: 'Verduras', dimension: 'kg', size: 0.5, pricePerUnit: 4.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Pimientos', category: 'Verduras', dimension: 'kg', size: 5, pricePerUnit: 2.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Champiñones (Cremini)', category: 'Verduras', dimension: 'kg', size: 2.5, pricePerUnit: 3.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Limones', category: 'Frutas', dimension: 'kg', size: 1, pricePerUnit: 1.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Limas', category: 'Frutas', dimension: 'kg', size: 1, pricePerUnit: 2.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Manzanas', category: 'Frutas', dimension: 'kg', size: 5, pricePerUnit: 1.80, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Bayas (varias)', category: 'Frutas', dimension: 'kg', size: 0.25, pricePerUnit: 10.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Mezcla de Ensalada', category: 'Verduras', dimension: 'kg', size: 2.5, pricePerUnit: 5.00, brand: 'Florette/Primaflor', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Perejil (fresco)', category: 'Hierbas', dimension: 'manojo', size: 1, pricePerUnit: 1.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Cilantro (fresco)', category: 'Hierbas', dimension: 'manojo', size: 1, pricePerUnit: 1.20, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Albahaca (fresca)', category: 'Hierbas', dimension: 'manojo', size: 1, pricePerUnit: 2.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Romero (fresco)', category: 'Hierbas', dimension: 'manojo', size: 1, pricePerUnit: 1.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Tomillo (fresco)', category: 'Hierbas', dimension: 'manojo', size: 1, pricePerUnit: 1.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Jengibre', category: 'Verduras', dimension: 'kg', size: 0.5, pricePerUnit: 5.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Cebolletas/Cebollino', category: 'Verduras', dimension: 'manojo', size: 1, pricePerUnit: 1.20, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Calabacín', category: 'Verduras', dimension: 'kg', size: 2, pricePerUnit: 1.80, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Pepino', category: 'Verduras', dimension: 'u', size: 1, pricePerUnit: 0.80, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Aguacate', category: 'Frutas', dimension: 'u', size: 1, pricePerUnit: 1.20, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Brócoli', category: 'Verduras', dimension: 'kg', size: 1, pricePerUnit: 2.20, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Coliflor', category: 'Verduras', dimension: 'kg', size: 1, pricePerUnit: 2.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Espárragos', category: 'Verduras', dimension: 'kg', size: 0.5, pricePerUnit: 8.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Batatas', category: 'Verduras', dimension: 'kg', size: 5, pricePerUnit: 1.50, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Harina de Trigo', category: 'Cereales y Harinas', dimension: 'kg', size: 25, pricePerUnit: 0.80, brand: 'Harimsa/Nomen', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Arroz (Basmati)', category: 'Cereales y Harinas', dimension: 'kg', size: 10, pricePerUnit: 2.00, brand: 'La Fallera/SOS', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pasta (varias)', category: 'Cereales y Harinas', dimension: 'kg', size: 5, pricePerUnit: 1.50, brand: 'Barilla/Gallo/Divella', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pan (barras)', category: 'Panadería', dimension: 'u', size: 1, pricePerUnit: 0.80, brand: 'Europastry/Proveedor Local', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Aceite de Oliva (AOVE)', category: 'Aceites y Vinagres', dimension: 'L', size: 5, pricePerUnit: 10.00, brand: 'Carbonell/Hojiblanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Aceite Vegetal/Canola', category: 'Aceites y Vinagres', dimension: 'L', size: 20, pricePerUnit: 2.50, brand: 'Koipe/La Española', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Sal (Kosher)', category: 'Condimentos', dimension: 'kg', size: 2, pricePerUnit: 1.00, brand: 'Salinas de Torrevieja/La Salinera', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimienta Negra (grano)', category: 'Condimentos', dimension: 'kg', size: 0.5, pricePerUnit: 20.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Azúcar Granulado', category: 'Endulzantes', dimension: 'kg', size: 25, pricePerUnit: 1.20, brand: 'Azucarera/Eroski Basic', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Azúcar Moreno', category: 'Endulzantes', dimension: 'kg', size: 10, pricePerUnit: 1.50, brand: 'Azucarera/Eroski Basic', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Miel', category: 'Endulzantes', dimension: 'kg', size: 5, pricePerUnit: 7.00, brand: 'Panal de Miel/Granja San Francisco', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vinagre Blanco', category: 'Aceites y Vinagres', dimension: 'L', size: 1, pricePerUnit: 1.50, brand: 'Ybarra/La Española', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vinagre de Vino Tinto', category: 'Aceites y Vinagres', dimension: 'L', size: 1, pricePerUnit: 2.00, brand: 'Ybarra/La Española', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vinagre Balsámico', category: 'Aceites y Vinagres', dimension: 'L', size: 1, pricePerUnit: 4.00, brand: 'Módena/Due Vittorie', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa de Soja', category: 'Salsas y Condimentos', dimension: 'L', size: 5, pricePerUnit: 4.00, brand: 'Kikkoman/Pearl River Bridge', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa Worcestershire', category: 'Salsas y Condimentos', dimension: 'L', size: 0.5, pricePerUnit: 8.00, brand: 'Lea & Perrins', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mostaza (Dijon)', category: 'Salsas y Condimentos', dimension: 'kg', size: 2.5, pricePerUnit: 5.00, brand: 'Maille/Roland', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ketchup', category: 'Salsas y Condimentos', dimension: 'kg', size: 4, pricePerUnit: 2.50, brand: 'Heinz/Orlando', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mayonesa', category: 'Salsas y Condimentos', dimension: 'kg', size: 4, pricePerUnit: 3.50, brand: 'Hellmann\'s/Ybarra', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pasta de Tomate', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 3.00, brand: 'Mutti/Solís', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tomates en Lata', category: 'Conservas', dimension: 'kg', size: 2.5, pricePerUnit: 2.00, brand: 'Celorrio/Mutti', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Caldo de Pollo', category: 'Bases y Caldos', dimension: 'L', size: 10, pricePerUnit: 2.00, brand: 'Gallina Blanca/Knorr', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Caldo de Verduras', category: 'Bases y Caldos', dimension: 'L', size: 10, pricePerUnit: 2.00, brand: 'Gallina Blanca/Knorr', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Caldo de Ternera', category: 'Bases y Caldos', dimension: 'L', size: 10, pricePerUnit: 3.00, brand: 'Gallina Blanca/Knorr', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Leche de Coco', category: 'Lácteos Alternativos', dimension: 'L', size: 0.4, pricePerUnit: 3.00, brand: 'Thai Kitchen/Kara', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pan Rallado (Panko)', category: 'Cereales y Harinas', dimension: 'kg', size: 1, pricePerUnit: 3.00, brand: 'Roland/Santa Rita', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Maicena', category: 'Cereales y Harinas', dimension: 'kg', size: 1, pricePerUnit: 2.00, brand: 'Maizena/Hacendado', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Levadura en Polvo', category: 'Panadería', dimension: 'kg', size: 0.5, pricePerUnit: 6.00, brand: 'Royal/Vahiné', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Bicarbonato de Sodio', category: 'Panadería', dimension: 'kg', size: 0.5, pricePerUnit: 3.00, brand: 'Arm & Hammer/Mercadona', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Levadura (seca)', category: 'Panadería', dimension: 'kg', size: 0.5, pricePerUnit: 10.00, brand: 'Saf-Instant/Maizena', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Gelatina', category: 'Postres y Aditivos', dimension: 'kg', size: 0.5, pricePerUnit: 12.00, brand: 'Royal/Vahiné', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Almendras', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Almendras Llopis/Borges', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Nueces', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Borges/Frutos Secos San Blas', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pasas', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 4.00, brand: 'Chiquilín/Italica', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ajo en Polvo', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 8.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cebolla en Polvo', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 7.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimentón (ahumado)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 15.00, brand: 'La Chinata/Carmencita', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Comino (molido)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 10.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cilantro (molido)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 10.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cúrcuma', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 9.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimienta Cayena', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 12.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Copos de Pimiento Rojo', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 11.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Hojas de Laurel', category: 'Especias', dimension: 'g', size: 100, pricePerUnit: 20.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Canela (molida)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 18.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Nuez Moscada (entera)', category: 'Especias', dimension: 'u', size: 10, pricePerUnit: 1.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Clavos (enteros)', category: 'Especias', dimension: 'g', size: 100, pricePerUnit: 25.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Extracto de Vainilla', category: 'Postres y Aditivos', dimension: 'L', size: 0.5, pricePerUnit: 40.00, brand: 'Vahiné/Eurovanille', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cacao en Polvo', category: 'Postres y Aditivos', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'Valor/Nestlé Professional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Alcaparras', category: 'Condimentos', dimension: 'kg', size: 0.5, pricePerUnit: 7.00, brand: 'Ubago/Cidacos', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Aceitunas (varias)', category: 'Condimentos', dimension: 'kg', size: 2, pricePerUnit: 4.00, brand: 'La Española/Serpis', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pasta de Anchoa', category: 'Condimentos', dimension: 'g', size: 60, pricePerUnit: 0.05, brand: 'Ortiz/Codesa', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa Picante (Sriracha)', category: 'Salsas y Condimentos', dimension: 'L', size: 0.75, pricePerUnit: 5.00, brand: 'Huy Fong/Flying Goose', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vinagre de Arroz', category: 'Aceites y Vinagres', dimension: 'L', size: 1, pricePerUnit: 3.00, brand: 'Amoy/Mizkan', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Miso Paste', category: 'Salsas y Condimentos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Hikari Miso/Marukome', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Agua Mineral (botella 1L)', category: 'Bebidas', dimension: 'L', size: 12, pricePerUnit: 0.75, brand: 'Lanjarón/Bezoya', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Refrescos (Cola - 2L)', category: 'Bebidas', dimension: 'L', size: 6, pricePerUnit: 1.50, brand: 'Coca-Cola/Pepsi', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Zumo de Naranja (concentrado 5L)', category: 'Bebidas', dimension: 'L', size: 1, pricePerUnit: 8.00, brand: 'Granini/Don Simón', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cerveza (Lager - barril 30L)', category: 'Bebidas', dimension: 'L', size: 1, pricePerUnit: 45.00, brand: 'Mahou/Estrella Damm', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vino Tinto (Rioja Crianza - 75cl)', category: 'Bebidas', dimension: 'u', size: 6, pricePerUnit: 7.00, brand: 'Ramón Bilbao/Marqués de Cáceres', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vino Blanco (Rueda - 75cl)', category: 'Bebidas', dimension: 'u', size: 6, pricePerUnit: 6.50, brand: 'Marqués de Riscal/José Pariente', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cava Brut (75cl)', category: 'Bebidas', dimension: 'u', size: 6, pricePerUnit: 8.00, brand: 'Codorníu/Freixenet', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Leche Desnatada (1L UHT)', category: 'Bebidas', dimension: 'L', size: 12, pricePerUnit: 0.90, brand: 'Central Lechera Asturiana/Pascual', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Café Grano (natural 1kg)', category: 'Bebidas', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Lavazza/Illy', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Té (variedades surtidas - caja 100u)', category: 'Bebidas', dimension: 'u', size: 1, pricePerUnit: 7.00, brand: 'Hornimans/Twinings', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cerveza Sin Alcohol (33cl)', category: 'Bebidas', dimension: 'u', size: 24, pricePerUnit: 0.60, brand: 'San Miguel 0,0/Ambar 0,0', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bebida Energética (250ml)', category: 'Bebidas', dimension: 'u', size: 24, pricePerUnit: 1.20, brand: 'Red Bull/Monster', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Agua con Gas (1L)', category: 'Bebidas', dimension: 'L', size: 12, pricePerUnit: 0.80, brand: 'Perrier/Vichy Catalán', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Refresco Limón (2L)', category: 'Bebidas', dimension: 'L', size: 6, pricePerUnit: 1.40, brand: 'Fanta Limón/Sprite', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Leche de Avena (1L)', category: 'Bebidas', dimension: 'L', size: 6, pricePerUnit: 2.00, brand: 'Oatly/Alpro', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Detergente Lavavajillas (profesional 5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 15.00, brand: 'Finish/Fairy Professional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Abrillantador Lavavajillas (profesional 5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 12.00, brand: 'Somat/Finish Professional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Limpiador Multiusos (concentrado 5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 10.00, brand: 'Ajax/Don Limpio Profesional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Desengrasante Industrial (5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 18.00, brand: 'KH-7 Profesional/Sutter', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pastillas Cloro (piscinas/cocina - 1kg)', category: 'Limpieza', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'Clorox/Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Lejía (concentrada 5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 4.00, brand: 'Conejo/Neoclor', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Jabón Manos (envase 5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 9.00, brand: 'Diversey/Tork', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Papel Higiénico (industrial - rollo 6x200m)', category: 'Limpieza', dimension: 'rollo', size: 6, pricePerUnit: 25.00, brand: 'Tork/Colhogar Industrial', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Toallas Papel Manos (zig-zag - caja 2500u)', category: 'Limpieza', dimension: 'u', size: 2500, pricePerUnit: 18.00, brand: 'Tork/Scott', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bolsas Basura (industrial 100L - 100u)', category: 'Limpieza', dimension: 'u', size: 100, pricePerUnit: 20.00, brand: 'Relyon/Fixo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Desatascador (líquido 1L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 6.00, brand: 'Destop/HG', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Limpiacristales (5L)', category: 'Limpieza', dimension: 'L', size: 1, pricePerUnit: 8.00, brand: 'Cristasol Profesional/W5', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ambientador (aerosol - 750ml)', category: 'Limpieza', dimension: 'ml', size: 750, pricePerUnit: 5.00, brand: 'Glade/Air Wick', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Estropajos (paquete 10u)', category: 'Limpieza', dimension: 'u', size: 10, pricePerUnit: 3.00, brand: 'Scotch-Brite/Spontex', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bayetas Microfibra (paquete 5u)', category: 'Limpieza', dimension: 'u', size: 5, pricePerUnit: 7.00, brand: 'Vileda/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Azúcar Sobres (5g - caja 1000u)', category: 'Cafetería', dimension: 'u', size: 1000, pricePerUnit: 15.00, brand: 'Azucarera/Mondelez', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Edulcorante Sobres (caja 500u)', category: 'Cafetería', dimension: 'u', size: 500, pricePerUnit: 10.00, brand: 'Natreen/Stevia', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cápsulas Café (Nespresso compatible - caja 50u)', category: 'Cafetería', dimension: 'u', size: 50, pricePerUnit: 18.00, brand: 'Marcilla/L\'OR', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Chocolate en Polvo (1kg)', category: 'Cafetería', dimension: 'kg', size: 1, pricePerUnit: 6.00, brand: 'Valor/Nestlé Professional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Sirope Vainilla (1L)', category: 'Cafetería', dimension: 'L', size: 1, pricePerUnit: 9.00, brand: 'Monin/Torani', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vasos Cartón Café (240ml - 1000u)', category: 'Cafetería', dimension: 'u', size: 1000, pricePerUnit: 40.00, brand: 'Duni/Dart', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tapas Vasos Café (1000u)', category: 'Cafetería', dimension: 'u', size: 1000, pricePerUnit: 25.00, brand: 'Duni/Dart', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Removedores Café (madera - 2000u)', category: 'Cafetería', dimension: 'u', size: 2000, pricePerUnit: 10.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Servilletas Papel (dispensador - 5000u)', category: 'Cafetería', dimension: 'u', size: 5000, pricePerUnit: 30.00, brand: 'Tork/Lotus Professional', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Descafeinado Soluble (500g)', category: 'Cafetería', dimension: 'kg', size: 0.5, pricePerUnit: 15.00, brand: 'Nescafé/Saimaza', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Chocolate a la Taza (polvo 1kg)', category: 'Cafetería', dimension: 'kg', size: 1, pricePerUnit: 7.50, brand: 'Lacasa/Paladín', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Leche Condensada (1kg)', category: 'Cafetería', dimension: 'kg', size: 1, pricePerUnit: 3.50, brand: 'La Lechera/Nestlé', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Galletas surtidas (caja 200u)', category: 'Cafetería', dimension: 'u', size: 200, pricePerUnit: 12.00, brand: 'Fontaneda/Artiach', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mermelada porciones (20g - 100u)', category: 'Cafetería', dimension: 'u', size: 100, pricePerUnit: 8.00, brand: 'Hero/La Vieja Fábrica', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Botes de Colacao/Nesquik (1kg)', category: 'Cafetería', dimension: 'kg', size: 1, pricePerUnit: 7.00, brand: 'Cola Cao/Nesquik', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Velas Mesa (paquete 20u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 20, pricePerUnit: 10.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Palillos Dientes (caja 1000u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 1000, pricePerUnit: 2.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Servilleteros (acero - 6u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 6, pricePerUnit: 30.00, brand: 'Lacor/Arcoroc', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Manteles Papel (rollo 1.2x50m)', category: 'Bazar y Miscelánea', dimension: 'm', size: 50, pricePerUnit: 15.00, brand: 'Duni/García de Pou', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ceniceros Exterior (metal - 1u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 1, pricePerUnit: 25.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bandejas Servicio (antideslizantes - 6u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 6, pricePerUnit: 40.00, brand: 'Cambro/Arcoroc', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cestas Pan (mimbre - 6u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 6, pricePerUnit: 25.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cubitera Hielo (plástico - 1u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 1, pricePerUnit: 5.00, brand: 'Arcoroc/Carlisle', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Porta Menús (A4 - 10u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 10, pricePerUnit: 50.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Rollos Papel Aluminio (45cm x 150m)', category: 'Bazar y Miscelánea', dimension: 'm', size: 150, pricePerUnit: 12.00, brand: 'Albal/Reynolds', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Film Transparente (45cm x 300m)', category: 'Bazar y Miscelánea', dimension: 'm', size: 300, pricePerUnit: 15.00, brand: 'Albal/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Rollos Papel Horno (45cm x 50m)', category: 'Bazar y Miscelánea', dimension: 'm', size: 50, pricePerUnit: 7.00, brand: 'Albal/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Guantes Nitrilo (caja 100u - talla M)', category: 'Bazar y Miscelánea', dimension: 'u', size: 100, pricePerUnit: 8.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bolsas Congelación (varios tamaños - caja 100u)', category: 'Bazar y Miscelánea', dimension: 'u', size: 100, pricePerUnit: 6.00, brand: 'Mercadona/Albal', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mechero Cocina (recargable)', category: 'Bazar y Miscelánea', dimension: 'u', size: 1, pricePerUnit: 3.00, brand: 'Bic/Clipper', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },

    // --- Descartables (Disposables) ---
    { name: 'Platos Cartón (23cm - 100u)', category: 'Descartables', dimension: 'u', size: 100, pricePerUnit: 10.00, brand: 'Duni/García de Pou', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cubiertos Plástico (tenedor - 500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 15.00, brand: 'Duni/García de Pou', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Servilletas Papel (2 capas - 500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 8.00, brand: 'Duni/Lotus', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Vasos Plástico (200ml - 1000u)', category: 'Descartables', dimension: 'u', size: 1000, pricePerUnit: 12.00, brand: 'Duni/García de Pou', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Envases Comida para Llevar (Cartón - 100u)', category: 'Descartables', dimension: 'u', size: 100, pricePerUnit: 35.00, brand: 'Sabert/Huhtamaki', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bolsas Papel con Asa (Kraft - 250u)', category: 'Descartables', dimension: 'u', size: 250, pricePerUnit: 20.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pajitas Biodegradables (500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 15.00, brand: 'BioPak/Marca Ecológica', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Recipientes Aluminio (con tapa - 50u)', category: 'Descartables', dimension: 'u', size: 50, pricePerUnit: 18.00, brand: 'Alufoil/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Brochetas Bambú (20cm - 1000u)', category: 'Descartables', dimension: 'u', size: 1000, pricePerUnit: 9.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Palillos Cóctel (decorados - 500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 7.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Manteles Individuales Papel (500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 22.00, brand: 'Duni/García de Pou', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Guantes de Vinilo (caja 100u - talla L)', category: 'Descartables', dimension: 'u', size: 100, pricePerUnit: 7.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bolsas para Sándwich (biodegradables - 1000u)', category: 'Descartables', dimension: 'u', size: 1000, pricePerUnit: 25.00, brand: 'Marca Ecológica', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tarrinas Helado (cartón - 500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 30.00, brand: 'Duni/Huhtamaki', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cucharas Helado (plástico - 500u)', category: 'Descartables', dimension: 'u', size: 500, pricePerUnit: 8.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pan de Molde (grande 750g)', category: 'Panadería', dimension: 'u', size: 1, pricePerUnit: 2.50, brand: 'Bimbo/Panrico', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Hamburguesas Ternera (congeladas - 10kg)', category: 'Proteínas', dimension: 'kg', size: 10, pricePerUnit: 8.00, brand: 'Grupo Norteños/Campofrío', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pizzas Congeladas (Margarita - 10u)', category: 'Congelados', dimension: 'u', size: 10, pricePerUnit: 4.00, brand: 'Casa Tarradellas/Dr. Oetker', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Patatas Fritas Congeladas (bastón - 10kg)', category: 'Congelados', dimension: 'kg', size: 10, pricePerUnit: 2.00, brand: 'McCain/Lutosa', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pan Bao (congelado - 50u)', category: 'Panadería', dimension: 'u', size: 50, pricePerUnit: 0.50, brand: 'Asian Star/Mercadona', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Croquetas Caseras (congeladas - 5kg)', category: 'Congelados', dimension: 'kg', size: 5, pricePerUnit: 7.00, brand: 'Maheso/La Cocinera', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pescado Blanco (filete congelado - 5kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 5, pricePerUnit: 9.00, brand: 'Pescanova/Frumar', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Bacon Ahumado (lonchas - 2.5kg)', category: 'Proteínas', dimension: 'kg', size: 2.5, pricePerUnit: 6.00, brand: 'El Pozo/Campofrío', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Chorizo (curado - 1kg)', category: 'Embutidos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Campofrío/Revilla', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Jamón Serrano (lonchas - 500g)', category: 'Embutidos', dimension: 'kg', size: 0.5, pricePerUnit: 9.00, brand: 'Navidul/El Pozo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Queso Curado (cuña - 2kg)', category: 'Lácteos y Huevos', dimension: 'kg', size: 2, pricePerUnit: 15.00, brand: 'Garcia Baquero/Flor de Esgueva', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Atún en Aceite (lata grande - 1kg)', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 7.00, brand: 'Calvo/Ortiz', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimientos del Piquillo (lata 1kg)', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 6.00, brand: 'Gourmet/Lodosa', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Espárragos Blancos (lata 1kg)', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'Carretilla/Coquet', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Gelatina Neutra (láminas - 1kg)', category: 'Postres y Aditivos', dimension: 'kg', size: 1, pricePerUnit: 18.00, brand: 'Dr. Oetker/Vahiné', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Almendras Laminadas (1kg)', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 11.00, brand: 'Borges/Almendras Llopis', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pistachos (sin cáscara - 500g)', category: 'Frutos Secos', dimension: 'kg', size: 0.5, pricePerUnit: 15.00, brand: 'Borges/El Corte Inglés', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Piñones (500g)', category: 'Frutos Secos', dimension: 'kg', size: 0.5, pricePerUnit: 40.00, brand: 'Borges/Frutos Secos San Blas', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Polvo de Curry (1kg)', category: 'Especias', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimienta Blanca (molida - 500g)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 18.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Orégano (seco - 500g)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 7.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Nuez Moscada (molida - 500g)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 16.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tomate Frito (grande 3kg)', category: 'Salsas y Condimentos', dimension: 'kg', size: 3, pricePerUnit: 5.00, brand: 'Orlando/Solís', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa Brava (2.5kg)', category: 'Salsas y Condimentos', dimension: 'kg', size: 2.5, pricePerUnit: 4.00, brand: 'Ybarra/Prima', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa Alioli (2.5kg)', category: 'Salsas y Condimentos', dimension: 'kg', size: 2.5, pricePerUnit: 6.00, brand: 'Choví/Ybarra', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mermelada Fresa (cubo 5kg)', category: 'Endulzantes', dimension: 'kg', size: 5, pricePerUnit: 15.00, brand: 'Hero/St. Dalfour', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Concentrado Limón (1L)', category: 'Bases y Caldos', dimension: 'L', size: 1, pricePerUnit: 4.00, brand: 'Zumisol/Granini', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Aceite Girasol (25L)', category: 'Aceites y Vinagres', dimension: 'L', size: 25, pricePerUnit: 35.00, brand: 'Koipe/La Española', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Margarina (cubo 5kg)', category: 'Lácteos y Huevos', dimension: 'kg', size: 5, pricePerUnit: 10.00, brand: 'Flora/Tulipán', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Nata Cocinar (1L UHT)', category: 'Lácteos y Huevos', dimension: 'L', size: 12, pricePerUnit: 3.00, brand: 'President/Central Lechera Asturiana', providerId: 'user-2', providerName: 'Lácteos de la Dehesa' },
    { name: 'Base para Pizza (precocinada - 10u)', category: 'Panadería', dimension: 'u', size: 10, pricePerUnit: 1.50, brand: 'Buitoni/Hacendado', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Masa Hojaldre (congelada - 5kg)', category: 'Panadería', dimension: 'kg', size: 5, pricePerUnit: 9.00, brand: 'La Cocinera/Martín Berasategui', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Pan de Hamburguesa (paquete 48u)', category: 'Panadería', dimension: 'u', size: 48, pricePerUnit: 0.20, brand: 'Bimbo/Dulcesol', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Pan de Hot Dog (paquete 48u)', category: 'Panadería', dimension: 'u', size: 48, pricePerUnit: 0.18, brand: 'Bimbo/Dulcesol', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Tortillas de Trigo (grande - 100u)', category: 'Panadería', dimension: 'u', size: 100, pricePerUnit: 0.15, brand: 'Mission/Old El Paso', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Arroz Redondo (saco 25kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 25, pricePerUnit: 1.00, brand: 'SOS/La Fallera', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Garbanzos Cocidos (lata 3kg)', category: 'Legumbres', dimension: 'kg', size: 3, pricePerUnit: 5.00, brand: 'Cidacos/Litoral', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Lentejas Cocidas (lata 3kg)', category: 'Legumbres', dimension: 'kg', size: 3, pricePerUnit: 4.50, brand: 'Cidacos/Litoral', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Maíz Dulce (lata 2.5kg)', category: 'Conservas', dimension: 'kg', size: 2.5, pricePerUnit: 3.00, brand: 'Bonduelle/Gourmet', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Guindillas (en vinagre - 1kg)', category: 'Condimentos', dimension: 'kg', size: 1, pricePerUnit: 5.00, brand: 'Cidacos/Ubago', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Capellanes Secos (bandeja 1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Pescados Salazones', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Anchoas en Salazón (cubo 5kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 5, pricePerUnit: 60.00, brand: 'Ortiz/Codesa', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Boquerones en Vinagre (bandeja 1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 15.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Caracoles Cocidos (bolsa 1kg)', category: 'Proteínas', dimension: 'kg', size: 1, pricePerUnit: 9.00, brand: 'Marca Blanca', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pulpo Cocido (brazo congelado - 1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 25.00, brand: 'Pescanova/Congelados Apolo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Almejas Congeladas (1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Pescanova/Congelados Apolo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Mejillones Congelados (1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'Pescanova/Congelados Apolo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Paté de Foie (lata 500g)', category: 'Embutidos', dimension: 'kg', size: 0.5, pricePerUnit: 15.00, brand: 'Martiko/Imperia', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Morcilla (de Burgos - 1kg)', category: 'Embutidos', dimension: 'kg', size: 1, pricePerUnit: 7.00, brand: 'Rios/La Encina', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salchichas Frescas (granel - 5kg)', category: 'Proteínas', dimension: 'kg', size: 5, pricePerUnit: 5.00, brand: 'Campofrío/El Pozo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Carne Picada Ternera (bandeja 5kg)', category: 'Proteínas', dimension: 'kg', size: 5, pricePerUnit: 9.00, brand: 'Asturiana de Valles/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Carne Picada Mixta (bandeja 5kg)', category: 'Proteínas', dimension: 'kg', size: 5, pricePerUnit: 8.50, brand: 'Asturiana de Valles/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Chuletillas de Cordero (bandeja 2kg)', category: 'Proteínas', dimension: 'kg', size: 2, pricePerUnit: 18.00, brand: 'Interovic/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Entrecot Ternera (fresco - 2kg)', category: 'Proteínas', dimension: 'kg', size: 2, pricePerUnit: 25.00, brand: 'Asturiana de Valles/Mercado Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Lubina Fresca (granel - 5kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 5, pricePerUnit: 14.00, brand: 'Pescanova/Mercado Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Dorada Fresca (granel - 5kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 5, pricePerUnit: 13.00, brand: 'Pescanova/Mercado Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pulpo Fresco (granel - 2kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 2, pricePerUnit: 28.00, brand: 'Mercado Local', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Setas Shiitake (frescas - 500g)', category: 'Verduras', dimension: 'kg', size: 0.5, pricePerUnit: 9.00, brand: 'Mercado Mayorista/Dist. Local', providerId: 'user-4', providerName: 'Horticultores del Mediterráneo' },
    { name: 'Espaguetis (paquete 5kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 5, pricePerUnit: 1.80, brand: 'Barilla/Gallo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Macarrones (paquete 5kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 5, pricePerUnit: 1.80, brand: 'Barilla/Gallo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Aceitunas Negras (sin hueso - 2kg)', category: 'Condimentos', dimension: 'kg', size: 2, pricePerUnit: 5.00, brand: 'La Española/Serpis', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tomates Secos (en aceite - 1kg)', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Santa Teresa/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Alcachofas en Lata (corazones - 1kg)', category: 'Conservas', dimension: 'kg', size: 1, pricePerUnit: 7.00, brand: 'Cidacos/Gourmet', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pepinillos en Vinagre (2kg)', category: 'Condimentos', dimension: 'kg', size: 2, pricePerUnit: 4.00, brand: 'Dulcesol/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Dátiles (sin hueso - 1kg)', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 6.00, brand: 'Frutos Secos San Blas/Borges', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Ciruelas Pasas (1kg)', category: 'Frutos Secos', dimension: 'kg', size: 1, pricePerUnit: 5.00, brand: 'Frutos Secos San Blas/Borges', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Masa de Pizza Fresca (rollo 500g)', category: 'Panadería', dimension: 'u', size: 1, pricePerUnit: 2.00, brand: 'Buitoni/Hacendado', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Tortilla de Patatas (precocinada - 1kg)', category: 'Platos Preparados', dimension: 'kg', size: 1, pricePerUnit: 6.00, brand: 'Palacios/La Cocinera', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Croquetas de Pollo (congeladas - 2kg)', category: 'Congelados', dimension: 'kg', size: 2, pricePerUnit: 5.00, brand: 'Maheso/La Cocinera', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Calamar Anilla (congelado - 1kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Pescanova/Congelados Apolo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pan de Ajo (congelado - 6u)', category: 'Panadería', dimension: 'u', size: 6, pricePerUnit: 3.00, brand: 'Dr. Oetker/Mercadona', providerId: 'user-6', providerName: 'Panadería Artesana El Horno' },
    { name: 'Helado Vainilla (cubo 5L)', category: 'Postres y Aditivos', dimension: 'L', size: 5, pricePerUnit: 18.00, brand: 'Frigo/Nestlé', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa de Tomate Frito Casero (3kg)', category: 'Salsas y Condimentos', dimension: 'kg', size: 3, pricePerUnit: 7.00, brand: 'Apis/Orlando', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Concentrado Pollo (pasta - 1kg)', category: 'Bases y Caldos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Knorr/Maggi', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Concentrado Verduras (pasta - 1kg)', category: 'Bases y Caldos', dimension: 'kg', size: 1, pricePerUnit: 9.00, brand: 'Knorr/Maggi', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Concentrado Pescado (pasta - 1kg)', category: 'Bases y Caldos', dimension: 'kg', size: 1, pricePerUnit: 11.00, brand: 'Knorr/Maggi', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Azafrán (hebras - 10g)', category: 'Especias', dimension: 'g', size: 10, pricePerUnit: 50.00, brand: 'La Mancha/Carmencita', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pimentón Dulce (kg)', category: 'Especias', dimension: 'kg', size: 1, pricePerUnit: 8.00, brand: 'La Chinata/Carmencita', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Colorante Alimentario (varios - 500g)', category: 'Postres y Aditivos', dimension: 'kg', size: 0.5, pricePerUnit: 15.00, brand: 'Vahiné/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Decoración Tartas (perlas, fideos - 500g)', category: 'Postres y Aditivos', dimension: 'kg', size: 0.5, pricePerUnit: 10.00, brand: 'Vahiné/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Harina de Garbanzo (1kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 1, pricePerUnit: 3.50, brand: 'Luengo/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Semillas de Sésamo (500g)', category: 'Especias', dimension: 'kg', size: 0.5, pricePerUnit: 6.00, brand: 'Carmencita/Ducros', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Semillas de Chía (500g)', category: 'Semillas y Superalimentos', dimension: 'kg', size: 0.5, pricePerUnit: 7.00, brand: 'Soria Natural/Mercadona', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Quinoa (1kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 1, pricePerUnit: 4.00, brand: 'Mercadona/Biográ', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Couscous (5kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 5, pricePerUnit: 8.00, brand: 'Ferrero/Tipiak', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Harina de Maíz (1kg)', category: 'Cereales y Harinas', dimension: 'kg', size: 1, pricePerUnit: 1.50, brand: 'Harimsa/Maizena', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Gelatina Frutas (sabores surtidos - 1kg)', category: 'Postres y Aditivos', dimension: 'kg', size: 1, pricePerUnit: 10.00, brand: 'Royal/Vahiné', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Salsa Pesto (cubo 1kg)', category: 'Salsas y Condimentos', dimension: 'kg', size: 1, pricePerUnit: 12.00, brand: 'Barilla/Saclà', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Tomate Concentrado (cubo 5kg)', category: 'Conservas', dimension: 'kg', size: 5, pricePerUnit: 15.00, brand: 'Mutti/Solís', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Judías Verdes (congeladas - 5kg)', category: 'Verduras Congeladas', dimension: 'kg', size: 5, pricePerUnit: 2.50, brand: 'Mercadona/Findus', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Guisantes (congelados - 5kg)', category: 'Verduras Congeladas', dimension: 'kg', size: 5, pricePerUnit: 2.80, brand: 'Mercadona/Findus', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Espinacas (congeladas - 2.5kg)', category: 'Verduras Congeladas', dimension: 'kg', size: 2.5, pricePerUnit: 3.00, brand: 'Mercadona/Findus', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Pescado para Rebozar (congelado - 5kg)', category: 'Pescados y Mariscos', dimension: 'kg', size: 5, pricePerUnit: 9.50, brand: 'Pescanova/Congelados Apolo', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Cebolla Picada (congelada - 2.5kg)', category: 'Verduras Congeladas', dimension: 'kg', size: 2.5, pricePerUnit: 3.50, brand: 'Mercadona/Findus', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' },
    { name: 'Patatas Cubos (congeladas - 5kg)', category: 'Verduras Congeladas', dimension: 'kg', size: 5, pricePerUnit: 2.20, brand: 'McCain/Lutosa', providerId: 'user-7', providerName: 'Distribuciones Mayoristas del Sur' }
  ];

  for (let i = 0; i < productTemplates.length; i++) {
    const template = productTemplates[i];
    products.push({
      id: `current-${i + 1}`,
      name: template.name,
      size: template.size,
      dimension: template.dimension,
      brand: template.brand,
      price: template.pricePerUnit,
      category: template.category,
      quality: qualities[i % qualities.length],
      deliveryDays: Math.floor(Math.random() * 3) + 1,
      supplierId: template.providerId,
      supplierName: template.providerName,
      inStock: true,
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
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
    price: 12.00,
    preparationTime: 20,
    isActive: true,
    userId: 'user-1',
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
    monthlyServings: 140, // Cambiado a 140
    ingredients: [
      { id: 'ing-1', name: 'Fideos', quantity: 200, unit: 'g', cost: 0.90 },
      { id: 'ing-2', name: 'Bacon', quantity: 100, unit: 'g', cost: 1.00 },
      { id: 'ing-3', name: 'Huevos', quantity: 2, unit: 'unidad', cost: 0.50 },
      { id: 'ing-4', name: 'Queso Parmesano', quantity: 150, unit: 'g', cost: 1.22 },
      { id: 'ing-5', name: 'Aceite de Oliva', quantity: 1, unit: 'ml', cost: 0.20 },
      { id: 'ing-6', name: 'Sal', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-7', name: 'Pimienta', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-10', name: 'Azúcar', quantity: 1, unit: 'g', cost: 0.20 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Pizza Margarita',
    description: 'Pizza con salsa de tomate, mozzarella y albahaca',
    price: 8.99,
    preparationTime: 12,
    isActive: true,
    userId: 'user-1',
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
    monthlyServings: 140,
    ingredients: [
      { id: 'ing-1', name: 'Harina', quantity: 400, unit: 'g', cost: 1.00 },
      { id: 'ing-2', name: 'Salsa de Tomate', quantity: 250, unit: 'ml', cost: 0.50 },
      { id: 'ing-3', name: 'Mozzarella', quantity: 200, unit: 'g', cost: 2.00 },
      { id: 'ing-4', name: 'Albahaca', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-5', name: 'Aceite de Oliva', quantity: 1, unit: 'ml', cost: 0.20 },
      { id: 'ing-6', name: 'Sal', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-7', name: 'Pimienta', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-8', name: 'Levadura', quantity: 1, unit: 'g', cost: 0.20 },
      { id: 'ing-9', name: 'Agua', quantity: 1, unit: 'ml', cost: 0.20 },
      { id: 'ing-10', name: 'Azúcar', quantity: 1, unit: 'g', cost: 0.20 }
    ]
  }
];

// Initialize data
const initialProducts = [
  ...generateCurrentSupplierProducts(),
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
