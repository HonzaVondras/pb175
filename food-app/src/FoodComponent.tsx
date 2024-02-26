import React, { useState } from "react";
import { FoodItem } from "./foodItemInterface";

interface FoodComponentProps {
  foodItem: FoodItem;
  onAddToOrder: (price: number) => void;
}

const FoodComponent: React.FC<FoodComponentProps> = ({
  foodItem,
  onAddToOrder,
}) => {
  const [foodAmount, setFoodAmount] = useState<number>(0);

  const handleAmountChange = (newAmount: number) => {
    if (newAmount < 0) {
      newAmount = 0;
    }
    setFoodAmount(newAmount);

    if (newAmount < foodAmount) {
      onAddToOrder(-foodItem.price);
    } else if (newAmount > foodAmount) {
      onAddToOrder(foodItem.price);
    }
  };

  return (
    <div>
      {foodItem.name} {foodItem.price}
      <label style={{ marginLeft: "50px" }}>Amount:</label>
      <button
        onClick={() => handleAmountChange(foodAmount + 1)}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        +
      </button>
      {foodAmount}
      <button
        onClick={() => handleAmountChange(foodAmount - 1)}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        -
      </button>
    </div>
  );
};

export default FoodComponent;
