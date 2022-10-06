import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import { tagColors } from "../../Services/tagColorOptions";

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  width: 100%;
  z-index: 5;
`;

const BoardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SendButton = styled.div`
  background-color: #ef4136;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
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

export default function DayModal({
  year,
  month,
  day,
  open,
  setOpen,
  refreshCalendar,
}) {
  const [startMoment, setStartMoment] = useState(
    dayjs(`${year}-${day}-${("0" + month).slice(-2)} 12:00`)
  );
  const [endMoment, setEndMoment] = useState(
    dayjs(`${year}-${day}-${("0" + month).slice(-2)} 12:30`)
  );

  const [formInputs, setFormInputs] = useState({
    reminderTitle: "",
    reminderDescription: "",
    colorOfReminder: tagColors[0],
  });

  const resetForms = () => {
    setFormInputs({
      reminderTitle: "",
      reminderDescription: "",
      colorOfReminder: tagColors[0],
    });
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
      date: `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`,
    };
  };

  const insertReminder = async () => {
    if (true) {
      await axios
        .post("http://localhost:5000/reminders", getFormInfo())
        .then((response) => {
          //   setRequestAwnser(response.data);
          //   navigate("/")
        })
        .catch((error) => {
          //   setRequestErrorAwnser(error.response.data);
        });
    }
    setOpen(!open);
    resetForms();
    refreshCalendar();
  };

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Backdrop open={open}       sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
        <BoardBox>
          {" "}
          <Board>
            <DayModalBox>
              <DayInfo>
                <div>
                  {("0" + day).slice(-2)}-{("0" + month).slice(-2)}-{year}
                </div>
                <CloseButton onClick={handleClose}>
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
                  insertReminder();
                }}
              >
                Criar lembrete
              </SendButton>
            </DayModalBox>
          </Board>
        </BoardBox>
      </Backdrop>
    </div>
  );
}
