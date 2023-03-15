import { useState, useEffect } from "react";
import ScheduleInfoTime from "./ScheduleInfoTime";

export default function ScheduleInfo({ day, data, sentData }) {
  const [open, setOpen] = useState(false);
  const [dayTranslated, setDayTranslated] = useState(day);

  const translate = (day) => {
    switch (day) {
      case "monday":
        return "Lunes";
      case "tuesday":
        return "Martes";
      case "wednesday":
        return "Miercoles";
      case "thursday":
        return "Jueves";
      case "friday":
        return "Viernes";
    }
  };

  // const getSchedule = () => {
  //   info !== undefined ? setScheduleDay(info) : null;
  // };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleData = async () => {
    const translatedDay = await translate(day);
    setDayTranslated(translatedDay);
  };

  useEffect(() => {
    handleData();
    // console.log(dayTranslated);
  }, [dayTranslated]);

  const getData = (data) => {
    // console.log("Horario seleccionado:  ", data);
    sentData(data);
  };

  return (
    <div>
      <div>
        <h2 className="font-semibold text-md">{dayTranslated}</h2>
      </div>
      <button onClick={handleOpen}>asa</button>
      <div>
        {open && (
          <div>
            {data.length == 0 ? (
              <>
                <p>No hay datos</p>
              </>
            ) : (
              <>
                a
                {data.map((time, index) => (
                  <ScheduleInfoTime
                    key={index}
                    day={day}
                    time={time}
                    sentData={getData}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
