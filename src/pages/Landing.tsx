import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Users,
  Package,
  TrendingUp,
  Star,
  CheckCircle,
} from "lucide-react";
import restocomprasLogo from "../../public/restocompraslogo.png";

const VIDEO_SRC = "../../public/resto1.mp4";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="px-6 py-4 min-h-[72px] backdrop-blur-md bg-white/80 border-b border-blue-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={restocomprasLogo} alt="RestoCompras Logo" className="w-10 h-10 object-contain" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              RestoCompras
            </span>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate(`/login`)}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5"></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <Star className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              Plataforma líder en gestión de suministros
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-primary to-blue-600 bg-clip-text text-transparent">
              Conecta Proveedores
            </span>
            <br />
            <span className="text-slate-700">con Restaurantes</span>
          </h1>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              id="js_video_iframe"
              src="https://jumpshare.com/embed/Ati8GSWGo1tFQkDdSW7J"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              onClick={() => navigate(`/login`)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para optimizar tu cadena de
              suministro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Gestión de Inventario",
                description:
                  "Control total sobre tu catálogo de productos con actualizaciones en tiempo real",
              },
              {
                icon: BarChart3,
                title: "Análisis de Costos",
                description:
                  "Optimiza gastos con análisis detallados y comparativas de precios",
              },
              {
                icon: Users,
                title: "Red de Proveedores",
                description:
                  "Conecta con una amplia red de proveedores verificados y confiables",
              },
              {
                icon: TrendingUp,
                title: "Reportes Avanzados",
                description:
                  "Insights profundos para tomar decisiones basadas en datos",
              },
              {
                icon: CheckCircle,
                title: "Gestión de Pedidos",
                description:
                  "Automatiza y optimiza todo el proceso de pedidos y entregas",
              },
              {
                icon: Star,
                title: "Calidad Garantizada",
                description:
                  "Sistema de calificaciones y reviews para asegurar los mejores productos",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2">55+</div>
              <div className="text-blue-100 text-lg">Proveedores Activos</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100 text-lg">Restaurantes</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100 text-lg">Productos</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 text-lg">Tiempo Activo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            ¿Listo para
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              {" "}
              revolucionar{" "}
            </span>
            tu negocio?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Únete a miles de empresas que ya optimizan sus operaciones con
            nuestra plataforma
          </p>
          <Button
            size="lg"
            onClick={() => navigate(`/login`)}
            className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 group"
          >
            Comenzar Ahora
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-white">
              RestoCompras
            </span>
          </div>
          <p className="text-slate-400">
            © 2025 RestoCompras. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
