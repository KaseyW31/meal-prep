import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import './App.css'
import MealsTable from "./components/old/MealsTable";
import IngredientsTable from "./components/old/IngredientsTable";
import Planner from "./components/old/Planner";
import Navbar from "./components/navbar";
import IngredientList from "./components/ingredientList";
import Edit from "./components/editIngredient";
import Create from "./components/createIngredient";

function App(props) {

  const [ingredients, setIngredients] = useState(props.ingredients);

  function addIngredient(name, qty, unit) {
    const newIngredient = { name: name, qty: qty, unit: unit };
    setIngredients([...ingredients, newIngredient]);
  }

  const MEALS = [
    {name: "miso soba", ingredients: [
      {name: "soba noodles", qty: 2},
      {name: "bok choy", qty: 0.2},
      {name: "chicken breast", qty: 2},
    ]},
    {name: "oatmeal", ingredients: [
      {name: "oats", qty: 0.5},
      {name: "milk", qty: 0.5},
      {name: "banana", qty: 1},
    ]}
  ];

  const PLANNED_DAYS = [
    {day: 1, meals: [
      {name: "oatmeal", qty: 1},
      {name: "miso soba", qty: 1}
    ]},
    {day: 2, meals: [
      {name: "oatmeal", qty: 1},
      {name: "miso soba", qty: 1}
    ]},
    {day: 3, meals: [
      {name: "oatmeal", qty: 1},
      {name: "miso soba", qty: 1}
    ]},
  ];

  return (
    <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<IngredientList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/template" element={<div className="container">
      <div className="ingredients">
        <h3>Ingredients</h3>
        <IngredientsTable ingredients={ingredients} addIngredient={addIngredient} />
      </div>
      <div className="meals">
        <h3>Meals</h3>
        <MealsTable meals={MEALS} />
      </div>
      <div className="planner">
        <h3>Planned Days</h3>
        <Planner plannedDays={PLANNED_DAYS} />
      </div>
    </div>} />
     </Routes>
   </div>
  )
}

export default App;