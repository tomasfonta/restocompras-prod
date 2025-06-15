
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from '../contexts/LanguageContext';

interface SavingsDashboardProps {
  totalMonthlySavings: number;
}

const SavingsDashboard = ({ totalMonthlySavings }: SavingsDashboardProps) => {
  const { t } = useTranslation();

  const monthlyData = useMemo(() => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return months.map((month, index) => ({
      month,
      savings: totalMonthlySavings * (0.8 + Math.random() * 0.4), // Simulate variation
      projected: index >= new Date().getMonth()
    }));
  }, [totalMonthlySavings]);

  const totalYearSavings = monthlyData.reduce((sum, data) => sum + data.savings, 0);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('costAnalysis.savingsDashboard')}</h3>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorro Promedio Mensual</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalMonthlySavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Basado en alternativas más baratas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyección Anual</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalYearSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Ahorro total proyectado para el año
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ahorros Mensuales Proyectados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, t('costAnalysis.savings')]}
                  labelFormatter={(label) => `${t('costAnalysis.month')}: ${label}`}
                />
                <Bar 
                  dataKey="savings" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>* Los datos proyectados se basan en los ahorros potenciales identificados en el análisis de ingredientes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsDashboard;
