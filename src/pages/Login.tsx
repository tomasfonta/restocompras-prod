
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = login(email);
    
    if (success) {
      toast({
        title: t('toast.loginSuccess.title'),
        description: t('toast.loginSuccess.description'),
      });
      navigate('/dashboard');
    } else {
      toast({
        title: t('toast.loginError.title'),
        description: t('toast.loginError.description'),
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2.5"
                disabled={isLoading}
              >
                {isLoading ? t('login.loadingButton') : t('login.submitButton')}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="border-t pt-4">
                <p className="text-slate-600 text-sm">
                  {t('login.noAccount')}{' '}
                  <button className="text-primary hover:text-primary/80 font-medium">
                    {t('login.register')}
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
              <h3 className="font-semibold text-primary mb-2">{t('login.demoUsers')}</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p><strong>{t('login.demoRestaurant')}:</strong> restaurante@email.com</p>
                <p><strong>{t('login.demoSupplier')}:</strong> proveedor@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
