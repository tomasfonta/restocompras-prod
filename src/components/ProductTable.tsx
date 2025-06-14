import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Eye, Star, Clock, Package } from "lucide-react";
import { Product } from '../types/Product';

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

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
    if (price < 50) return 'text-green-600 bg-green-50';
    if (price < 200) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'Alta': return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'Media': return <Star className="w-4 h-4 text-gray-400 fill-current" />;
      default: return <Star className="w-4 h-4 text-gray-300" />;
    }
  };

  const getDeliveryColor = (days: number) => {
    if (days <= 2) return 'text-green-600 bg-green-50';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay productos</h3>
          <p className="text-gray-600">
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
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="text-left p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Producto
              </th>
              <th 
                className="text-left p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                Categoría
              </th>
              <th 
                className="text-left p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                Precio
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">Calidad</th>
              <th 
                className="text-left p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('deliveryDays')}
              >
                Entrega
              </th>
              {!isSupplierView && (
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor</th>
              )}
              <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.brand} • {product.size}{product.dimension}</div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {product.category}
                  </Badge>
                </td>
                <td className="p-4">
                  <span className={`font-bold px-2 py-1 rounded-md ${getPriceColor(product.price)}`}>
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {getQualityIcon(product.quality)}
                    <span className="text-sm font-medium">{product.quality}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium px-2 py-1 rounded-md ${getDeliveryColor(product.deliveryDays)}`}>
                      {product.deliveryDays} días
                    </span>
                  </div>
                </td>
                {!isSupplierView && (
                  <td className="p-4">
                    <button
                      onClick={() => onSupplierClick?.(product.supplierId)}
                      className="text-amber-600 hover:text-amber-800 font-medium text-sm hover:underline"
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
                          className="hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(product.id)}
                          className="hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSupplierClick?.(product.supplierId)}
                        className="hover:bg-amber-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Proveedor
                      </Button>
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
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand} • {product.size}{product.dimension}</p>
                </div>
                <span className={`font-bold px-2 py-1 rounded-md text-sm ${getPriceColor(product.price)}`}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  {getQualityIcon(product.quality)}
                  <span className="text-sm">{product.quality}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-md ${getDeliveryColor(product.deliveryDays)}`}>
                  {product.deliveryDays} días
                </span>
              </div>

              {!isSupplierView && (
                <div className="text-sm text-gray-600">
                  Proveedor: 
                  <button
                    onClick={() => onSupplierClick?.(product.supplierId)}
                    className="text-amber-600 hover:text-amber-800 font-medium ml-1"
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
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSupplierClick?.(product.supplierId)}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Proveedor
                  </Button>
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
