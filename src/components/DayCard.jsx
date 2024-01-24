export default function DayCard({ day, dayMeals }) {
    const rows = [];
    dayMeals.forEach((meal) => {
        rows.push(
            <>
            <tr>
                <td>{meal.name}</td>
            </tr>
            </>
        );
    })
    return (
        <>
        <h3>{day}</h3>
        <button type="button">Check</button>
        <button type="button">Delete</button>
        <table>
            <thead>
                <tr>
                    <th>Meal Name</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        <button type="button">Add</button>
        </>
    );
}