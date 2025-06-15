
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = login(email);
    
    if (success) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Error de autenticación",
        description: "Email no encontrado",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">RestoCompras</h1>
          </div>
          <p className="text-slate-600">Accede a tu cuenta para comenzar</p>
        </div>

        <Card className="shadow-lg border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-slate-900">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-slate-600">
              Ingresa tu correo electrónico para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-slate-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5"
                disabled={isLoading}
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="border-t pt-4">
                <p className="text-slate-600 text-sm">
                  ¿No tienes cuenta?{' '}
                  <button className="text-primary hover:text-primary/80 font-medium">
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-primary mb-2">Usuarios Demo</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p><strong>Restaurante:</strong> restaurante@email.com</p>
                <p><strong>Proveedor:</strong> proveedor@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
