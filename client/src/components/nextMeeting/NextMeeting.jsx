import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import LoginContext from "../../context/Login/LoginContext";
import jwt_decode from "jwt-decode";

export default function NextMeeting() {
  const { userLogged } = useContext(LoginContext);
  const [info, setInfo] = useState(null);
  let options = {
    weekday: "long",
  };

  useEffect(() => {
    if (userLogged) {
      const idStudent = userLogged.id;
      fetch(`http://localhost:3001/api/meetings/next/${idStudent}`)
        .then((response) => response.json())
        .then((json) => {
          setInfo(json.meeting);
        });
      // console.log(info);
    }
  }, [userLogged]);

  // useEffect(() => {
  //   const idStudent = userLogged?.id;
  //   console.log(idStudent);
  //   if (idStudent) {
  //     const data = useFetch(
  //       `http://localhost:3001/api/meetings/next/${idStudent}`,
  //       userLogged
  //     );
  //     console.log(data);
  //   }

  //   // if (userLogged) {
  //   //   console.log(userLogged);
  //   //   // const data = useFetch(
  //   //   //   `http://localhost:3001/api/meetings/next/${userLogged[id]}`
  //   //   // );
  //   //   // console.log(data);
  //   // }
  // }, [userLogged]);

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <h2 className="font-bold mb-1">Proxima Reunion</h2>
      <hr />

      {info ? (
        <div className="p-3 rounded-lg">
          <p>
            Dia:{" "}
            {new Date(info.date.start).toLocaleDateString("es-ES", options)}
          </p>
          <p>
            Fecha: {new Date(info.date.start).toLocaleString().slice(0, 10)}
          </p>
          <p>Hora: {new Date(info.date.start).toUTCString().slice(17, 25)}</p>
          <p>Docente: {info.nameTeacher}</p>
        </div>
      ) : (
        <p>No fue encontrada su proxima reunion</p>
      )}
    </div>
  );
}
