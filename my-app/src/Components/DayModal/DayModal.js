import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs';
const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;


  -webkit-box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 9px 15px -2px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 5;
  
`;


const DayModalBox = styled.div`
grid-column: 2/7;
background-color: #f6f9fa;
border-radius: 16px;
padding: 32px;
display: flex;
flex-direction: column;
font-family: "Varela Round", sans-serif !important;
gap:16px;
input{
    font-family: "Varela Round", sans-serif !important;
}

`;

const DayInfo = styled.div`

  font-size: 24px;
  padding: 16px 0px;
 
`;

const HourPickerBox = styled.div`
 display: flex;
 gap:32px;
 
`;



export default function DayModal() {

    const [startMoment, setStartMoment] = useState(dayjs('2020-01-01 12:00'));
    const [endMoment, setEndMoment] = useState(dayjs('2020-01-01 12:00'));
    const [open, setOpen] = useState(true);

    const [formInputs, setFormInputs] = useState({
        reminderTitle: "",
        reminderDescription: "",
    });


    function handleChange(evt) {
        const value = evt.target.value;
        setFormInputs({
            ...formInputs,
            [evt.target.name]: value,
        });

    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Button onClick={handleToggle}>Show backdrop</Button>
            <Backdrop

                open={open}
            // onClick={handleClose}
            >

                <Board>     <DayModalBox>

                    <DayInfo> Segunda 20/10/2020</DayInfo>
                    <TextField
                        fullWidth
                        id="outlined-name"
                        label="Lembrete"
                        name="reminderTitle"
                        value={formInputs.reminderTitle}
                        onChange={handleChange}
                    />
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

                        </HourPickerBox>

                    </LocalizationProvider>

                </DayModalBox></Board>

            </Backdrop>
        </div>
    );
}
