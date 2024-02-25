import { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "./types";

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/menu/") // Update URL to your Django API endpoint
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}> {item.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
