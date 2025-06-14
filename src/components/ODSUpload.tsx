
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { Product } from '../types/Product';
import { CATEGORIES } from '../types/Category';
import { DIMENSIONS } from '../types/Dimension';

interface ODSUploadProps {
  products: Product[];
  onUpload: (products: Omit<Product, 'id'>[]) => void;
  onUpdate: (products: { id: string; product: Omit<Product, 'id'> }[]) => void;
  supplierId: string;
  supplierName: string;
}

const ODSUpload = ({ products, onUpload, onUpdate, supplierId, supplierName }: ODSUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadODSTemplate = () => {
    const headers = [
      'ID Interno', 'Nombre', 'Tamaño', 'Dimensión', 'Marca', 
      'Precio', 'Categoría', 'Calidad', 'Días Entrega', 'En Stock'
    ];
    
    // Crear datos de ejemplo para la plantilla
    const sampleData = [
      ['', 'Leche Entera', '1', 'L', 'La Serenísima', '85.50', 'Lácteos', 'Alta', '1', 'true'],
      ['', 'Pan Lactal', '1', 'C', 'Bimbo', '120.00', 'Panadería', 'Media', '2', 'true']
    ];

    const csvContent = [headers, ...sampleData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_productos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadMyProducts = () => {
    const headers = [
      'ID Interno', 'Nombre', 'Tamaño', 'Dimensión', 'Marca', 
      'Precio', 'Categoría', 'Calidad', 'Días Entrega', 'En Stock'
    ];
    
    const productData = products.map(product => [
      product.supplierProductId || '',
      product.name,
      product.size.toString(),
      product.dimension,
      product.brand,
      product.price.toString(),
      product.category,
      product.quality,
      product.deliveryDays.toString(),
      product.inStock ? 'true' : 'false'
    ]);

    const csvContent = [headers, ...productData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mis_productos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      
      const validCategories = CATEGORIES.map(c => c.name);
      const validDimensions = DIMENSIONS.map(d => d.name);
      const validQualities = ['Alta', 'Media', 'Básica'];
      
      const processedProducts: Omit<Product, 'id'>[] = [];
      const updatedProducts: { id: string; product: Omit<Product, 'id'> }[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.replace(/"/g, '').trim());
        
        if (values.length < 10) continue;
        
        const [
          supplierProductId, name, sizeStr, dimension, brand,
          priceStr, category, quality, deliveryDaysStr, inStockStr
        ] = values;
        
        // Validaciones
        if (!validDimensions.includes(dimension)) {
          console.warn(`Dimensión inválida: ${dimension}`);
          continue;
        }
        
        if (!validCategories.includes(category)) {
          console.warn(`Categoría inválida: ${category}`);
          continue;
        }
        
        if (!validQualities.includes(quality as any)) {
          console.warn(`Calidad inválida: ${quality}`);
          continue;
        }
        
        const size = parseFloat(sizeStr);
        const price = parseFloat(priceStr);
        const deliveryDays = parseInt(deliveryDaysStr);
        const inStock = inStockStr.toLowerCase() === 'true';
        
        if (isNaN(size) || isNaN(price) || isNaN(deliveryDays)) {
          continue;
        }
        
        const productData: Omit<Product, 'id'> = {
          name,
          size,
          dimension,
          brand,
          price,
          category,
          quality: quality as 'Alta' | 'Media' | 'Básica',
          deliveryDays,
          supplierId,
          supplierName,
          supplierProductId: supplierProductId || undefined,
          inStock,
          lastUpdated: new Date().toISOString()
        };
        
        // Si tiene ID interno, buscar producto existente para actualizar
        if (supplierProductId) {
          const existingProduct = products.find(p => p.supplierProductId === supplierProductId);
          if (existingProduct) {
            updatedProducts.push({ id: existingProduct.id, product: productData });
            continue;
          }
        }
        
        processedProducts.push(productData);
      }
      
      // Procesar nuevos productos
      if (processedProducts.length > 0) {
        onUpload(processedProducts);
      }
      
      // Procesar productos actualizados
      if (updatedProducts.length > 0) {
        updatedProducts.forEach(({ id, product }) => {
          onUpdate([{ id, product }]);
        });
      }
      
      console.log(`Procesados: ${processedProducts.length} nuevos, ${updatedProducts.length} actualizados`);
      
    } catch (error) {
      console.error('Error procesando archivo:', error);
    } finally {
      setIsProcessing(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Descargar Plantilla */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2 text-amber-600" />
              Plantilla ODS
            </CardTitle>
            <CardDescription>
              Descarga la plantilla con formato ODS/CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={downloadODSTemplate}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Plantilla
            </Button>
          </CardContent>
        </Card>

        {/* Descargar Mis Productos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-blue-600" />
              Mis Productos
            </CardTitle>
            <CardDescription>
              Descarga todos tus productos actuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={downloadMyProducts}
              disabled={products.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar ({products.length})
            </Button>
          </CardContent>
        </Card>

        {/* Subir Archivo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2 text-green-600" />
              Subir ODS/CSV
            </CardTitle>
            <CardDescription>
              Sube productos nuevos o actualiza existentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="file"
                accept=".csv,.ods"
                onChange={handleFileUpload}
                className="hidden"
                id="ods-upload"
                disabled={isProcessing}
              />
              <Button 
                className="w-full"
                onClick={() => document.getElementById('ods-upload')?.click()}
                disabled={isProcessing}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isProcessing ? 'Procesando...' : 'Seleccionar Archivo'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50">
        <CardContent className="pt-4">
          <h4 className="font-medium mb-2">Instrucciones para ODS:</h4>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• ID Interno: Usar para identificar productos existentes y actualizarlos</li>
            <li>• Nuevos productos: Dejar ID Interno vacío</li>
            <li>• Actualizar productos: Usar el mismo ID Interno del producto existente</li>
            <li>• El archivo debe mantener el orden de las columnas de la plantilla</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ODSUpload;
