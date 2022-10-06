import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import ReminderModal from "../ReminderModal/ReminderModal";
import DayEventList from "./DayEventList";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

const DayBox = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 12px;
  font-family: "Asap Medium", sans-serif;
  font-family: "Asap", sans-serif;
  width: 100%;

  background-color: white;
  border-radius: 8px;
  font-weight: 600;
  overflow: hidden;
`;

const EmptyDay = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 4px;
  background-color: white;
  opacity: 0.5;
  border-radius: 8px;
  z-index: 1;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;

  height: 100%;
`;

const DayNumber = styled.div`
  font-size: calc((18vw) / 7);
  text-align: center;
  margin: auto;
`;

const AlignNumber = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;

  height: 100%;
`;

const WeekendDayNumber = styled.div`
  font-size: calc((18vw) / 7);
  color: #ef4136;
  text-align: center;
  margin: auto;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-size: calc((12vw - 4.5rem) / 7);
`;

const BadgeNumber = styled.div`
  font-size: 16px;
  color: red;
  background-color: red;
  height: 30px;
  width: 30px;
  color: white;
  text-align: center;
  border-radius: 50%;
  line-height: 30px;
  font-family: "Varela Round", sans-serif;
  font-weight: bolder;
`;

export default function Day({ item, openDay, refreshCalendar }) {
  const [reminderModalIsOpen, setReminderModalIsOpen] = useState(false);
  const [remindersListModalIsOpen, setRemindersListModalIsOpen] =
    useState(false);

  if (item.isValideDay) {
    return (
      <>
        {" "}
        <Badge
          badgeContent={
            item.eventsOfDay.count && (
              <BadgeNumber>{item.eventsOfDay.count}</BadgeNumber>
            )
          }
          className="badge-style"
        >
          <DayBox
            onClick={() => {
              setRemindersListModalIsOpen(true);
            }}
          >
            <DayHeader>
              {item.isWeekend ? (
                <WeekendDayNumber>
                  <AlignNumber> {item.day}</AlignNumber>
                </WeekendDayNumber>
              ) : (
                <DayNumber>
                  {" "}
                  <AlignNumber> {item.day}</AlignNumber>
                </DayNumber>
              )}
            </DayHeader>
          </DayBox>
          <DayEventList
            date={item.date}
            setRemindersListModalIsOpen={setRemindersListModalIsOpen}
            remindersListModalIsOpen={remindersListModalIsOpen}
            events={item.eventsOfDay}
            reminderModalIsOpen={reminderModalIsOpen}
            setReminderModalIsOpen={setReminderModalIsOpen}
            refreshCalendar={refreshCalendar}
            openDay={openDay}
            day={item.day}
          />
        </Badge>
      </>
    );
  }
  return <EmptyDay> </EmptyDay>;
}
