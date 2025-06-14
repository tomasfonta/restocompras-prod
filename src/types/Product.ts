
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
  inStock: boolean;
  lastUpdated: string;
}
