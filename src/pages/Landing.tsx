
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, TrendingUp, ShoppingCart, Package, Star, MapPin, Clock, DollarSign, Shield, Zap } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RestaurantConnect</h1>
                <p className="text-xs text-gray-600">Conectando sabores</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => navigate('/login')}>
                Comenzar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-800 border-amber-300">
                <Zap className="w-3 h-3 mr-1" />
                Plataforma Digital #1
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Conecta tu
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600"> restaurante </span>
                  con los mejores proveedores
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Optimiza tus compras, reduce costos y encuentra los mejores ingredientes para tu cocina. 
                  Una plataforma que conecta restaurantes con proveedores de calidad.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg"
                  onClick={() => navigate('/login')}
                >
                  Empezar Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg"
                  onClick={() => navigate('/login')}
                >
                  Ver Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Gratis por 30 días</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Datos seguros</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center"
                  alt="Plataforma RestaurantConnect en uso"
                  className="rounded-2xl shadow-2xl border border-gray-200"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Ahorro mensual</p>
                      <p className="text-lg font-bold text-green-600">$2,150</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Proveedores</p>
                      <p className="text-lg font-bold text-amber-600">150+</p>
                    </div>
                  </div>
                </div>

                {/* Animated money symbols */}
                <div className="absolute top-1/4 -right-8 animate-bounce">
                  <DollarSign className="w-6 h-6 text-green-500 opacity-60" />
                </div>
                
                <div className="absolute top-1/2 -left-8 animate-pulse">
                  <DollarSign className="w-4 h-4 text-green-400 opacity-40" />
                </div>

                <div className="absolute bottom-1/4 -right-12 animate-bounce delay-1000">
                  <DollarSign className="w-5 h-5 text-green-600 opacity-50" />
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-yellow-100 rounded-3xl transform rotate-6 scale-105 opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Características
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Todo lo que necesitas para optimizar tu restaurante
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales para gestionar proveedores, analizar costos y maximizar tus ganancias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Red de Proveedores</CardTitle>
                <CardDescription>
                  Conecta con más de 150 proveedores verificados y encuentra los mejores precios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Análisis de Costos</CardTitle>
                <CardDescription>
                  Analiza el costo de tus platos y optimiza tus márgenes de ganancia automáticamente
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Gestión de Pedidos</CardTitle>
                <CardDescription>
                  Sistema inteligente de pedidos que optimiza tus compras y reduce desperdicios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Calidad Garantizada</CardTitle>
                <CardDescription>
                  Todos nuestros proveedores están verificados y tienen garantía de calidad
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Entrega Rápida</CardTitle>
                <CardDescription>
                  Tiempos de entrega optimizados con seguimiento en tiempo real de tus pedidos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Cobertura Nacional</CardTitle>
                <CardDescription>
                  Servicio disponible en toda Argentina con proveedores locales y regionales
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-amber-100">Restaurantes</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">150+</div>
              <div className="text-amber-100">Proveedores</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">$2M+</div>
              <div className="text-amber-100">Ahorros Generados</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-amber-100">Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para optimizar tu restaurante?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a cientos de restaurantes que ya están ahorrando tiempo y dinero
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg"
              onClick={() => navigate('/login')}
            >
              Comenzar Prueba Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg"
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">RestaurantConnect</h3>
                  <p className="text-gray-400 text-sm">Conectando sabores</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                La plataforma líder para conectar restaurantes con proveedores de calidad en Argentina.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Características</li>
                <li>Precios</li>
                <li>API</li>
                <li>Integraciones</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centro de Ayuda</li>
                <li>Contacto</li>
                <li>Estado del Servicio</li>
                <li>Términos</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RestaurantConnect. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
