
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import { useTranslation } from '../contexts/LanguageContext';
import { toast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleButtons, setShowRoleButtons] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const navigate = useNavigate();
  const { login, users } = useUser();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setCompanyNameError('');
    if (!validateEmail(email)) {
      setEmailError('El correo electrónico no es válido. Por favor, revisa e intenta nuevamente.');
      return;
    }
    if (!companyName.trim()) {
      setCompanyNameError('El nombre de la empresa es obligatorio.');
      return;
    }

    // ENVÍO CON EMAILJS
    emailjs.send(
      'restocompras', // Service ID
      'restocomprastemplate', // Template ID
      { message: "Email: " + email + " " + "Empresa: " + companyName },
      'GqDAa6lVnWECIHjS4' // Public Key
    ).then(
      (result) => {
        console.log('Email enviado:', result.text);
      },
      (error) => {
        console.error('Error al enviar email:', error.text);
      }
    );

    setShowRoleButtons(true);
  };

  const handleRoleLogin = (role: 'restaurant' | 'supplier') => {
    setIsLoading(true);
    let loginEmail = '';
    if (role === 'supplier') {
      loginEmail = 'proveedor@email.com';
    } else {
      loginEmail = 'restaurante@email.com';
    }
    const success = login(loginEmail);
    if (success) {
      toast({
        title: t('toast.loginSuccess.title'),
        description: t('toast.loginSuccess.description'),
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Usuario no encontrado',
        description: 'No existe un usuario con ese email.',
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
            {t('login.backToHome')}
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">RestoCompras</h1>
          </div>
          <p className="text-slate-600">{t('login.description')}</p>
        </div>

        <Card className="shadow-lg border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-slate-900">{t('login.cardTitle')}</CardTitle>
            <CardDescription className="text-center text-slate-600">
              {t('login.cardDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showRoleButtons ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
                    Nombre de la empresa
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Ej: Restaurante El Sabor"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border-slate-300 focus:border-primary focus:ring-primary"
                    required
                  />
                  {companyNameError && (
                    <p className="text-red-500 text-xs mt-1">{companyNameError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    {t('login.emailLabel')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-slate-300 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? t('login.loadingButton') : t('login.submitButton')}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg"
                  onClick={() => handleRoleLogin('supplier')}
                  disabled={isLoading}
                >
                  Ingresar como proveedor
                </Button>
                <Button
                  type="button"
                  className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg"
                  onClick={() => handleRoleLogin('restaurant')}
                  disabled={isLoading}
                >
                  Ingresar como cliente
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowRoleButtons(false)}
                  disabled={isLoading}
                >
                  Volver
                </Button>
              </div>
            )}

            <div className="text-center space-y-4">
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
