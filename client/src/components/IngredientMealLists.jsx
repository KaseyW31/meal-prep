import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

// Single row for an ingredient
const Ingredient = (props) => (
  <tr>
    <td>{props.ingredient.name}</td>
    <td>{props.ingredient.qty}</td>
    <td>{props.ingredient.unit}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/ingredient/${props.ingredient._id}`}><FontAwesomeIcon icon={faPencil} color="gray"/></Link>
      <button className="btn btn-link"
        onClick={() => {
          props.deleteIngredient(props.ingredient._id);
        }}
      >
      <FontAwesomeIcon icon={faTrashCan} color="gray"/>
      </button>
    </td>
  </tr>
);

// Single row for a meal
const Meal = (props) => (
  <tr data-toggle="collapse" data-target={props.key}>
    <td>{props.meal.name}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/meal/${props.meal._id}`}><FontAwesomeIcon icon={faPencil} color="gray"/></Link>
      <button className="btn btn-link"
        onClick={() => {
          props.deleteMeal(props.key);
        }}
      >
      <FontAwesomeIcon icon={faTrashCan} color="gray"/>
      </button>
    </td>
  </tr>
  // TODO: collapsible table rows
 );

export default function IngredientMealLists() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);

  // Fetches ingredients
  useEffect(() => {
    async function getIngredients() {
      const response = await fetch(`http://localhost:5000/ingredient/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const ingredients = await response.json();
      setIngredients(ingredients);
    }
    getIngredients();
    return;
  }, [ingredients.length]);
  
  // Method to delete an ingredient
  async function deleteIngredient(id) {
   await fetch(`http://localhost:5000/ingredient/${id}`, {
     method: "DELETE"
   });
    const newIngredients = ingredients.filter((el) => el._id !== id);
   setIngredients(newIngredients);
 }

  // Maps out ingredients onto table
  function ingredientList() {
    return ingredients.map((ingredient) => {
      return (
        <Ingredient
          ingredient={ingredient}
          deleteIngredient={() => deleteIngredient(ingredient._id)}
          key={ingredient._id}
        />
      );
    });
  }
  
  // Fetches meals
  useEffect(() => {
    async function getMeals() {
      const response = await fetch(`http://localhost:5000/meal/`);
       if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
       const meals = await response.json();
      setMeals(meals);
    }
     getMeals();
     return;
  }, [meals.length]);
  
  async function deleteMeal(id) {
    await fetch(`http://localhost:5000/meal/${id}`, {
      method: "DELETE"
    });
     const newMeals = meals.filter((el) => el._id !== id);
    setIngredients(newMeals);
  }
  
  // Maps out meals on table
  function mealList() {
    return meals.map((meal) => {
      return (
        <Meal
          meal={meal}
          deleteMeal={() => deleteMeal(meal._id)}
          key={meal._id}
        />
      );
    });
  }

  // Displays ingredient and meal tables
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Ingredients <FontAwesomeIcon icon={faCirclePlus} onClick={() => navigate("/create/ingredient")} cursor="pointer" color="darkgreen"/></h4>
          <table className="table table-sm table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{ingredientList()}</tbody>
          </table>
        </div>
        <div className="col">
          <h4>Meals <FontAwesomeIcon icon={faCirclePlus} onClick={() => navigate("/create/meal")} cursor="pointer" color="darkgreen"/></h4>
          <table className="table table-sm table-striped" style={{ marginTop: 20}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{mealList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}