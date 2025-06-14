
export const generateCSVTemplate = () => {
  const headers = [
    'name',
    'size', 
    'dimension',
    'brand',
    'price',
    'category',
    'quality',
    'deliveryDays',
    'supplierName'
  ];

  const sampleData = [
    'Leche Entera',
    '1',
    'L',
    'La Serenísima',
    '45.50',
    'Lácteos',
    'Alta',
    '2',
    'Mi Empresa'
  ];

  const csvContent = [
    headers.join(','),
    sampleData.join(',')
  ].join('\n');

  return csvContent;
};

export const downloadCSVTemplate = () => {
  const csvContent = generateCSVTemplate();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'plantilla_productos.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
