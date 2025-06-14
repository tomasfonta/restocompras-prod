
export interface User {
  id: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  userType: 'restaurant' | 'supplier';
  createdAt: string;
  updatedAt: string;
}
