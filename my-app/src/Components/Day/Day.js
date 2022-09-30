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
  border: 2px solid red;
`;

const EventsOfDay = ({ events }) => {
  // {data.days.map((item) =>
  //     <Day item={item} openDay={openDay} />
  //   )}

  if (events) {
    {
      events.reminders.map((item) => <Reminder>aaaa</Reminder>);
    }

    return <Reminder>aaaa</Reminder>;
  }
};

export default function Day({ item, openDay }) {
  if (item.eventsOfDay) {
    console.log("events of day", item);
  }

  if (item.isValideDay) {
    return (
      <DayBox
        onClick={() => {
          openDay(item.day);
        }}
      >
        {item.day}
        <EventsOfDay events={item.eventsOfDay} />
      </DayBox>
    );
  }
  return <EmptyDay> </EmptyDay>;
}
