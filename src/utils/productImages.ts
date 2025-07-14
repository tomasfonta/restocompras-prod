
// Arrays de imágenes por categoría (imágenes únicas)
const lacteosImages = [
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-ec6b0b1b6b47?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
];

const carnesImages = [
  'https://itene.com/wp-content/uploads/2022/03/Pollo-envasado-2-.jpg',
  'https://images.unsplash.com/photo-1504674900247-ec6b0b1b6b47?w=400&h=400&fit=crop',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTze6k1MG-DwSUK76wBR6r1r9m4m417L4eb9din5UJpRZZEfdnEs-z2hoBIopmEiYFzgzM&usqp=CAU',
  'https://www.traza.net/wp-content/uploads/2024/02/etiquetado_de_la_carne.jpg',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://www.traza.net/wp-content/uploads/2024/02/etiquetado_de_la_carne.jpg',
  'https://sevilla.cosasdecome.es/wp-content/uploads/2018/09/Chuleton-cdc-847x435.jpg',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
  'https://s1.1zoom.me/big0/807/Meat_products_White_background_Cutting_board_557758_1280x856.jpg',
];

const pescadosImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_UgRNHYswH6nULWCA-ksklyfmxciywBAZDg&s',
  'https://www.pescaderiascorunesas.es/sites/default/files/styles/imagen_de_ficha/public/2017-11/Sargo_0.jpg?itok=LeyGI-R8',
  'https://img.freepik.com/free-photo/pieces-raw-steak-from-fresh-salmon-lying-ice-counter_169016-36250.jpg?semt=ais_hybrid&w=740',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
];

const frutasImages = [
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
];

const verdurasImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQF0bPJwXst0vaGTltadSo-ZEm67xq40Qjhg&s',
  'https://static-cla-nys.pro.centrallecheraasturiana.es/uploads/2023/03/Verduras-y-hortalizas-1024x574.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLs5maAoJGwUbH5_V-667xAv0zeaJhNEp9UuVvELs3k4y0yRqPDCt2Htwc_3TA-jRNHE&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoL8_NRqltibH8rALwHV70pCEHGOjDtn-p8A&s',
];

const aceitesImages = [
  'https://super-del-corral.myshopify.com/cdn/shop/products/8410010813729.webp?v=1666027057',
  'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202504/08/00118044800037____1__600x600.jpg',
  'https://i0.wp.com/urzante.com/wp-content/uploads/2021/12/5L-Oliva-Intenso.png?fit=1600%2C1600&ssl=1',
  'https://mercury.vtexassets.com/arquivos/ids/8617030-800-800?v=638841439603370000&width=800&height=800&aspect=true',
  'https://urzante.com/wp-content/uploads/2021/12/1L-Oliva-Suave.png',
];

const cerealesImages = [
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop',
  'https://st2.depositphotos.com/1028911/5837/i/450/depositphotos_58374203-stock-photo-3d-corn-flakes-paper-package.jpg',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop',
  'https://thumbs.dreamstime.com/b/corn-kernels-maize-grains-last-harvest-year-organic-natural-seed-produces-every-year-quite-93111945.jpg',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-jumbo.jpg',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
];

const bebidasImages = [
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
  'https://img.freepik.com/vector-gratis/icono-vector-realista-botella-agua-plastico-aislado-sobre-fondo-blanco-bebida-maqueta-bebida_134830-1356.jpg?semt=ais_hybrid&w=740',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYK3gGaPGxTHJ9nhZ5WrphDhSPAaeQFGaLw&s',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
];

const panaderiaImages = [
  'https://cursosclick.es/WebRoot/Store3/Shops/96fb7fca-7bf8-4186-908c-067fdf41bc30/582A/E266/A7B4/00AC/85A9/0A48/3509/0B21/espana-cola-consumo-pan-644x362.JPG',
  'https://ladespensadeandres.com/wp-content/uploads/2023/12/tostadas-naturales-01.jpg',
  'https://images.unsplash.com/photo-1504674900247-ec6b0b1b6b47?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
  'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202410/28/00118037900018____7__600x600.jpg',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
];

const defaultImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyR91ocIGvveAv3uPklP77_QDTfNjNEiPMwg&s',
  'https://images.unsplash.com/photo-1504674900247-ec6b0b1b6b47?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop',
  'https://www.timeoutdubai.com/cloud/timeoutdubai/2025/02/28/Sirali-5.jpghttps://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
  'https://abcmallorcastorage.blob.core.windows.net/images/2021/08/Izakaya-Restaurant-28.jpg',
  'https://visitstaunton.com/wp-content/uploads/2022/09/restaurants-lg.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hgngclE7cAErKYrdNUhySCXlCS3oDTUz29rkH6fCGMlL7uR1ZJSQIhXs7T7WD4l4dSM&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsvxLGItzd8wX2PWCjWX8QGcFcV9iHWOUeFgfcnmI0_hYywKT9fISoS0NzjJq2PB-NO4&usqp=CAU',
];

// Ampliar lógica de coincidencia de nombres (sin repeticiones)
const lacteosKeywords = [
  'leche', 'yogur', 'queso', 'mantequilla', 'nata', 'parmesano', 'mozzarella', 'cheddar', 'curado', 'fresco', 'ricotta', 'provolone', 'gruyere', 'crema', 'lácteo', 'huevo', 'huevos', 'margarina', 'leche condensada', 'nata cocinar', 'nata montar'
];

