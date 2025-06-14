
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  cost?: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  preparationTime: number; // in minutes
  ingredients: Ingredient[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
