import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import HomePage from "./../../pages/HomePage/HomePage";
import AttentionForm from "./../attentionForm/AttentionForm";

const userLoggedId = "1";

const user = {
  id: "2",
  name: "John",
  email: "john@gmail.com",
  attention: {
    monday: [
      {
        id: 1,
        title: "Monday",
        start: "2023-01-02T09:00:00",
        end: "2023-01-02T12:00:00",
        extendedProps: {
          slots: 1,
          description: "A basic description",
          repeat: "repeat",
        },
      },
      {
        id: 2,
        title: "Monday",
        start: "2023-01-03T13:00:00",
        end: "2023-01-03sT14:00:00",
        extendedProps: {
          slots: 1,
          description: "A basic description",
          repeat: "repeat",
        },
      },
    ],
  },
};

// const dateSelected = {
//   teacherId: user.id,
//   userLoggedId,
//   date: info.event._instance.range,
// };

export default function AttentionSchedule() {
  const navigate = useNavigate();

  // const saveEvent = (info) => {
  //   const event = {
  //     teacherId: user.id,
  //     userLoggedId,
  //     date: info.event._instance.range,
  //   };
  //   return event;
  //   localStorage.setItem("dateSelected", JSON.stringify(event));
  //   // navigate("/agenda");
  // };
  const [meet, setMeet] = useState({
    teacherId: "",
    userLoggedId: "",
    date: { start: {}, end: {} },
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const saveEvent = (info) => {
    setMeet({
      teacherId: user.id,
      userLoggedId,
      date: info.event._instance.range,
    });
    console.log(meet);
    console.log(info);
    setIsReadOnly(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        locale="es"
        firstDay={1}
        height="auto"
        events={user.attention.monday}
        buttonText={{
          today: "Hoy",
        }}
        allDaySlot={false}
        titleFormat={{
          month: "long",
          year: "numeric",
          day: "2-digit",
          hour12: false,
        }}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        eventClick={saveEvent}
      />

      <AttentionForm saveEvent={{ meet }} disable={isReadOnly} />
    </div>
  );
}
