import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MenuList from "./MenuList.tsx";
import Login from "./LoginRegistration.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <MenuList />
    <Login />
  </React.StrictMode>
);
