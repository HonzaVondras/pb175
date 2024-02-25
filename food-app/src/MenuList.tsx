import { useEffect, useState } from "react";
import axios from "axios";

interface FoodItem {
  id: number;
  name: string;
  price: number;
}

const MenuList: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/food/") // Django api endpoint
      .then((response) => setFoodItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {foodItems.map((food) => (
          <li key={food.id}> {food.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
