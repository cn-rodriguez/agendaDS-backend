import NavBarTeacher from "../components/navBar/NavBarTeacher";
import ScheduleManagerTeacher from "../components/ScheduleManagerTeacher";

import { useState } from "react";

export default function ScheduleManagerTeacherPage() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2">
      <div className="col-span-2">
        <NavBarTeacher />
      </div>
      <div className="bg-grey-bg-darker col-span-8 rounded-3xl m-1">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Manejar Horarios
        </h1>
        {/* <Link to={`usuarios/${userId}`}>Usuarios</Link> */}
        <div className="m-3 md:grid md:grid-cols-3 md:m-5 lg:m-10 gap-10 md:h-3/4">
          <ScheduleManagerTeacher />
        </div>
      </div>
    </div>
  );
}
