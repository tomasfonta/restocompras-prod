
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart as CartIcon, Phone, Mail, Trash2 } from "lucide-react";
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useTranslation } from '../contexts/LanguageContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalCost } = useShoppingCart();
  const { t } = useTranslation();

  const handleQuantityChange = (productId: string, newQuantity: number, monthlyAmount: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity, monthlyAmount);
    }
  };

  const handleMonthlyAmountChange = (productId: string, quantity: number, newMonthlyAmount: number) => {
    if (newMonthlyAmount > 0) {
      updateQuantity(productId, quantity, newMonthlyAmount);
    }
  };

  const groupedBySupplier = cartItems.reduce((acc, item) => {
    const supplierId = item.product.supplierId;
    if (!acc[supplierId]) {
      acc[supplierId] = {
        supplier: item.product.supplierName,
        items: []
      };
    }
    acc[supplierId].items.push(item);
    return acc;
  }, {} as Record<string, { supplier: string; items: typeof cartItems }>);

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <CartIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('shoppingCart.emptyCart')}</h3>
          <p className="text-gray-600">{t('shoppingCart.addProducts')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('shoppingCart.title')}</h2>
        <p className="text-gray-600">{t('shoppingCart.description')}</p>
      </div>

      {/* Total Cost Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">{t('shoppingCart.totalCost')}: ${getTotalCost().toFixed(2)}</CardTitle>
        </CardHeader>
      </Card>

      {/* Items grouped by supplier */}
      {Object.entries(groupedBySupplier).map(([supplierId, { supplier, items }]) => (
        <Card key={supplierId}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{supplier}</span>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+54 11 1234-5678</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>contacto@{supplier.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{item.product.brand} - {item.product.size}{item.product.dimension}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.product.category}</Badge>
                      <Badge variant="outline" className="text-xs">{item.product.quality}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{t('shoppingCart.quantity')}</div>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0, item.monthlyAmount)}
                        className="w-20"
                        min="1"
                      />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Mensual</div>
                      <Input
                        type="number"
                        value={item.monthlyAmount}
                        onChange={(e) => handleMonthlyAmountChange(item.product.id, item.quantity, parseInt(e.target.value) || 0)}
                        className="w-20"
                        min="1"
                      />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Precio Unit.</div>
                      <div className="font-semibold">${item.product.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Mensual</div>
                      <div className="font-bold text-lg">${(item.product.price * item.monthlyAmount).toFixed(2)}</div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShoppingCart;
