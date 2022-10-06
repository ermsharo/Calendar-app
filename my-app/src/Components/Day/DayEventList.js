import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import ReminderModal from "../ReminderModal/ReminderModal";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
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
  gap: 16px;
  overflow: auto;
  background-color: white;
  width: 50vw;

  padding: 32px;
  border-radius: 16px;
  z-index: 4;
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;
const ActionButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DayInfo = styled.div`
  font-size: 24px;
  padding: 16px 0px;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-size: calc((12vw - 4.5rem) / 7);
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
    setRemindersListModalIsOpen,
    remindersListModalIsOpen,
    events,
    reminderModalIsOpen,
    setReminderModalIsOpen,
    refreshCalendar,
    date,
    openDay,
    day
}) {
    return (
        <div>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
                open={remindersListModalIsOpen}
            >
                <ReminderDisplay>
                    <DayInfo>
                        <div>{date}</div>

                        <ActionButtons>
                            <ActionButton
                                onClick={() => {
                                    setRemindersListModalIsOpen(!remindersListModalIsOpen);
                                    console.log("reminder list", remindersListModalIsOpen);
                                }}
                            >
                                <AiFillCloseCircle />
                            </ActionButton>
                        </ActionButtons>
                    </DayInfo>
                    <EventsOfDay
                        events={events}
                        reminderModalIsOpen={reminderModalIsOpen}
                        setReminderModalIsOpen={setReminderModalIsOpen}
                        refreshCalendar={refreshCalendar}
                    />
                    <>Adicionar lembrete       <AddButton
                        onClick={() => {
                            openDay(day);

                        }}
                    >
                        <AiFillPlusCircle />
                    </AddButton></>
                </ReminderDisplay>
            </Backdrop>
        </div>
    );
}
