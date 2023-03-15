import { useState, useEffect, useContext } from "react";
import { useFetch } from "./../../hooks/useFetch";
import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import LoginContext from "../../context/Login/LoginContext";

export default function Calendar() {
  const [meets, setMeets] = useState(null);
  const { userLogged } = useContext(LoginContext);

  useEffect(() => {
    if (userLogged) {
      const idStudent = userLogged.id;
      fetch(`http://localhost:3001/api/meetings/${idStudent}`)
        .then((response) => response.json())
        .then((json) => {
          const events = json.Meetings.map((event) => {
            const start = moment
              .utc(event.date.start)
              .format("YYYY-MM-DDThh:mm:ss");

            const end = moment
              .utc(event.date.end)
              .format("YYYY-MM-DDThh:mm:ss");
            const tempEvent = {
              start,
              end,
              // end: new Date(end).toUTCString(),
              title: `${event.nameTeacher}`,
              id: event._id,
            };
            return tempEvent;
          });
          setMeets(events);
        });
      // console.log(data);
    }
  }, [userLogged]);

  return (
    <div>
      {/* {console.log(JSON.stringify(meets))} */}
      <FullCalendar
        timeZone="UTC"
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
    </div>
  );
}
