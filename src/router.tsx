import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
//import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
