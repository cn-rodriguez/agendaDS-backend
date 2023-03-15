import { useState, useEffect } from "react";
import SchedulesList from "./SchedulesList";

export default function ScheduleManagerTeacher() {
  return (
    <div>
      <div>
        <div>
          <button
            onClick={() => {
              navigate("../reuniones");
            }}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Volver
          </button>
          <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
            Añadir atención
          </button>
        </div>
      </div>

      <div>
        <div>
          <SchedulesList />
        </div>
      </div>
    </div>
  );
}
