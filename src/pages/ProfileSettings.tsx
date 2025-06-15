
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, User, Building, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import { toast } from "@/hooks/use-toast";
import GoogleMapSelector from '../components/GoogleMapSelector';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useUser();
  
  const [formData, setFormData] = useState({
    companyName: currentUser?.companyName || '',
    address: currentUser?.address || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    userType: currentUser?.userType || 'restaurant'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido guardados exitosamente.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (address: string) => {
    handleChange('address', address);
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <User className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
              <p className="text-gray-600">Gestiona la información de tu cuenta</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Información de la Empresa</CardTitle>
            <CardDescription>
              Actualiza los datos de tu empresa y configuración de cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Nombre de la Empresa
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Address with Map Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dirección
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Dirección manual o selecciona en el mapa"
                  required
                />
                <GoogleMapSelector 
                  onAddressSelect={handleAddressSelect}
                  defaultAddress={formData.address}
                />
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Tipo de Usuario
                </Label>
                <Select value={formData.userType} onValueChange={(value) => handleChange('userType', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="restaurant">Restaurante</SelectItem>
                    <SelectItem value="supplier">Proveedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
