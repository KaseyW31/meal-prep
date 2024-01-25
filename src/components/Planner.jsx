import DayCard from "./DayCard";

export default function Planner({ plannedDays }) {
    const cardList = [];
    plannedDays.forEach((plannedDay) => {
        cardList.push(
            <DayCard day={plannedDay.day} dayMeals={plannedDay.meals} />
        );
    });
    return (
        <>
        {cardList}
        <br></br><br></br>
        <button type="button">Add Day</button>
        <br></br>
        </>
    );
}