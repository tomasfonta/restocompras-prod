
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, User, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'supplier' | 'buyer'>('buyer');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos login exitoso y redirigimos al dashboard
    navigate('/', { state: { userType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">RestoCompras</h1>
          </div>
          <p className="text-gray-600">Accede a tu cuenta para comenzar</p>
        </div>

        <Card className="shadow-lg border-amber-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Ingresa tus credenciales para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Tipo de Usuario</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('buyer')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    userType === 'buyer'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Restaurante</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('supplier')}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    userType === 'supplier'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Proveedor</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5"
              >
                Ingresar
              </Button>
            </form>

            <div className="text-center space-y-4">
              <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                ¿Olvidaste tu contraseña?
              </button>
              
              <div className="border-t pt-4">
                <p className="text-gray-600 text-sm">
                  ¿No tienes cuenta?{' '}
                  <button className="text-amber-600 hover:text-amber-700 font-medium">
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-6 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-amber-800 mb-2">Modo Demo</h3>
              <p className="text-amber-700 text-sm">
                Puedes ingresar con cualquier email y contraseña para probar la plataforma
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
