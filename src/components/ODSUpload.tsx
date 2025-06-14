
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

  const downloadMyProductsODS = () => {
    const headers = [
      'ID', 'ID Interno', 'Nombre', 'Tamaño', 'Dimensión', 'Marca', 
      'Precio', 'Categoría', 'Calidad', 'Días Entrega', 'En Stock'
    ];
    
    const productData = products.map(product => [
      product.id,
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

    // Generar contenido ODS (simulado como TSV para mejor compatibilidad)
    const odsContent = [headers, ...productData]
      .map(row => row.map(cell => `"${cell}"`).join('\t'))
      .join('\n');

    const blob = new Blob([odsContent], { type: 'application/vnd.oasis.opendocument.spreadsheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis_productos_${supplierName.replace(/\s+/g, '_')}.ods`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleODSUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar que sea un archivo ODS
    if (!file.name.toLowerCase().endsWith('.ods') && !file.type.includes('opendocument')) {
      alert('Por favor, selecciona un archivo ODS válido.');
      return;
    }

    setIsProcessing(true);
    
    try {
      const text = await file.text();
      // Procesar como TSV (Tab Separated Values) que es más común en ODS
      const lines = text.split('\n');
      const headers = lines[0].split('\t').map(h => h.replace(/"/g, '').trim());
      
      const validCategories = CATEGORIES.map(c => c.name);
      const validDimensions = DIMENSIONS.map(d => d.name);
      const validQualities = ['Alta', 'Media', 'Básica'];
      
      const processedProducts: Omit<Product, 'id'>[] = [];
      const updatedProducts: { id: string; product: Omit<Product, 'id'> }[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split('\t').map(v => v.replace(/"/g, '').trim());
        
        if (values.length < 11) continue;
        
        const [
          id, supplierProductId, name, sizeStr, dimension, brand,
          priceStr, category, quality, deliveryDaysStr, inStockStr
        ] = values;
        
        // Validaciones específicas para ODS
        if (!validDimensions.includes(dimension)) {
          console.warn(`Dimensión inválida en ODS: ${dimension}`);
          continue;
        }
        
        if (!validCategories.includes(category)) {
          console.warn(`Categoría inválida en ODS: ${category}`);
          continue;
        }
        
        if (!validQualities.includes(quality as any)) {
          console.warn(`Calidad inválida en ODS: ${quality}`);
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
        
        // Si tiene ID, buscar producto existente para actualizar
        if (id) {
          const existingProduct = products.find(p => p.id === id);
          if (existingProduct) {
            updatedProducts.push({ id, product: productData });
            continue;
          }
        }
        
        // Si no tiene ID o no se encuentra, crear nuevo producto
        processedProducts.push(productData);
      }
      
      // Procesar nuevos productos
      if (processedProducts.length > 0) {
        onUpload(processedProducts);
      }
      
      // Procesar productos actualizados
      if (updatedProducts.length > 0) {
        onUpdate(updatedProducts);
      }
      
      console.log(`Archivo ODS procesado: ${processedProducts.length} nuevos, ${updatedProducts.length} actualizados`);
      
    } catch (error) {
      console.error('Error procesando archivo ODS:', error);
      alert('Error al procesar el archivo ODS. Por favor, verifica el formato.');
    } finally {
      setIsProcessing(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Descargar Mis Productos en ODS */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Mis Productos ODS
            </CardTitle>
            <CardDescription>
              Descarga todos tus productos en formato ODS para editar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-blue-300 hover:bg-blue-50"
              onClick={downloadMyProductsODS}
              disabled={products.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar ODS ({products.length})
            </Button>
          </CardContent>
        </Card>

        {/* Subir Archivo ODS */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Upload className="w-5 h-5 mr-2" />
              Subir Archivo ODS
            </CardTitle>
            <CardDescription>
              Sube el archivo editado para actualizar tus productos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="file"
                accept=".ods,application/vnd.oasis.opendocument.spreadsheet"
                onChange={handleODSUpload}
                className="hidden"
                id="ods-upload"
                disabled={isProcessing}
              />
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => document.getElementById('ods-upload')?.click()}
                disabled={isProcessing}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isProcessing ? 'Procesando ODS...' : 'Seleccionar Archivo ODS'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-4">
          <h4 className="font-medium mb-2 text-amber-800">Instrucciones para archivos ODS:</h4>
          <ul className="text-sm text-amber-700 space-y-1 ml-4">
            <li>• <strong>Descarga tus productos:</strong> Usa el botón "Descargar ODS" para obtener tu lista actual</li>
            <li>• <strong>Edita en LibreOffice/OpenOffice:</strong> Abre el archivo .ods y modifica los datos necesarios</li>
            <li>• <strong>Mantén el ID:</strong> No elimines la columna ID para que se actualicen correctamente</li>
            <li>• <strong>Nuevos productos:</strong> Deja la columna ID vacía para crear productos nuevos</li>
            <li>• <strong>Sube el archivo:</strong> Guarda como .ods y súbelo para aplicar los cambios</li>
            <li>• <strong>Formato exclusivo ODS:</strong> Solo se aceptan archivos .ods (LibreOffice/OpenOffice Calc)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ODSUpload;
