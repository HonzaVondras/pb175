import React from "react";
import { Restaurant } from "./restaurantInterface";

interface RestaurantProps {
  restaurant: Restaurant;
  onRestaurantClick: (id: number) => void;
}

const RestaurantComponent: React.FC<RestaurantProps> = ({
  restaurant,
  onRestaurantClick,
}) => {
  return (
    <div>
      <h2>{restaurant.name}</h2>
      <button
        key={restaurant.id}
        onClick={() => onRestaurantClick(restaurant.id)}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{ width: "100px", height: "100px", marginRight: "10px" }}
        />
        <div>{restaurant.name}</div>
        <ul>
          {restaurant.food_items.map((foodItem) => (
            <li key={foodItem.id}>{foodItem.name}</li>
          ))}
        </ul>
      </button>
    </div>
  );
};

export default RestaurantComponent;
