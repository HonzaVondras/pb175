import React from "react";
import { Restaurant } from "./restaurantInterface";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

interface RestaurantProps {
  restaurant: Restaurant;
  onRestaurantClick: (id: number) => void;
  onEditClick: (restaurant: Restaurant) => void;
  editMode: boolean;
}

const RestaurantComponent: React.FC<RestaurantProps> = ({ 
  restaurant,
  onRestaurantClick,
  onEditClick,
}) => {
  
  const navigate = useNavigate();

  const handleRestaurantEdit = () => {
    onEditClick(restaurant);
    navigate('/restaurant-edit');
  };

  const editMode = localStorage.getItem("editMode");

  return (
    <div className="restaurant-container">
      <button
        key={restaurant.id}
        onClick={() => onRestaurantClick(restaurant.id)}
        className="restaurant-button"
      >
        <div className="restaurant-image-container">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          />
        </div>
        <div className="restaurant-name">
          <h2 className="restaurant-header">{restaurant.name}</h2>
        </div>
      </button>

      {editMode && (
    <div className="edit-button-container">
      <button className="edit-restaurant-button" onClick={handleRestaurantEdit}>
        Edit Restaurant
      </button>
    </div>
  )}
    </div>
  );
};

export default RestaurantComponent;
