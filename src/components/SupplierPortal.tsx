import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PlusCircle, Upload, Download, BarChart3, FileSpreadsheet, Search } from "lucide-react";
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import CSVUpload from './CSVUpload';
import ODSUpload from './ODSUpload';
import { Product } from '../types/Product';
import { downloadCSVTemplate } from '../utils/csvTemplate';

interface SupplierPortalProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  supplierId: string;
  supplierName: string;
}

const SupplierPortal = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, supplierId, supplierName }: SupplierPortalProps) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleBulkUpload = (newProducts: Omit<Product, 'id'>[]) => {
    newProducts.forEach(product => onAddProduct(product));
  };

  const handleBulkUpdate = (updates: { id: string; product: Omit<Product, 'id'> }[]) => {
    updates.forEach(({ id, product }) => onUpdateProduct(id, product));
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="products" className="data-[state=active]:bg-white">Gestión de Productos</TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-white">Carga CSV</TabsTrigger>
          <TabsTrigger value="ods" className="data-[state=active]:bg-white">Carga ODS</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar productos por nombre, marca o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
              products={filteredProducts}
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

        <TabsContent value="ods" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión con ODS</h2>
            <p className="text-gray-600">Sube, descarga y actualiza productos usando archivos ODS/CSV</p>
          </div>

          <ODSUpload
            products={products}
            onUpload={handleBulkUpload}
            onUpdate={handleBulkUpdate}
            supplierId={supplierId}
            supplierName={supplierName}
          />
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
