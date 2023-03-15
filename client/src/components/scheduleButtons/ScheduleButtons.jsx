import { Link } from "react-router-dom";

export default function ScheduleButtons() {
  return (
    <div className="bg-white shadow-md flex flex-col mt-6 rounded-md">
      <div className="px-2">
        <h2 className="font-bold mt-4 mb-1 md:mb-5 md:text-xl">
          Agenda tu reunion
        </h2>
        <hr />
      </div>

      <div className="flex flex-col content-evenly rounded-lg w-full p-1">
        <>
          <div className="m-4">
            <Link to="/docentes" state={{ role: "teacher" }}>
              <button className="bg-slate-700 text-white text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-full">
                Profesores
              </button>
            </Link>
          </div>

          <div className="m-4">
            <Link
              to="/docentes"
              state={{ role: "teacher_pie" }}
              className="w-full"
            >
              <button className="bg-slate-700 text-white text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-full">
                P.I.E
              </button>
            </Link>
          </div>
          <div className="m-4">
            <button
              className="bg-gray-800 text-white text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-full disabled:bg-slate-600"
              disabled={true}
            >
              Dirección
              {/* <Link to="/docentes">Dirección</Link> */}
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

// <Link to="/docentes">
//           <button className="bg-slate-700 text-white m-5 text-xl w-full">
//             Profesores
//           </button>
//         </Link>
//         <button className="bg-slate-700 text-white m-5 text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-11/12">
//           PIE
//         </button>
//         <button className="bg-slate-700 text-white m-5 text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-11/12">
//           Dirección
//         </button>
