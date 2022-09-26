import styled from "styled-components";

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 40vw;
  margin: auto;
  background-color: #f6f9fa;
  grid-gap: 16px;
  border-radius: 16px;
`;

const BoardBox = styled.div`
  padding: 32px;
`;

const DaysBox = styled.div`
  padding: 32px;
  grid-column: 1/8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  grid-gap: 16px;
`;

const DaysOfWeek = styled.div`
  text-align: center;
  text-transform: capitalize;
  border-radius: 8px;
`;

const Day = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 4px;
  background-color: white;
  border-radius: 8px;
`;

const EmptyDay = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 4px;
  background-color: white;
  opacity: 0.5;
  border-radius: 8px;
`;

const MonthTitle = styled.div`
  background-color: #ef4136;
  grid-column: 1/8;
  text-align: center;
  color: white;
  font-size: 32px;
  padding: 24px;

  border-radius: 16px 16px 0px 0px;
`;

const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();

const firstDayOfMonth = new Date(year, month, 1);

const daysInMonth = new Date(year, month + 1, 0).getDate();

const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
console.log(paddingDays);

console.log("first day of month", firstDayOfMonth);

console.log("Days in month", daysInMonth);

//Model of our callendar json

let calendarObj = [
  {
    isValideDay: false,
    day: 1,
    month: 1,
    year: 1,
    date: null,
    eventsOfDay: null,
  },
];

const fillCallendarObj = () => {
  let numberOfDays = 30;
  let firstDayIndex = 4;
  let j = 1;
  const ourData = [];
  for (let i = 0; i < numberOfDays + firstDayIndex; i++) {
    if (i < firstDayIndex) {
      ourData.push({
        isValideDay: false,
      });
    } else {
      ourData.push({
        isValideDay: true,
        day: j,
        month: 1,
        year: 1,
        date: null,
        eventsOfDay: [],
      });
      j++;
    }
  }
  return ourData;
};

function CalendarDay() {}

let daysOfWeekArray = [
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

let CalendarGenericArray = () => {};

function CalendarBoard() {
  return (
    <BoardBox>
      {" "}
      <Board>
        <MonthTitle>Month</MonthTitle>
        <DaysBox>
          {" "}
          {daysOfWeekArray.map((item, index) => (
            <DaysOfWeek>{item}</DaysOfWeek>
          ))}
          {fillCallendarObj().map((item, index) =>
            item.isValideDay ? <Day>{item.day}</Day> : <EmptyDay> </EmptyDay>
          )}
        </DaysBox>
      </Board>
    </BoardBox>
  );
}

export default CalendarBoard;
