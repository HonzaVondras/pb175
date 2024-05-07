import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "./restaurantInterface";
import FoodComponent from "./FoodComponent";
import NavigationBar from "./NavigationBar";
import { FoodItem } from "./foodItemInterface";

const Order: React.FC<{
  id: number;
  onOrderClick: (spentMoney: number) => void;
  onEditClick: (food: FoodItem) => void;
}> = ({ id: restaurantId, onOrderClick, onEditClick }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [editMode, setEditMode] = useState(localStorage.getItem('editMode') === 'true');

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants/") // Django api endpoint
      .then((response) =>
        setRestaurants(
          response.data.filter(
            (restaurant: Restaurant) => restaurant.id === restaurantId
          )
        )
      )
      .catch((error) => console.error(error));
  }, []);

  const handleRestaurantClick = () => {
    onOrderClick(totalPrice);
    navigate("/");
  };

  const fuckGoBack = () =>{
    navigate("/");
  };

  const userDataString = localStorage.getItem("userData");

  return (
    <div className="home-page-container">
      {<button 
        onClick={fuckGoBack} 
        style={{ position: "absolute", top: "30px", left: "30px" }}
        >
        Go back to restaurants
    </button>}
      {userDataString && <NavigationBar setEditMode={setEditMode} />}
      <ul>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{ display: "grid", placeItems: "center" }}
          >
            <h1>{restaurant.name}</h1>
            <h2>Menu</h2>
            {restaurant.food_items.map((food) => (
              <FoodComponent
                key={food.id}
                foodItem={food}
                onAddToOrder={(priceToAdd) =>
                  setTotalPrice(
                    (prevTotalPrice) => prevTotalPrice + Number(priceToAdd)
                  )
                }
                onEdit={(onEditClick)}
                editMode={editMode}
              ></FoodComponent>
              
            ))}
            
          </div>
          
        ))}
        
        <div style={{ display: "grid", placeItems: "center" }}>
          <button
            className="order-button"
            onClick={() => handleRestaurantClick()}
          >
            Order! ${totalPrice.toFixed(2)} €
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Order;
