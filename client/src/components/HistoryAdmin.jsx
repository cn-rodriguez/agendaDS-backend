import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleDate, handleTime } from "../helpers/handleDate";
import StatusIcon from "./StatusIcon";
import moment from "moment";

export default function HistoryAdmin() {
  const [meetings, setMeetings] = useState(null);

  const { id } = useParams();
  const showData = async () => {
    const meetingsResp = await fetch(
      `http://localhost:3001/api/meetings/teacher/${id}`
    );
    const meetingsData = await meetingsResp.json();

    setMeetings(meetingsData.Meetings);
  };

  useEffect(() => {
    showData();
  }, []);
  return (
    <div>
      {meetings ? (
        <div className="h-[38rem] overflow-auto shadow-2xl ">
          <table className="table-fixed w-full text-sm text-left text-gray-600 pt-2">
            <thead className="text-xs text-gray-100 uppercase bg-gray-700">
              <tr>
                <th className="text-center px-6 py-3">Nombre</th>
                <th className="px-6 py-3 text-center">Fecha</th>
                <th className="px-6 py-3 text-center">Hora</th>
                <th className="px-6 py-3 text-center">Estado</th>
                <th className="px-6 py-3 text-center">Razón</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meet) => (
                <tr key={meet._id} className="odd:bg-slate-200 gap-2 pt-4">
                  <td>{meet.nameTutor}</td>
                  <td>{handleDate(meet.date.start)}</td>
                  <td>
                    {moment(meet.date.start).utc().format("HH:mm")}-
                    {moment(meet.date.end).utc().format("HH:mm")}
                  </td>
                  <td>
                    <StatusIcon status={meet.status} />
                  </td>
                  <td>
                    {meet.reason ? meet.reason : "No hay razón registrada"}
                  </td>

                  {/* {JSON.stringify(meet)} */}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-700 ">
              <tr className="font-semibold text-white rounded-b-lg">
                <td></td>
                <td></td>
                <td></td>
                <td className="px-6 py-3 text-base">Total de reuniones:</td>
                <td className="px-6 py-3">{meetings.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
    </div>
  );
}
