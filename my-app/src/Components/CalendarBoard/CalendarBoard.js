import styled from "styled-components";
import React, { useState, useEffect } from "react";
import DayModal from "../DayModal/DayModal";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { GetCalendarInfo } from "../../Services/calendarInfo";
import Day from "../Day/Day";
const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 90%;
  background-color: #f6f9fa;
  grid-gap: 16px;
  border-radius: 16px;
  -webkit-box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
`;

const BoardBox = styled.div`
  padding: 32px;

  display: flex;
  width: 80vw;
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
  font-size: calc((12vw - 3.5rem) / 7);
  font-weight: 550;
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

  return {
    paddingDays: paddingDays,
    daysInMonth: daysInMonth,
  };
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

function CalendarBoard() {
  const dt = new Date();
  const actualDay = dt.getDate();
  const actualMonth = dt.getMonth();
  const actualYear = dt.getFullYear();

  const [month, setMonth] = useState(actualMonth);
  const [year, setYear] = useState(actualYear);
  const [day, setDay] = useState(actualDay);

  const [open, setOpen] = useState(false);

  const [{ data, isLoading, isError }, setUrl] = GetCalendarInfo(month, year);

  // useEffect(() => {

  // }, [month, year]);

  const changeToNextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
    setUrl(`http://localhost:5000/calendar/?month=${month}&year=${year}`);
  };

  const changeToPreviousMonth = () => {
    if (month == 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    setUrl(`http://localhost:5000/calendar/?month=${month}&year=${year}`);
  };

  const openDay = (day) => {
    setDay(day);
    setOpen(true);
  };

  if (isError) {
    return <>error</>;
  }

  if (isLoading) {
    return <>loading</>;
  }

  if (data) {
    return (
      <>
        <BoardBox>
          <ChangeMonthArrow>
            <AiFillLeftCircle onClick={changeToPreviousMonth} />
          </ChangeMonthArrow>
          <Board>
            <MonthTitle>
              {data.month} - {data.year}
            </MonthTitle>
            <DaysBox>
              {daysOfWeekArray.map((item) => (
                <DaysOfWeek>{item}</DaysOfWeek>
              ))}
              {data.days.map((item) => (
                <Day
                  item={item}
                  openDay={openDay}
                  open={open}
                  setOpen={setOpen}
                />
              ))}
            </DaysBox>
          </Board>
          <ChangeMonthArrow>
            <AiFillRightCircle onClick={changeToNextMonth} />
          </ChangeMonthArrow>
        </BoardBox>

        <DayModal
          year={year}
          month={month}
          day={day}
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  }
}

export default CalendarBoard;
