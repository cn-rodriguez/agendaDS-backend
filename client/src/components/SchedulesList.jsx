import { useState, useEffect, useContext } from "react";
import ScheduleInfo from "./ScheduleInfo";

import LoginContext from "./../context/Login/LoginContext";

export default function SchedulesList() {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const [schedules, setSchedules] = useState(null);
  const [schedulesValues, setSchedulesValues] = useState(null);
  const [schedulesKeys, setSchedulesKeys] = useState(null);
  const [schedulesEdited, setSchedulesEdited] = useState(null);

  const { userLogged } = useContext(LoginContext);

  const showData = async () => {
    const schedulesResp = await fetch(
      `http://localhost:3001/api/schedule/teacher/admin/63d1334114ee9f7d71db00e0`
    );
    const schedulesData = await schedulesResp.json();
    const { Schedule } = schedulesData.schedules;
    const { _id, ...dates } = Schedule[0];
    setSchedules(schedulesData.schedules);
    setSchedulesEdited(schedulesData.schedules);

    setSchedulesValues(Object.values(dates));
    setSchedulesKeys(Object.keys(dates));
  };

  useEffect(() => {
    showData();
  }, []);

  const getToDelete = (datos) => {
    console.log(datos);
    const scheduleMod = schedules?.Schedule[0][datos.day].map((time) => {
      if (datos.time != time) {
        console.log(time);
        return time;
      }
    });
    console.log(
      "🚀 ~ file: SchedulesList.jsx:36 ~ scheduleMod ~ scheduleMod:",
      scheduleMod
    );

    // console.log(datos, schedules?.Schedule[0][datos.day]);
    // console.log(datos.time);
    // console.log(schedules?.Schedule[0][datos.day].includes(datos.time));
  };

  return (
    <>
      {schedules ? (
        <>
          {schedulesValues.map((value, index) => (
            <div key={index} className="bg-red-200 my-2">
              <ScheduleInfo
                day={schedulesKeys[index]}
                data={schedulesValues[index]}
                sentData={getToDelete}
              />
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
