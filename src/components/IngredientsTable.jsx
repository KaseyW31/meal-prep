import IngredientRow from "./IngredientRow";

export default function IngredientsTable({ ingredients }) {
    const rows = [];
    ingredients.forEach((ingredient) => {
        rows.push(
            <IngredientRow
                ingredient={ingredient}
                key={ingredient.name}
            />
        );
    });
    return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
    )
}