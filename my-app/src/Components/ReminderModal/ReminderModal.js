import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import { AiFillCloseCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import EditDayModal from "../DayModal/EditionDayModal";
const SubTilte = styled.div`
  font-size: 24px;
  text-align: left;
`;

const Description = styled.div`
  font-size: 24px;
  text-align: left;
`;

const DeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  padding-left: 16px;
`;

const MarkAsDoneButton = styled.div`
  width: 50%;
  margin: auto;
`;

const DayInfo = styled.div`
  font-size: 24px;
  padding: 16px 0px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;
const DayModalBox = styled.div`
  grid-column: 2/7;
  background-color: #f6f9fa;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  font-family: "Varela Round", sans-serif !important;
  gap: 16px;
  input {
    font-family: "Varela Round", sans-serif;
  }
  button {
    font-family: "Varela Round", sans-serif;
    font-weight: 700;
    background-color: #ef4136;
    border-radius: 20px;
    margin-top: 16px;

    &:hover {
      background-color: #ef4136;
      opacity: 0.9;
    }
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  z-index: 5;
`;

const renderTitle = (title) => {
  if (title === "") return "sem titulo";
  return title;
};

export default function ReminderModal({
  reminderItem,
  reminderModalIsOpen,
  setReminderModalIsOpen,
  refreshCalendar,
}) {
  const [editionModalIsOpen, setEditionModalIsOpen] = useState(false);

  const removeReminder = async () => {
    if (true) {
      await axios
        .delete(`http://localhost:5000/reminders?id=${reminderItem.id}`)
        .then(() => {})
        .catch(() => {});
    }
    setReminderModalIsOpen(!reminderModalIsOpen);
  };

  const deleteReminder = () => {
    removeReminder();
    setReminderModalIsOpen(!reminderModalIsOpen);
    refreshCalendar();
  };

  const OpenEditModal = () => {
    setEditionModalIsOpen(!editionModalIsOpen);
    setReminderModalIsOpen(!reminderModalIsOpen);
  };
  return (
    <>
      {!editionModalIsOpen ? (
        <div>
          <Backdrop open={reminderModalIsOpen}>
            <Board>
              <DayModalBox>
                <DayInfo>
                  <div>
                    {reminderItem.date} - {renderTitle(reminderItem.title)}{" "}
                  </div>
                  <ActionButtons>
                    <ActionButton
                      onClick={() => {
                        deleteReminder();
                      }}
                    >
                      <AiFillDelete />
                    </ActionButton>

                    <ActionButton
                      onClick={() => {
                        OpenEditModal();
                      }}
                    >
                      <AiFillEdit />
                    </ActionButton>

                    <ActionButton
                      onClick={() => {
                        setReminderModalIsOpen(false);
                      }}
                    >
                      <AiFillCloseCircle />
                    </ActionButton>
                  </ActionButtons>
                </DayInfo>
                <SubTilte>
                  {" "}
                  inicio: {reminderItem.start} fim:{reminderItem.start}
                </SubTilte>
                <SubTilte> {reminderItem.city}</SubTilte>
                <Description>{reminderItem.description} </Description>
                {/* <MarkAsDoneButton>
            <Button fullWidth variant="contained">
              Marcar como feita
            </Button>
          </MarkAsDoneButton> */}
              </DayModalBox>
            </Board>
          </Backdrop>
        </div>
      ) : (
        <>
          <EditDayModal
            editionModalIsOpen={editionModalIsOpen}
            setEditionModalIsOpen={setEditionModalIsOpen}
            item={reminderItem}
            refreshCalendar={refreshCalendar}
          />{" "}
        </>
      )}
    </>
  );
}
