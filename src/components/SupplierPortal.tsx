import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Upload, Download, Package, BarChart3 } from "lucide-react";
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import CSVUpload from './CSVUpload';
import { Product } from '../types/Product';
import { downloadCSVTemplate } from '../utils/csvTemplate';

interface SupplierPortalProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
}

const SupplierPortal = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }: SupplierPortalProps) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleFormSubmit = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const totalProducts = products.length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-900">{totalProducts}</CardTitle>
            <CardDescription className="text-gray-600">Productos Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              En catálogo
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="products" className="data-[state=active]:bg-white">Gestión de Productos</TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-white">Carga Masiva</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mis Productos</h2>
              <p className="text-gray-600">Gestiona tu catálogo de productos</p>
            </div>
            <Button 
              onClick={() => setShowProductForm(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          {showProductForm ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductForm
                  initialData={editingProduct}
                  onSubmit={handleFormSubmit}
                  onCancel={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={onDeleteProduct}
              isSupplierView={true}
            />
          )}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Carga Masiva de Productos</h2>
            <p className="text-gray-600">Sube múltiples productos usando archivos CSV</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-amber-600" />
                  Descargar Plantilla
                </CardTitle>
                <CardDescription>
                  Descarga la plantilla CSV con todos los campos requeridos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={downloadCSVTemplate}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Plantilla CSV
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-amber-600" />
                  Subir Archivo
                </CardTitle>
                <CardDescription>
                  Arrastra y suelta tu archivo CSV o haz clic para seleccionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CSVUpload onUpload={onAddProduct} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Análisis de Productos</h2>
            <p className="text-gray-600">Estadísticas y tendencias de tu catálogo</p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Análisis detallado próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierPortal;
