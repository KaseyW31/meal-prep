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
        <h3>{day}</h3> {/* TODO: check and delete buttons*/}
        <table>
            <thead>
                <tr>
                    <th>Meal Name</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        {/* TODO: add button */}
        </>
    );
}