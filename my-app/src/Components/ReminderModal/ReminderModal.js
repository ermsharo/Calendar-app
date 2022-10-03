import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import { AiFillCloseCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { tagColors } from "../../Services/tagColorOptions";

const Title = styled.div`
  font-size: 24px;
  text-align: left;
  padding: 8px 0px;
`;

const SubTilte = styled.div`
  font-size: 24px;
  text-align: left;
`;

const Description = styled.div`
  font-size: 24px;
  text-align: left;
`;

const ColorDisplay = styled.div`
  width: 32px;
  border-radius: 50%;
  margin: auto;
  height: 32px;
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
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  z-index: 5;
`;

const CloseButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HourPickerBox = styled.div`
  display: flex;
  gap: 32px;
`;

const SendButton = styled.div`
  background-color: #ef4136;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
`;

const MeaningInfoBox = styled.div``;

const EditMeaningInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  const [startMoment, setStartMoment] = useState(reminderItem.start);
  const [endMoment, setEndMoment] = useState(reminderItem.end);
  const [formInputs, setFormInputs] = useState({
    reminderTitle: reminderItem.title,
    reminderDescription: reminderItem.description,
    colorOfReminder: reminderItem.color,
  });
  const removeReminder = async () => {
    await axios
      .delete(`http://localhost:5000/reminders?id=${reminderItem.id}`)
      .then(() => {})
      .catch(() => {});
    setReminderModalIsOpen(!reminderModalIsOpen);
  };

  const deleteReminder = () => {
    removeReminder();
    setReminderModalIsOpen(!reminderModalIsOpen);
    refreshCalendar();
  };

  const OpenEditModal = () => {
    setEditionModalIsOpen(true);
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setFormInputs({
      ...formInputs,
      [evt.target.name]: value,
    });
  }

  const getFormInfo = () => {
    return {
      title: formInputs.reminderTitle,
      description: formInputs.reminderDescription,
      color: formInputs.colorOfReminder,
      start: startMoment,
      end: endMoment,
      date: `${("0" + reminderItem.day).slice(-2)}-${(
        "0" + reminderItem.month
      ).slice(-2)}-${reminderItem.year}`,
    };
  };

  const editReminder = async () => {
    await axios
      .put("http://localhost:5000/reminders", getFormInfo())
      .then((response) => {})
      .catch((error) => {});

    setReminderModalIsOpen(false);
  };

  return (
    <>
      <div>
        <Backdrop open={reminderModalIsOpen}>
          <Board>
            <DayModalBox>
              {!editionModalIsOpen ? (
                <MeaningInfoBox>
                  <DayInfo>
                    <div>{reminderItem.date}</div>

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
                  <Title>{renderTitle(reminderItem.title)}</Title>
                  <SubTilte>
                    inicio: {reminderItem.start} fim:{reminderItem.start}
                  </SubTilte>
                  <SubTilte> {reminderItem.city}</SubTilte>
                  <Description>{reminderItem.description} </Description>
                </MeaningInfoBox>
              ) : (
                <EditMeaningInfoBox>
                  {" "}
                  <DayInfo>
                    <div>{reminderItem.date}</div>
                    <></>
                    <CloseButton
                      onClick={() => {
                        setReminderModalIsOpen(false);
                      }}
                    >
                      <AiFillCloseCircle />
                    </CloseButton>
                  </DayInfo>
                  <TextField
                    fullWidth
                    id="outlined-name"
                    label="Lembrete"
                    name="reminderTitle"
                    value={formInputs.reminderTitle}
                    onChange={handleChange}
                    inputProps={{ maxLength: 30 }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <HourPickerBox>
                      <DesktopTimePicker
                        label="Inicio"
                        value={startMoment}
                        onChange={(newValue) => {
                          setStartMoment(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />

                      <DesktopTimePicker
                        label="Fim"
                        value={endMoment}
                        onChange={(newValue) => {
                          setEndMoment(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Cor"
                        name="colorOfReminder"
                        value={formInputs.colorOfReminder}
                        onChange={handleChange}
                      >
                        {tagColors.map((item) => (
                          <MenuItem key={item} value={item}>
                            <ColorDisplay
                              style={{ backgroundColor: item }}
                            ></ColorDisplay>
                          </MenuItem>
                        ))}
                      </TextField>
                    </HourPickerBox>
                    <TextField
                      type="text"
                      fullWidth
                      label="Descrição"
                      name="reminderDescription"
                      value={formInputs.reminderDescription}
                      onChange={handleChange}
                      id="outlined-multiline-flexible"
                      multiline
                      rows={4}
                      maxRows={4}
                    />
                  </LocalizationProvider>
                  <SendButton
                    onClick={() => {
                      editReminder();
                      setEditionModalIsOpen(false);
                    }}
                  >
                    Editar lembrete
                  </SendButton>
                </EditMeaningInfoBox>
              )}
            </DayModalBox>
          </Board>
        </Backdrop>
      </div>
    </>
  );
}
