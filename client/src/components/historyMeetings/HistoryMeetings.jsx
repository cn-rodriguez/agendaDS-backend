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
          console.log(json);
          setMeetings(json.Meetings);
          // console.log(meetings);
        });
      // .then((json) => console.log(json));
    } else {
      console.log("Loading");
    }
  }, [userLogged]);
  return (
    <>
      <div className="mt-7">
        <h2 className="font-bold mb-1">Historial de reuniones</h2>
        {!meetings ? (
          <div>Cargando...</div>
        ) : (
          <div>
            {meetings?.map((element) => (
              <p key={element._id}>{element._id}</p>
            ))}
          </div>
        )}
        {/* <div className="bg-slate-300 p-3 rounded-lg flex my-2">
          <p>
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
