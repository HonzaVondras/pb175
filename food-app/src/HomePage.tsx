import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "./restaurantInterface";
import RestaurantComponent from "./RestaurantComponent";
import "./styles.css";
import NavigationBar from "./NavigationBar";

const HomePage: React.FC<{
  paidMoney: number;
  onRestaurantClick: (id: number) => void;
  onEdit: (restaurant: Restaurant) => void;
}> = ({ paidMoney, onRestaurantClick, onEdit }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchedName, setSearchedName] = useState("");
  const [editMode, setEditMode] = useState(localStorage.getItem('editMode') === 'true');

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

  const handelEditClick = (restaurant: Restaurant) => {
    onEdit(restaurant);
  };

  const userDataString = localStorage.getItem("userData");

  return (
    <div className="home-page-container">
      {userDataString && <NavigationBar setEditMode={setEditMode} />}
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
          editMode={editMode}
          onEditClick={handelEditClick}/>
      ))}
    </div>
  );
};

export default HomePage;
