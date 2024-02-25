import React from "react";
import ReactDOM from "react-dom/client";

import Restaurants from "./Restaurants.tsx";
import MenuList from "./MenuList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Restaurants />
    <MenuList />
  </React.StrictMode>
);
