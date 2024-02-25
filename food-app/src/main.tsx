import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MenuList from "./MenuList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <MenuList />
  </React.StrictMode>
);
