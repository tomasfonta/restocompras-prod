
export interface Product {
  id: string;
  name: string;
  size: number;
  dimension: string;
  brand: string;
  price: number;
  category: string;
  quality: 'Alta' | 'Media' | 'Básica';
  deliveryDays: number;
  supplierId: string;
  supplierName: string;
  supplierProductId?: string; // Identificación del proveedor (no visible en tablas)
  inStock: boolean;
  lastUpdated: string;
  imageUrl?: string; // Nueva propiedad para la imagen del producto
}
