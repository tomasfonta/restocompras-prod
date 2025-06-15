
// Función para obtener imagen por defecto basada en el nombre del producto
export const getDefaultProductImage = (productName: string): string => {
  const name = productName.toLowerCase();
  
  // Productos lácteos
  if (name.includes('leche') || name.includes('yogur') || name.includes('queso')) {
    return 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop';
  }
  
  // Carnes
  if (name.includes('carne') || name.includes('pollo') || name.includes('cerdo') || name.includes('res')) {
    return 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop';
  }
  
  // Pescados
  if (name.includes('pescado') || name.includes('salmón') || name.includes('atún') || name.includes('merluza')) {
    return 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop';
  }
  
  // Frutas
  if (name.includes('manzana') || name.includes('banana') || name.includes('naranja') || name.includes('fruta')) {
    return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop';
  }
  
  // Verduras
  if (name.includes('lechuga') || name.includes('tomate') || name.includes('cebolla') || name.includes('verdura')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop';
  }
  
  // Aceites y condimentos
  if (name.includes('aceite') || name.includes('vinagre') || name.includes('sal') || name.includes('pimienta')) {
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop';
  }
  
  // Cereales y granos
  if (name.includes('arroz') || name.includes('pasta') || name.includes('harina') || name.includes('cereal')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop';
  }
  
  // Bebidas
  if (name.includes('agua') || name.includes('jugo') || name.includes('gaseosa') || name.includes('bebida')) {
    return 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop';
  }
  
  // Pan y panadería
  if (name.includes('pan') || name.includes('galleta') || name.includes('torta') || name.includes('masa')) {
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop';
  }
  
  // Imagen por defecto genérica
  return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';
};

// Función para obtener la imagen del producto (personalizada o por defecto)
export const getProductImage = (product: { image?: string; name: string }): string => {
  return product.image || getDefaultProductImage(product.name);
};
