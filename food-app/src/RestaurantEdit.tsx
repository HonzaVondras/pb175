import React, { useState } from 'react';
import axios from 'axios';
import { Restaurant } from './restaurantInterface';
import './LoginRegistrationStyle.css';
import { useNavigate } from "react-router-dom";

const RestaurantEdit: React.FC<{
  restaurant: Restaurant;
}> = ({ restaurant }) => {

    const navigate = useNavigate();

  const [name, setName] = useState(restaurant.name);
  const [imageUrl, setImageUrl] = useState(restaurant.image);


  const handleUpdate = () => {
    const updatedRestaurant = {
        id: restaurant.id,
        name: name,
        image: imageUrl,
      };
  
      axios
        .put(`http://127.0.0.1:8000/api/restaurantss/${restaurant.id}/`, updatedRestaurant)
        .then((response) => {
          console.log('Restaurant updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating restaurant:', error);
        });
    navigate("/");
    
  };

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/restaurants/delete/${restaurant.id}/`)
      .then((response) => {
        console.log('Restaurant deleted successfully:', response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
      });
  };

  return (
    <div className="form-format">
      <h1 className="login-registration-text">Restaurant Details</h1>
      <div className="div-style">
        <p className="login-registration-text">
          <strong>ID:</strong> {restaurant.id}
        </p>
      </div>
      <div className="div-style">
        <label className="label-style login-registration-text">
          Name:{"\n"}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <div className="div-style">
        <label className="label-style login-registration-text">
          Image URL:{"\n"}
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input"
          />
        </label>
      </div>
        <div className="div-style" style={{ display: 'flex' }}>
            <button onClick={handleUpdate} className="log-reg-button" style={{ marginRight: '10px' }}>
                Update
            </button>
            <button onClick={handleDelete} className="log-reg-button">
                Delete
            </button>
        </div>
    </div>
  );
};

export default RestaurantEdit;