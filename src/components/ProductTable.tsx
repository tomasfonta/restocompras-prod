import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Eye, Star, Clock, Package, ShoppingCart } from "lucide-react";
import { Product } from '../types/Product';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useTranslation } from '../contexts/LanguageContext';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isSupplierView: boolean;
  onSupplierClick?: (supplierId: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete, isSupplierView, onSupplierClick }: ProductTableProps) => {
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { addToCart } = useShoppingCart();
  const { t } = useTranslation();

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddToCart = (product: Product) => {
    // Add with default quantity of 1 (only two args, do not pass 3rd arg)
    addToCart(product, 1);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const getPriceColor = (price: number) => {
    if (price < 50) return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30';
    if (price < 200) return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30';
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'Alta': return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'Media': return <Star className="w-4 h-4 text-gray-400 dark:text-gray-500 fill-current" />;
      default: return <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />;
    }
  };

  const getDeliveryColor = (days: number) => {
    if (days <= 2) return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30';
  };

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No hay productos</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {isSupplierView 
              ? 'Agrega tu primer producto para comenzar a vender'
              : 'No se encontraron productos que coincidan con tus filtros'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th 
                className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 w-2/5"
                onClick={() => handleSort('name')}
              >
                Producto
              </th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 w-24">Tamaño</th>
              <th 
                className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 w-32"
                onClick={() => handleSort('price')}
              >
                Precio
              </th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 w-24">Calidad</th>
              <th 
                className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 w-24"
                onClick={() => handleSort('deliveryDays')}
              >
                Entrega
              </th>
              {!isSupplierView && (
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 w-32">Proveedor</th>
              )}
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 w-32">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{product.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md">
                    {product.size} {product.dimension}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-bold px-2 py-1 rounded-md ${getPriceColor(product.price)}`}>
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {getQualityIcon(product.quality)}
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.quality}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className={`text-sm font-medium px-2 py-1 rounded-md ${getDeliveryColor(product.deliveryDays)}`}>
                      {product.deliveryDays} días
                    </span>
                  </div>
                </td>
                {!isSupplierView && (
                  <td className="p-4">
                    <button
                      onClick={() => onSupplierClick?.(product.supplierId)}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium text-sm hover:underline"
                    >
                      {product.supplierName}
                    </button>
                  </td>
                )}
                <td className="p-4">
                  <div className="flex space-x-2">
                    {isSupplierView ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(product)}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(product.id)}
                          className="hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSupplierClick?.(product.supplierId)}
                          className="hover:bg-amber-50 dark:hover:bg-amber-900/30"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver Proveedor
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToCart(product)}
                          className="hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md inline-block mt-1">
                    {product.size} {product.dimension}
                  </span>
                </div>
                <span className={`font-bold px-2 py-1 rounded-md text-sm ${getPriceColor(product.price)}`}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-1">
                  {getQualityIcon(product.quality)}
                  <span className="text-sm text-gray-900 dark:text-gray-100">{product.quality}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-md ${getDeliveryColor(product.deliveryDays)}`}>
                  {product.deliveryDays} días
                </span>
              </div>

              {!isSupplierView && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Proveedor: 
                  <button
                    onClick={() => onSupplierClick?.(product.supplierId)}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium ml-1"
                  >
                    {product.supplierName}
                  </button>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                {isSupplierView ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSupplierClick?.(product.supplierId)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Proveedor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToCart(product)}
                      className="text-green-600 dark:text-green-400"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
