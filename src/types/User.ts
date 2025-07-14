import { UserType } from "@/contexts/UserContext";

export interface User {
  id: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}
