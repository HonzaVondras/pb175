import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "./restaurantInterface";
import RestaurantComponent from "./RestaurantComponent";
import "./styles.css";

const HomePage: React.FC<{
  paidMoney: number;
  onRestaurantClick: (id: number) => void;
}> = ({ paidMoney, onRestaurantClick }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants/") // Django api endpoint
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchedName.toLowerCase())
    );
  };

  const handleRestaurantClick = (id: number) => {
    onRestaurantClick(id);
    navigate("/order");
  };
  return (
    <div className="home-page-container">
      <h1>Restaurants</h1>
      {paidMoney > 0 && (
        <div className="paid-container">
          Received payment of {paidMoney.toFixed(2)} €. <br /> Your order will
          arrive soon!
        </div>
      )}
      <label>
        <input
          type="text"
          placeholder="Search for restaurant"
          value={searchedName}
          onChange={(e) => setSearchedName(e.target.value)}
        />
      </label>

      {filterRestaurants().map((restaurant) => (
        <RestaurantComponent
          key={restaurant.id}
          restaurant={restaurant}
          onRestaurantClick={handleRestaurantClick}
        />
      ))}
    </div>
  );
};

export default HomePage;
