import { useState, useEffect } from "react";

export default function MeetSelected({ saveEvent }) {
  const [info, setInfo] = useState("");
  useEffect(() => {
    // console.log(typeof saveEvent.meet.date.start);
    // console.log(JSON.stringify(saveEvent.meet.date.start));
    // console.log(JSON.stringify(saveEvent.meet));
    setInfo(saveEvent.meet);
  }, [saveEvent.meet]);
  return info.teacherId == "" ? (
    <div className="bg-white rounded-lg shadow-md h-16 p-4">
      <p>No hay reunion seleccionada</p>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4>Reunion seleccionada</h4>
      <p>Dia: {new Date(info?.date?.start).toLocaleDateString()}</p>
      <p>
        Hora de inicio:{" "}
        {new Date(info?.date?.start).toUTCString().slice(17, 25)}
      </p>
      <p>
        Hora de termino: {new Date(info?.date?.end).toUTCString().slice(17, 25)}
      </p>
      <p></p>
    </div>
  );
  //   {
  //     console.log(info);
  //   }
}

// {
//   JSON.stringify(info.date);
// }
