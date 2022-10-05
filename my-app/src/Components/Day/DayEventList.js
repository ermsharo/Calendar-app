import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import ReminderModal from "../ReminderModal/ReminderModal";
import styled from "styled-components";

const ReminderBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
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

const ReminderDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  background-color: white;
  width: 50vw;
  height: 100px;
  padding: 16px;
`;

const EventsOfDay = ({
  events,
  reminderModalIsOpen,
  setReminderModalIsOpen,
  refreshCalendar,
}) => {
  const [reminderItem, setReminderItem] = useState(false);
  const renderTitle = (title) => {
    if (title === "") return "sem titulo";
    return title;
  };
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

export default function DayEventList({
  closeEventsOfDay,
  setReminderListIsOpen,
  reminderListIsOpen,
  events,
  reminderModalIsOpen,
  setReminderModalIsOpen,
  refreshCalendar,
}) {
  const handleClose = () => {
    closeEventsOfDay();
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={reminderListIsOpen}
        onClick={handleClose}
      >
        <ReminderDisplay>
          {JSON.stringify(events)}
          <EventsOfDay
            events={events}
            reminderModalIsOpen={reminderModalIsOpen}
            setReminderModalIsOpen={setReminderModalIsOpen}
            refreshCalendar={refreshCalendar}
          />
        </ReminderDisplay>
      </Backdrop>
    </div>
  );
}
