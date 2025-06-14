
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Package, Star } from "lucide-react";
import { Product } from '../types/Product';

interface SupplierProfileProps {
  supplierId: string;
  products: Product[];
  onBack: () => void;
}

const SupplierProfile = ({ supplierId, products, onBack }: SupplierProfileProps) => {
  const supplierName = products[0]?.supplierName || 'Proveedor';
  const activeProducts = products.filter(p => p.inStock);
  const avgDelivery = products.length > 0 ? 
    Math.round(products.reduce((sum, p) => sum + p.deliveryDays, 0) / products.length) : 0;
  const categories = new Set(products.map(p => p.category));
  const avgPrice = products.length > 0 ? 
    products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Button>
      </div>

      {/* Supplier Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{supplierName.charAt(0)}</span>
              </div>
              <CardTitle className="text-2xl text-gray-900">{supplierName}</CardTitle>
              <CardDescription className="text-gray-600">Proveedor Premium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contacto@{supplierName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Tiempo promedio: {avgDelivery} días</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Productos Activos</span>
                <Badge variant="secondary">{activeProducts.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Categorías</span>
                <Badge variant="secondary">{categories.size}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Precio Promedio</span>
                <Badge variant="secondary">${avgPrice.toFixed(2)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calificación</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-amber-600" />
                Productos Disponibles
              </CardTitle>
              <CardDescription>
                Explora todos los productos de {supplierName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Este proveedor no tiene productos disponibles</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <Card key={product.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.brand}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm font-medium text-gray-900">{product.size}</span>
                                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md font-medium">
                                  {product.dimension}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                              >
                                {product.inStock ? 'En Stock' : 'Agotado'}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {product.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                              {product.quality}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{product.deliveryDays} días</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{product.quality}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
