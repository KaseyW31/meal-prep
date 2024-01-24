import { useState } from "react";
import IngredientRow from "./IngredientRow";

export default function IngredientsTable(props) {

    const [name, setName] = useState("");
    const [qty, setQty] = useState(0);
    const [unit, setUnit] = useState("");

    function handleNameChange(event) {
      setName(event.target.value);
    }

    function handleQtyChange(event) {
      setQty(event.target.value);
    }

    function handleUnitChange(event) {
      setUnit(event.target.value);
    }

    function handleSubmit(event) {
      if (name != "" && qty != 0 && unit != "") {
        event.preventDefault();
        props.addIngredient(name, qty, unit);
        setAdding(false);
        setName("");
        setQty(0);
        setUnit("");
      }
      // TODO: error message
    }

    const [isAdding, setAdding] = useState(false);

    const rows = [];
    props.ingredients.forEach((ingredient) => {
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
            <button type="button" onClick={() => setAdding(true)}>Add</button>
          </tbody>
        </table>
    );
    const addTemplate = (
      <>
      <form id="addIngredientForm" onSubmit={handleSubmit}></form>
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
              <td><input type="text" onChange={handleNameChange}/></td>
              <td><input type="number" onChange={handleQtyChange}/></td>
              <td><input type="text" onChange={handleUnitChange}/></td>
            </tr>
            <tr>
              <button type="submit" form="addIngredientForm">Add</button>
              <button type="button" onClick={() => setAdding(false)}>Cancel</button>
            </tr>
          </tbody>
        </table>
      </>
    );
    return <>{isAdding ? addTemplate : viewTemplate}</>;
}