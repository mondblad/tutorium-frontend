import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import "antd/dist/reset.css"; // подключаем базовые стили Ant Design
import "./api/config"
import { AuthProvider } from "@/app/providers/auth";
import './api/config';
//import "./assets/css/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
