import { useState, useEffect, useContext } from "react";
import LoginContext from "../../context/Login/LoginContext";
import { handleDate, handleTime } from "../../helpers/handleDate";
import StatusIcon from "./../StatusIcon";

export default function HistoryMeetings() {
  const [meetings, setMeetings] = useState(null);
  const { userLogged } = useContext(LoginContext);

  useEffect(() => {
    if (userLogged) {
      const idStudent = userLogged.id;
      fetch(`http://localhost:3001/api/meetings/${idStudent}`)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          setMeetings(json.Meetings);
          // console.log(meetings);
        });
      // .then((json) => console.log(json));
    }
  }, [userLogged]);
  return (
    <>
      <div className="mt-7 bg-white rounded-lg p-3 shadow-md">
        <h2 className="font-bold mb-1">Historial de reuniones</h2>
        <hr />
        {!meetings ? (
          <div>Cargando...</div>
        ) : (
          <table className="table-auto w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th>Profesor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {meetings?.map((element, index) => (
                <tr key={index}>
                  <td>{element.nameTeacher}</td>
                  <td>{handleDate(element.date?.start)}</td>
                  <td>{handleTime(element.date?.start)}</td>
                  <td>
                    <StatusIcon status={element.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* <div className="bg-slate-300 p-3 rounded-lg flex my-2">
          <p>


          //   <div key={element._id} className="flex">
            //     <p>{handleDate(element.date)}</p>
            //     <p>{handleTime(element.time)}</p>
            //     <p>{element.nameTeacher}</p>
            //     <StatusIcon status={element.status} />
            //   </div>
            // ))}


            {!meetings ? (
              "Cargando..."
            ) : (
              // : `${meetings[0].nameTeacher}
              // ${handleDate(meetings[0].date)}
              // ${handleTime(meetings[0].time)}`}
              <StatusIcon status={meetings[0].status} />
            )}
          </p>
        </div> */}
      </div>
    </>
  );
}
