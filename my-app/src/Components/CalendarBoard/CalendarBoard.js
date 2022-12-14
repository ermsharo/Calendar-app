import styled from "styled-components";
import React, { useState } from "react";
import DayModal from "../DayModal/DayModal";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { GetCalendarInfo } from "../../Services/calendarInfo";
import Day from "../Day/Day";
const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  background-color: #f6f9fa;
  grid-gap: 24px;
  border-radius: 16px;
  -webkit-box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);

  @media (min-width: 576px) {

    width: 95%;
  }

  @media (min-width: 1300px) {

    width: 90%;

  }

`;

const BoardBox = styled.div`
  padding: 4px;

  display: flex;
  width: 95vw;
  margin: auto;
  justify-content: space-between;


  @media (min-width: 576px) {
    padding: 32px;
    width: 85vw;
  }

  @media (min-width: 1300px) {
    padding: 32px;
    width: 60vw;

  }


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
  padding: 8px;
  grid-column: 1/8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  grid-gap: 4px;


  @media (min-width: 576px) {
    padding: 32px;
    grid-gap: 8px;
  }

  @media (min-width: 1300px) {

    grid-gap: 16px;
    padding: 32px;
  }

`;

const DaysOfWeek = styled.div`
  text-align: center;
  text-transform: capitalize;
  border-radius: 8px;
  font-family: "Varela Round", sans-serif;
  font-size: calc((12vw - 1rem) / 7);
  font-weight: 550;

  @media (min-width: 1300px) {
    font-size: calc((12vw - 3.5rem) / 7);
}

  
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

let daysOfWeekArray = [
  "domingo",
  "segunda",
  "ter??a",
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

  const [month, setMonth] = useState(actualMonth + 1);
  const [year, setYear] = useState(actualYear);
  const [day, setDay] = useState(actualDay);

  const [open, setOpen] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(false);


  const [{ data, isLoading, isError }, setUrl, setRefresh] = GetCalendarInfo(
    month,
    year
  );

  const refreshCalendar = () => {
    setUrl(`http://localhost:5000/calendar/?month=${month}&year=${year}`);
    setRefreshBoard(!refreshBoard);
    setRefresh(refreshBoard);
  };

  const changeToNextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setMonth(1);
      setYear(year + 1);
    }
    refreshCalendar();
  };

  const changeToPreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    refreshCalendar();
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
                  refreshCalendar={refreshCalendar}
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
          refreshCalendar={refreshCalendar}
        />
      </>
    );
  }
}

export default CalendarBoard;
