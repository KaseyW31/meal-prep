import { useState } from "react";
import MealRow from "./MealRow";

export default function MealsTable({ meals }) {

    // const [name, setName] = useState("");

    // function handleNameChange(event) {
    //   setName(event.target.value);
    // }

    // function handleSubmit(event) {

    // }

    const rows = [];
    meals.forEach((meal) => {
        rows.push(
            <MealRow
                meal={meal.name}
                mealIngredients={meal.ingredients}
                // key={meal.name}
            />
        );
    });
    return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
            {rows}
            <button type="button">Add</button>
          </tbody>
        </table>
    );
}