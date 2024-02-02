export default function IngredientRow({ ingredient }) {
    return (
      <tr>
        <td>{ingredient.name}</td>
        <td>{ingredient.qty}</td>
        <td>{ingredient.unit}</td>
      </tr>
    )
}