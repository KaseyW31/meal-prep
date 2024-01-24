import { useState } from 'react'
import './App.css'
import MealsTable from "./components/MealsTable";
import IngredientsTable from "./components/IngredientsTable";
import Planner from "./components/Planner";

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
    <>
      <h3>Ingredients</h3>
      <IngredientsTable ingredients={ingredients} addIngredient={addIngredient} />
      <br></br>
      <h3>Meals</h3>
      <MealsTable meals={MEALS} />
      <br></br>
      <h3>Planned Days</h3>
      <Planner plannedDays={PLANNED_DAYS} />
    </>
  )
}

export default App;