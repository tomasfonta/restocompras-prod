
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost?: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  preparationTime: number; // in minutes
  ingredients: Ingredient[];
  isActive: boolean;
  userId: string; // Associate dish with user
  createdAt: string;
  updatedAt: string;
}
