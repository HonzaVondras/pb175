import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegistrationStyle.css';
import { useNavigate } from "react-router-dom";
import { FoodItem } from './foodItemInterface';

const OrderEdit: React.FC<{
  food: FoodItem;
}> = ({ food }) => {

const navigate = useNavigate();

  const [name, setName] = useState(food.name);
  const [imageUrl, setImageUrl] = useState(food.image);
  const [foodPrice, setfoodPrice] = useState(food.price);


  const handleUpdate = () => {
    const updatedFood = {
        id: food.id,
        name: name,
        image: imageUrl,
        price: foodPrice
      };
  
      axios
        .put(`http://127.0.0.1:8000/api/order/${food.id}/`, updatedFood)
        .then((response) => {
          console.log('food updated successfully:', response.data);
          navigate("/order");
        })
        .catch((error) => {
          console.error('Error updating food:', error);
        });
    
  };

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/order/delete/${food.id}/`)
      .then((response) => {
        console.log('Food deleted successfully:', response.data);
        navigate("/order");
      })
      .catch((error) => {
        console.error('Error deleting food:', error);
      });
  };

  return (
    <div className="form-format">
      <h1 className="login-registration-text">Restaurant Details</h1>
      <div className="div-style">
        <p className="login-registration-text">
          <strong>ID:</strong> {food.id}
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
      <div className="div-style">
      <label className="label-style login-registration-text">
    Food price:{"\n"}
    <input
        type="number"
        value={foodPrice}
        onChange={(e) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)) {
            setfoodPrice(newPrice);
        }
        }}
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

export default OrderEdit;