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
        <button type="button">Add</button>
        </>
    );
}