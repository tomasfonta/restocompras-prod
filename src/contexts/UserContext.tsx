
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface UserContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  users: User[];
  addUser: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const sampleUsers: User[] = [
  {
    id: 'user-1',
    companyName: 'Restaurante El Sabor Ibérico',
    address: 'Gran Vía 34, 28013 Madrid',
    phone: '+34 91 123 45 67',
    email: 'restaurante@email.com',
    password: 'password123',
    userType: 'restaurant',
    createdAt: '2025-07-10T10:00:00Z',
    updatedAt: '2025-07-10T10:00:00Z'
  },
  {
    id: 'user-2',
    companyName: 'Lácteos de la Dehesa',
    address: 'Polígono Industrial Las Rozas, 28232 Las Rozas de Madrid',
    phone: '+34 91 765 43 21',
    email: 'proveedor@email.com',
    password: 'password123',
    userType: 'supplier',
    createdAt: '2025-07-10T11:00:00Z',
    updatedAt: '2025-07-10T11:00:00Z'
  },
  {
    id: 'user-3',
    companyName: 'Taberna La Giralda',
    address: 'Calle Betis 10, 41010 Sevilla',
    phone: '+34 95 432 10 98',
    email: 'taberna.giralda@email.es',
    password: 'password123',
    userType: 'restaurant',
    createdAt: '2025-07-11T09:30:00Z',
    updatedAt: '2025-07-11T09:30:00Z'
  },
  {
    id: 'user-4',
    companyName: 'Horticultores del Mediterráneo',
    address: 'Camino de Ronda 120, 18004 Granada',
    phone: '+34 95 876 54 32',
    email: 'horticultores.med@email.es',
    password: 'password123',
    userType: 'supplier',
    createdAt: '2025-07-11T10:15:00Z',
    updatedAt: '2025-07-11T10:15:00Z'
  },
  {
    id: 'user-5',
    companyName: 'Restaurante El Peñón',
    address: 'Paseo Marítimo 5, 29016 Málaga',
    phone: '+34 95 210 20 30',
    email: 'restaurante.penon@email.es',
    password: 'password123',
    userType: 'restaurant',
    createdAt: '2025-07-12T14:00:00Z',
    updatedAt: '2025-07-12T14:00:00Z'
  },
  {
    id: 'user-6',
    companyName: 'Panadería Artesana El Horno',
    address: 'Carrer de la Creu Coberta 15, 08014 Barcelona',
    phone: '+34 93 456 78 90',
    email: 'panaderia.horno@email.es',
    password: 'password123',
    userType: 'supplier',
    createdAt: '2025-07-12T15:00:00Z',
    updatedAt: '2025-07-12T15:00:00Z'
  },
  {
    id: 'user-7', // Nuevo proveedor para proteínas, pescados, etc.
    companyName: 'Distribuciones Mayoristas del Sur',
    address: 'Zona Industrial Oeste, 29006 Málaga',
    phone: '+34 95 240 50 60',
    email: 'distribuciones.sur@email.es',
    password: 'password123',
    userType: 'supplier',
    createdAt: '2025-07-13T08:00:00Z',
    updatedAt: '2025-07-13T08:00:00Z'
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString()
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update in users array
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    }
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      login,
      logout,
      updateUser,
      users,
      addUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
