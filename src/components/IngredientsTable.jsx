import { useState } from "react";
import IngredientRow from "./IngredientRow";

export default function IngredientsTable({ ingredients }) {

    const [isAdding, setAdding] = useState(false);

    const rows = [];
    ingredients.forEach((ingredient) => {
        rows.push(
            <IngredientRow
                ingredient={ingredient}
                key={ingredient.name}
            />
        );
    });
    const viewTemplate = (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <button type="button">Add</button>
          </tbody>
        </table>
    );
    const addTemplate = (
      <>
      <form id="addIngredient"></form>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td><input type="text" form="addIngredient"/></td>
              <td><input type="number" form="addIngredient"/></td>
              <td><input type="text" form="addIngredient"/></td>
            </tr>
            <tr>
              <button type="button" form="addIngredient">Add</button>
            </tr>
          </tbody>
        </table>
      </>
    );
    return <>{isAdding ? addTemplate : viewTemplate}</>;
}