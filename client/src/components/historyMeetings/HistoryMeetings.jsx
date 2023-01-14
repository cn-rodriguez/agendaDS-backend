import { useState, useEffect } from "react";

export default function HistoryMeetings() {
  const [meetings, setMeetings] = useState(null);

  useEffect(() => {
    fetch("/history")
      .then((response) => response.json())
      .then((json) => setMeetings(json));
    // .then((json) => console.log(json));
  }, []);

  return (
    <div className="mt-7">
      <h2 className="font-bold mb-1">Historial de reuniones</h2>
      <div className="bg-slate-300 p-3 rounded-lg flex my-2">
        <p>{!meetings ? "Cargando..." : meetings.id1.Date}</p>
      </div>
      <div className="bg-slate-300 p-3 rounded-lg flex my-2">
        <p>{!meetings ? "Cargando..." : meetings.id2.Date}</p>
      </div>
      <div className="bg-slate-300 p-3 rounded-lg flex my-2">
        <p>{!meetings ? "Cargando..." : meetings.id3.Date}</p>
      </div>
      <div className="bg-slate-300 p-3 rounded-lg flex my-2">
        <p>{!meetings ? "Cargando..." : meetings.id3.Date}</p>
      </div>
      <div className="bg-slate-300 p-3 rounded-lg flex my-2">
        <p>{!meetings ? "Cargando..." : meetings.id3.Date}</p>
      </div>
    </div>
  );
}
