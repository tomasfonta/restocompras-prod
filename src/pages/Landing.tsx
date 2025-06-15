
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Users, TrendingUp, Clock, Package, Star, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">RestoCompras</h1>
          </div>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              Iniciar Sesión
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center bg-blue-100/50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Plataforma SaaS líder en gestión de proveedores
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Conectamos <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Restaurantes</span> <br />
            con <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Proveedores</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            La plataforma moderna que revoluciona la gestión de productos con carga masiva inteligente 
            y herramientas visuales avanzadas para comparar precios y características.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-10 py-4 text-lg backdrop-blur-sm">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100/50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Características principales
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Por qué elegir RestoCompras?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Tecnología avanzada que simplifica la gestión y optimiza la conexión entre restaurantes y proveedores</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Gestión Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  Carga masiva mediante CSV, gestión manual completa con validación automática y procesamiento inteligente de datos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Análisis Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  Dashboards intuitivos con codificación por colores, filtros avanzados y comparación inteligente de precios en tiempo real.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Conexión Directa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 text-lg leading-relaxed">
                  Perfiles verificados con información completa, métricas de rendimiento y comunicación directa optimizada.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">1000+</div>
              <div className="text-blue-100 text-lg">Productos Activos</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">500+</div>
              <div className="text-blue-100 text-lg">Restaurantes</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">200+</div>
              <div className="text-blue-100 text-lg">Proveedores</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">24/7</div>
              <div className="text-blue-100 text-lg">Soporte Premium</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100/50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Proceso simplificado
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Cómo funciona?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Proceso optimizado en 3 pasos para máxima eficiencia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-white font-bold text-3xl">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Registro Inteligente</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Configuración rápida con onboarding guiado y verificación automática de perfil.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-white font-bold text-3xl">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Gestión Avanzada</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Carga masiva inteligente, validación automática y sincronización en tiempo real.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-white font-bold text-3xl">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Análisis & Compra</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Comparación visual inteligente con métricas avanzadas y comunicación directa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center bg-blue-100/50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Únete a la revolución digital
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-8">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Forma parte de la plataforma que está redefiniendo la conexión entre restaurantes y proveedores con tecnología de vanguardia.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-16 py-5 text-xl shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-1">
              Comenzar Gratis
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">RestoCompras</span>
              </div>
              <p className="text-gray-300 leading-relaxed">Transformando la industria gastronómica con tecnología innovadora y conexiones inteligentes.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Producto</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Características</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Precios</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Demo Interactiva</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">API Avanzada</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Soporte</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Centro de Ayuda</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Documentación</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Contacto Directo</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Estado del Sistema</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Nuestra Historia</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Blog Técnico</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Oportunidades</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Términos Legales</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RestoCompras. Innovando el futuro de la gastronomía.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