const carnesKeywords = [
  'carne', 'pollo', 'cerdo', 'res', 'ternera', 'cordero', 'bacon', 'jamón', 'chuleta', 'chuletilla', 'salchicha', 'embutido', 'pavo', 'vacuno', 'costilla', 'lomo', 'picada', 'hamburguesa', 'morcilla', 'chorizo', 'foie', 'paté', 'salchichón', 'ahumado', 'loncha', 'lonchas', 'entrecot', 'chuletón', 'costillar', 'asado', 'filete', 'pechuga', 'muslo', 'alita', 'pierna', 'solomillo', 'tira', 'tiras', 'mixto', 'mixta', 'mixtas', 'mixtos', 'entero', 'enteros', 'granel', 'bandeja', 'bandejas', 'fresco', 'fresca', 'frescos', 'frescas', 'congelado', 'congelada', 'congelados', 'congeladas'
];

const pescadosKeywords = [
  'pescado', 'salmón', 'atún', 'merluza', 'bacalao', 'dorada', 'sardina', 'lubina', 'pulpo', 'calamar', 'gamba', 'camarón', 'almeja', 'mejillón', 'boquerón', 'anchoa', 'capellán', 'pescado blanco', 'pescado azul', 'marisco', 'mariscos'
];

const frutasKeywords = [
  'manzana', 'banana', 'naranja', 'fruta', 'pera', 'uva', 'fresa', 'mango', 'kiwi', 'piña', 'limón', 'lima', 'baya', 'bayas', 'aguacate', 'dátil', 'ciruela', 'pasa', 'frutos secos', 'almendra', 'nuez', 'pistacho', 'piñón', 'pasa'
];

const verdurasKeywords = [
  'lechuga', 'tomate', 'cebolla', 'verdura', 'pimiento', 'pepino', 'calabacín', 'espinaca', 'rúcula', 'acelga', 'patata', 'zanahoria', 'apio', 'brócoli', 'coliflor', 'espárrago', 'batata', 'champiñón', 'seta', 'shiitake', 'jengibre', 'cebolleta', 'cebollino', 'hierba', 'hierbas', 'perejil', 'cilantro', 'albahaca', 'romero', 'tomillo', 'ajo'
];

const aceitesKeywords = [
  'aceite', 'vinagre', 'sal', 'pimienta', 'condimento', 'condimentos', 'especia', 'especias', 'salsa', 'salsas', 'mostaza', 'ketchup', 'mayonesa', 'alcaparra', 'aceituna', 'pasta anchoa', 'salsa picante', 'sriracha', 'miso', 'curry', 'cúrcuma', 'comino', 'pimentón', 'azafrán', 'canela', 'nuez moscada', 'clavo', 'orégano', 'laurel', 'cayena', 'colorante', 'decoración'
];

const cerealesKeywords = [
  'arroz', 'pasta', 'harina', 'cereal', 'avena', 'trigo', 'maíz', 'espagueti', 'macarrón', 'couscous', 'quinoa', 'maicena', 'pan rallado', 'panko', 'semilla', 'semillas', 'sésamo', 'chía', 'garbanzo', 'lenteja', 'legumbre', 'legumbres'
];

const bebidasKeywords = [
  'agua', 'jugo', 'gaseosa', 'bebida', 'refresco', 'cerveza', 'vino', 'cava', 'café', 'té', 'leche desnatada', 'leche avena', 'leche coco', 'concentrado', 'sirope', 'energética', 'sin alcohol', 'cóctel', 'cócteles', 'zumo', 'zumo concentrado'
];

const panaderiaKeywords = [
  'pan', 'galleta', 'torta', 'masa', 'bizcocho', 'pastel', 'croissant', 'hamburguesa', 'hot dog', 'bao', 'tortilla', 'pizza', 'base pizza', 'hojaldre', 'levadura', 'bicarbonato', 'gelatina', 'extracto vainilla', 'cacao', 'chocolate', 'azúcar', 'miel', 'mermelada', 'condensada'
];

function getRandomImage(images: string[]): string {
  return images[Math.floor(Math.random() * images.length)];
}



// Función para obtener imagen por defecto basada en el nombre del producto
export const getDefaultProductImage = (productName: string): string => {
  const name = productName.toLowerCase();

  // Lácteos y huevos
  if (lacteosKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(lacteosImages);
  }
  // Carnes y embutidos
  if (carnesKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(carnesImages);
  }
  // Pescados
  if (pescadosKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(pescadosImages);
  }
  // Frutas
  if (frutasKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(frutasImages);
  }
  // Verduras
  if (verdurasKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(verdurasImages);
  }
  // Aceites y condimentos
  if (aceitesKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(aceitesImages);
  }
  // Cereales y granos
  if (cerealesKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(cerealesImages);
  }
  // Bebidas
  if (bebidasKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(bebidasImages);
  }
  // Pan y panadería
  if (panaderiaKeywords.some(keyword => name.includes(keyword))) {
    return getRandomImage(panaderiaImages);
  }

  // Imagen por defecto genérica
  return getRandomImage(defaultImages);
};

// Función para obtener la imagen del producto (personalizada o por defecto)
export const getProductImage = (product: { image?: string; name: string }): string => {
  return product.image || getDefaultProductImage(product.name);
};
