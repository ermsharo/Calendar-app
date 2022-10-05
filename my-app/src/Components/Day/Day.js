import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import React, { useState } from "react";
import ReminderModal from "../ReminderModal/ReminderModal";

const DayBox = styled.div`
  text-align: center;
  text-transform: capitalize;
  aspect-ratio: 1 / 1;
  padding: 12px;
  font-family: "Asap Medium", sans-serif;
  font-family: "Asap", sans-serif;

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
`;

const Reminder = styled.div`
  border-radius: 5px;
  font-size: calc((12vw - 4.5rem) / 7);
  text-align: left;
  padding: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ReminderBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const DayNumber = styled.div`
  font-size: calc((14vw) / 7);
`;

const WeekendDayNumber = styled.div`
  font-size: calc((14vw) / 7);
  color: #ef4136;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-size: calc((12vw - 4.5rem) / 7);
`;

const renderTitle = (title) => {
  if (title === "") return "sem titulo";
  return title;
};

const EventsOfDay = ({
  events,
  reminderModalIsOpen,
  setReminderModalIsOpen,
  refreshCalendar,
}) => {
  const [reminderItem, setReminderItem] = useState(false);

  if (events) {
    return (
      <>
        <ReminderBox>
          {events.reminders.map((item) => (
            <>
              {" "}
              <Reminder
                onClick={() => {
                  setReminderModalIsOpen(true);
                  setReminderItem(item);
                }}
                style={{ backgroundColor: item.color }}
              >
                {renderTitle(item.title)}
              </Reminder>
              <ReminderModal
                reminderItem={item}
                reminderModalIsOpen={reminderModalIsOpen}
                setReminderModalIsOpen={setReminderModalIsOpen}
                refreshCalendar={refreshCalendar}
              />
            </>
          ))}
        </ReminderBox>
      </>
    );
  }
};

export default function Day({ item, openDay, refreshCalendar }) {
  const [reminderModalIsOpen, setReminderModalIsOpen] = useState(false);

  if (item.isValideDay) {
    return (
      <>
        {" "}
        <DayBox>
          <DayHeader>
            {item.isWeekend ? (
              <WeekendDayNumber>{item.day}</WeekendDayNumber>
            ) : (
              <DayNumber> {item.day}</DayNumber>
            )}

            <AddButton
              onClick={() => {
                openDay(item.day);
              }}
            >
              <AiFillPlusCircle />
            </AddButton>
          </DayHeader>

          <EventsOfDay
            events={item.eventsOfDay}
            reminderModalIsOpen={reminderModalIsOpen}
            setReminderModalIsOpen={setReminderModalIsOpen}
            refreshCalendar={refreshCalendar}
          />
        </DayBox>
      </>
    );
  }
  return <EmptyDay> </EmptyDay>;
}
