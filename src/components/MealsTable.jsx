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
          <tbody>{rows}</tbody>
        </table>
    );
}