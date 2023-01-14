import { useState } from "react";
import { useFetch } from "./../../hooks/useFetch";
import { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  const [meets, setMeets] = useState([]);
  const { data } = useFetch("/meetings");

  useEffect(() => {
    if (data != null) {
      setMeets(data.meetings);
    }
  }, [data]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      locale="es"
      firstDay={1}
      height="auto"
      events={meets}
      buttonText={{
        today: "Hoy",
      }}
    />
  );
}
