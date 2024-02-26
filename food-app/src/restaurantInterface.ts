import { FoodItem } from "./foodItemInterface";

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  food_items: FoodItem[];
}
