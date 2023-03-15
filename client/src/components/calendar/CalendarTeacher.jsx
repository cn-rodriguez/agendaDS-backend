import { useState, useEffect, useContext } from "react";
import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import LoginContext from "../../context/Login/LoginContext";
import InfoMeeting from "./../InfoMeeting";

export default function CalendarTeacher() {
  const [meets, setMeets] = useState(null);
  const [meet, setMeet] = useState(null);
  const { userLogged } = useContext(LoginContext);

  //   console.log("Entro al useEffect");
  useEffect(() => {
    if (userLogged) {
      const idTeacher = userLogged.id;
      fetch(`http://localhost:3001/api/meetings/teacher/${idTeacher}`)
        .then((response) => response.json())
        .then((json) => {
          //   console.log(json);
          const events = json.Meetings.map((event) => {
            const { _id, nameTutor, date, ...props } = event;
            const start = moment.utc(date.start).format("YYYY-MM-DDThh:mm:ss");

            const end = moment.utc(date.end).format("YYYY-MM-DDThh:mm:ss");
            const tempEvent = {
              start,
              end,
              // end: new Date(end).toUTCString(),
              title: `${event.nameTutor}`,
              id: event._id,
              extendedProps: {
                nameTutor,
                ...props,
                start,
                end,
              },
            };
            return tempEvent;
          });
          setMeets(events);
        });
      // console.log(data);
    }
  }, [userLogged]);

  const showEvent = (event) => {
    setMeet(event.event._def);
  };

  return (
    <div className="grid md:grid-cols-5">
      {/* {console.log(JSON.stringify(meets))} */}
      <div className="bg-white rounded-lg shadow-md p-2 md:col-span-3">
        <FullCalendar
          timeZone="UTC"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          locale="es"
          firstDay={1}
          height="auto"
          events={meets}
          eventClick={showEvent}
          buttonText={{
            today: "Hoy",
          }}
        />
      </div>
      <div className="bg-white mt-5 rounded-lg shadow-md p-2 md:col-span-2 md:mt-0 mb-4 md:mb-0 md:ml-4">
        <InfoMeeting showEvent={{ meet }} />
      </div>
    </div>
  );
}
