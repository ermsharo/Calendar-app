import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DayModal from "../DayModal/DayModal";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  background-color: #f6f9fa;
  grid-gap: 16px;
  border-radius: 16px;
  -webkit-box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
`;

const BoardBox = styled.div`
  padding: 32px;

  display: flex;
  width: 50vw;
  margin: auto;
  justify-content: space-between;
`;

const ChangeMonthArrow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  color: #e2e2e2;
  text-shadow: 5px 4px 15px 5px rgba(0, 0, 0, 0.2);
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
  font-family: "Varela Round", sans-serif;
  font-size: calc((12vw - 4.5rem) / 7);
  font-weight: 500;
`;

const Day = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 8px;
  font-family: "Asap Medium", sans-serif;
  font-family: "Asap", sans-serif;

  background-color: white;
  border-radius: 8px;
  font-weight: 600;
  text-align: left;
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
  font-family: "Varela Round", sans-serif;
  border-radius: 16px 16px 0px 0px;
  text-transform: capitalize;
`;

const updateOurStates = (referenceMonth, referenceYear) => {
  const dt = new Date();
  const day = dt.getDate();
  console.log("Day", day);
  const month = dt.getMonth();
  console.log("month", day);
  const year = dt.getFullYear();
  console.log("Year", year);

  const firstDayOfMonth = new Date(referenceMonth, referenceMonth, 1);

  const daysInMonth = new Date(referenceYear, referenceYear + 1, 0).getDate();

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

  //console.log(paddingDays);

  //console.log("first day of month", firstDayOfMonth);

  //console.log("Days in month", daysInMonth);

  return {
    paddingDays: paddingDays,
    daysInMonth: daysInMonth,
  };
};

const fillCallendarObj = (year, month) => {
  let monthInfo = updateOurStates(year, month);
  console.log(monthInfo);
  let numberOfDays = monthInfo.daysInMonth;
  let firstDayIndex = monthInfo.paddingDays;
  let j = 1;
  const ourData = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDayIndex || i > numberOfDays + firstDayIndex) {
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



let daysOfWeekArray = [
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

let monthsOfYear = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function CalendarBoard() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);

  const changeToNextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1)
    }

  };

  const changeToPreviousMonth = () => {
    if (month == 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);

    }
  };


  useEffect(() => { }, [month, year]);

  return (
    <><BoardBox>
      <ChangeMonthArrow>
        {" "}
        <AiFillLeftCircle
          onClick={changeToPreviousMonth}
        />
      </ChangeMonthArrow>
      <Board>
        <MonthTitle>
          {monthsOfYear[month - 1]} - {year}
        </MonthTitle>
        <DaysBox>
          {" "}
          {daysOfWeekArray.map((item, index) => (
            <DaysOfWeek>{item}</DaysOfWeek>
          ))}
          {fillCallendarObj(month, year).map((item, index) =>
            item.isValideDay ? <Day>{item.day}</Day> : <EmptyDay> </EmptyDay>
          )}
        </DaysBox>
      </Board>
      <ChangeMonthArrow>
        {" "}
        <AiFillRightCircle
          onClick={changeToNextMonth}
        />{" "}
      </ChangeMonthArrow>
    </BoardBox>

      <DayModal />
    </>

  );
}

export default CalendarBoard;
