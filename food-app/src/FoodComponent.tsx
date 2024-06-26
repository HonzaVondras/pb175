import React, { useState } from "react";
import { FoodItem } from "./foodItemInterface";
import "./stylesFood.css";
import { useNavigate } from "react-router-dom";

interface FoodComponentProps {
  foodItem: FoodItem;
  onAddToOrder: (price: number) => void;
  editMode: boolean;
  onEdit: (food: FoodItem) => void;
}

const FoodComponent: React.FC<FoodComponentProps> = ({
  foodItem,
  onAddToOrder,
  onEdit,
}) => {
  const [foodAmount, setFoodAmount] = useState<number>(0);

  const navigate = useNavigate();

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

  const handleFoodEdit = () => {
    onEdit(foodItem);
    navigate('/order-edit');
  };

  const editMode = localStorage.getItem("editMode");

  return (
    <div className="food-box">
      <div className="food-container">
        <img src={foodItem.image} alt={foodItem.name} className="food-image" />
        <div>{foodItem.name}</div>
      </div>
      <div className="amount-container">
        <div style={{ marginRight: "8px" }}>{foodItem.price} €</div>
        <button
          className="amount-button"
          onClick={() => handleAmountChange(foodAmount + 1)}
        >
          +
        </button>
        <div className="amount">{foodAmount}</div>
        <button
          className="amount-button"
          onClick={() => handleAmountChange(foodAmount - 1)}
        >
          -
        </button>
      </div>

      {editMode && (
        <div className="edit-button-container">
        <button className="edit-food-button" onClick={handleFoodEdit}>
          Edit food
        </button>
        </div>
      )}

    </div>
  );
};

export default FoodComponent;
