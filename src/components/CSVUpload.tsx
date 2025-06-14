
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Product } from '../types/Product';

interface CSVUploadProps {
  onUpload: (product: Omit<Product, 'id'>) => void;
}

const CSVUpload = ({ onUpload }: CSVUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const processCSV = async (file: File) => {
    setUploading(true);
    setUploadResult(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('El archivo debe contener al menos una fila de datos además del encabezado');
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const requiredHeaders = ['name', 'size', 'dimension', 'brand', 'price', 'category', 'quality', 'deliveryDays', 'supplierName'];
      
      const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
      if (missingHeaders.length > 0) {
        throw new Error(`Faltan las siguientes columnas: ${missingHeaders.join(', ')}`);
      }

      let successCount = 0;
      const errors: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim());
          const rowData: any = {};
          
          headers.forEach((header, index) => {
            rowData[header] = values[index] || '';
          });

          // Validate and transform data
          const product: Omit<Product, 'id'> = {
            name: rowData.name,
            size: parseFloat(rowData.size),
            dimension: rowData.dimension,
            brand: rowData.brand,
            price: parseFloat(rowData.price),
            category: rowData.category,
            quality: rowData.quality as 'Alta' | 'Media' | 'Básica',
            deliveryDays: parseInt(rowData.deliveryDays),
            supplierId: 'supplier-1',
            supplierName: rowData.supplierName,
            inStock: true,
            lastUpdated: new Date().toISOString()
          };

          // Basic validation
          if (!product.name || !product.brand || isNaN(product.price) || isNaN(product.size)) {
            errors.push(`Fila ${i + 1}: Datos incompletos o inválidos`);
            continue;
          }

          onUpload(product);
          successCount++;
        } catch (error) {
          errors.push(`Fila ${i + 1}: Error al procesar - ${error}`);
        }
      }

      setUploadResult({ success: successCount, errors });
    } catch (error) {
      setUploadResult({ success: 0, errors: [error instanceof Error ? error.message : 'Error desconocido'] });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));

    if (csvFile) {
      processCSV(csvFile);
    } else {
      setUploadResult({ success: 0, errors: ['Por favor, sube un archivo CSV válido'] });
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragOver 
            ? 'border-amber-500 bg-amber-50' 
            : 'border-gray-300 hover:border-amber-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="py-12 text-center">
          <div className="space-y-4">
            <Upload className={`w-12 h-12 mx-auto ${dragOver ? 'text-amber-500' : 'text-gray-400'}`} />
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Arrastra tu archivo CSV aquí
              </p>
              <p className="text-gray-600 mb-4">
                o haz clic para seleccionar un archivo
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('csv-upload')?.click()}
                disabled={uploading}
              >
                <FileText className="w-4 h-4 mr-2" />
                {uploading ? 'Procesando...' : 'Seleccionar Archivo'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadResult && (
        <Card className={uploadResult.success > 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <CardContent className="py-4">
            <div className="flex items-start space-x-3">
              {uploadResult.success > 0 ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                {uploadResult.success > 0 && (
                  <p className="text-green-800 font-medium mb-2">
                    ✓ {uploadResult.success} productos cargados exitosamente
                  </p>
                )}
                {uploadResult.errors.length > 0 && (
                  <div>
                    <p className="text-red-800 font-medium mb-2">Errores encontrados:</p>
                    <ul className="text-red-700 text-sm space-y-1">
                      {uploadResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Formato requerido para el CSV:</p>
            <p className="mb-2">Las columnas deben incluir: name, size, dimension, brand, price, category, quality, deliveryDays, supplierName</p>
            <p>Ejemplo: "Leche Entera,1,L,La Serenísima,45.50,Lácteos,Alta,2,Mi Empresa"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSVUpload;
