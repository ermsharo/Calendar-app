import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";

const Title = styled.div`
  font-size: calc((12vw - 4.5rem) / 7);
  text-align: left;
  display: flex;
`;

const Description = styled.div`
  font-size: calc((12vw - 5.5rem) / 7);
  text-align: left;
`;

const DeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  font-size: calc((12vw - 4.5rem) / 7);
  padding-left: 16px;
`;

const DayInfo = styled.div`
  font-size: 24px;
  padding: 16px 0px;
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    font-family: "Varela Round", sans-serif !important;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  -webkit-box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 5;
`;

export default function ReminderModal({
  reminderItem,
  reminderModalIsOpen,
  setReminderModalIsOpen,
}) {
  return (
    <div>
      <Backdrop open={reminderModalIsOpen}>
        <Board>
          <DayModalBox style={{ backgroundColor: reminderItem.color }}>
            <DayInfo>
              <div>{reminderItem.date}</div>
              <CloseButton
                onClick={() => {
                  setReminderModalIsOpen(false);
                }}
              >
                <AiFillCloseCircle />
              </CloseButton>
            </DayInfo>
            <Title>
              {reminderItem.title}
              <DeleteButton>
                <AiFillDelete />
              </DeleteButton>
            </Title>
            <Description>{reminderItem.description} </Description>
          </DayModalBox>
        </Board>
      </Backdrop>
    </div>
  );
}
