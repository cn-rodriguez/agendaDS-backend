import { useState, useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import HomePage from "./../../pages/HomePage/HomePage";
import AttentionForm from "./../attentionForm/AttentionForm";
import MeetSelected from "../MeetSelected";

import LoginContext from "../../context/Login/LoginContext";

import { useFetch } from "../../hooks/useFetch";

export default function AttentionSchedule() {
  const navigate = useNavigate();
  const { userLogged } = useContext(LoginContext);

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

  let { id } = useParams();
  const { data } = useFetch(`http://localhost:3001/api/dates/${id}`, id);
  const user = useFetch(`http://localhost:3001/api/users/${id}`, id);

  const [meet, setMeet] = useState({
    teacherId: "",
    userLoggedId: "",
    date: { start: {}, end: {} },
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const saveEvent = (info) => {
    setMeet({
      teacherId: id,
      teacherName: user.data.user.name,
      userLoggedId: userLogged.id,
      date: {
        start: new Date(info.event._instance?.range?.start).toUTCString(),
        end: new Date(info.event._instance?.range?.end).toUTCString(),
      },
    });
    setIsReadOnly(false);
  };
  // <div className="bg-grey-bg col-span-8 rounded-3xl m-1">

  return (
    <div className="bg-grey-bg md:grid md:grid-cols-3 rounded-3xl my-4">
      <div className="bg-white col-span-2 p-2 rounded-lg shadow-md mx-2">
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={false}
          locale="es"
          firstDay={1}
          height="auto"
          events={data}
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
      </div>
      <div className="col-span-1 mx-2">
        <MeetSelected saveEvent={{ meet }} />
        <AttentionForm saveEvent={{ meet }} disable={isReadOnly} />
      </div>
    </div>
  );
}
