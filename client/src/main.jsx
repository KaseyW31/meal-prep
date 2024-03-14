import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Ingredient from "./components/ingredient";
import Meal from "./components/meal";
import IngredientMealList from "./components/ingredientMealLists.jsx";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <IngredientMealList />,
      },
    ],
  },
  {
    path: "/edit/ingredient/:id",
    element: <App />,
    children: [
      {
        path: "/edit/ingredient/:id",
        element: <Ingredient />,
      },
    ],
  },
  {
    path: "/create/ingredient",
    element: <App />,
    children: [
      {
        path: "/create/ingredient",
        element: <Ingredient />,
      },
    ],
  },
  {
    path: "/edit/meal/:id",
    element: <App />,
    children: [
      {
        path: "/edit/meal/:id",
        element: <Meal />,
      },
    ],
  },
  {
    path: "/create/meal",
    element: <App />,
    children: [
      {
        path: "/create/meal",
        element: <Meal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
