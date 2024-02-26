import React, { useState } from "react";
import { FoodItem } from "./foodItemInterface";

interface FoodComponentProps {
  foodItem: FoodItem;
}

const FoodComponent: React.FC<FoodComponentProps> = ({ foodItem }) => {
  const [foodAmount, setFoodAmount] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value, 10);
    setFoodAmount(newAmount);
  };

  return (
    <div>
      {foodItem.name}
      <label style={{ marginLeft: "50px" }}>
        Amount:
        <input
          type="number"
          min="0"
          value={foodAmount}
          onChange={handleAmountChange}
        />
      </label>
    </div>
  );
};

export default FoodComponent;
