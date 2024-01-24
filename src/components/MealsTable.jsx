import MealRow from "./MealRow";

export default function MealsTable({ meals }) {
    const rows = [];
    meals.forEach((meal) => {
        rows.push(
            <MealRow
                meal={meal}
                key={meal.name}
            />
        );
    });
    return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <button type="button">Add</button>
          </tbody>
        </table>
    );
}