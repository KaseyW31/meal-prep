export default function MealRow({ meal, mealIngredients }) {
  const rows = [];
    mealIngredients.forEach((ingredient) => {
        rows.push(
            <>
            <tr>
                <td>{ingredient.name}</td>
                <td>{ingredient.qty}</td>
            </tr>
            </>
        );
    })
    return (
      <>
      {/* <tbody> */}
        <tr>
          <td>{meal}</td>
          <td>2</td>
        </tr>
        {rows}
        <tr>
          <td></td>
          <td></td>
        </tr>
      {/* </tbody> */}
      </>
    );
}