import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoScheduleAdmin from "./InfoScheduleAdmin";

export default function TimetableAdmin() {
  const [schedules, setSchedules] = useState(null);
  const { id } = useParams();

  const showData = async (id) => {
    const scheduleResp = await fetch(
      `http://localhost:3001/api/schedule/teacher/admin/${id}`
    );
    const scheduleData = await scheduleResp.json();

    setSchedules(scheduleData.schedules);
  };

  useEffect(() => {
    showData(id);
  }, []);

  return (
    <>
      {schedules == null ? null : (
        <div>
          {schedules.length !== 0 ? (
            <>
              {/* <>{JSON.stringify(schedules)}</> */}
              <div>
                <InfoScheduleAdmin
                  dia="Lunes"
                  datos={schedules.Schedule[0].monday}
                />
                <InfoScheduleAdmin
                  dia="Martes"
                  datos={schedules.Schedule[0].tuesday}
                />
                <InfoScheduleAdmin
                  dia="Miercoles"
                  datos={schedules.Schedule[0].wednesday}
                />
                <InfoScheduleAdmin
                  dia="Jueves"
                  datos={schedules.Schedule[0].thursday}
                />
                <InfoScheduleAdmin
                  dia="Viernes"
                  datos={schedules.Schedule[0].friday}
                />
                {/* <div>Martes...</div>
                <div>Miercoles...</div>
                <div>Jueves...</div>
                <div>Viernes...</div> */}
              </div>
            </>
          ) : (
            <div className="min-h-5/6">
              <p>No hay registros para el docente seleccionado</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
