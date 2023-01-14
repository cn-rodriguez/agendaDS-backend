import { Link } from "react-router-dom";

export default function ScheduleButtons() {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-7 mb-1 md:mb-5 md:text-xl">
        Agenda tu reunion{" "}
      </h2>

      <div className="bg-slate-300 flex flex-col content-evenly rounded-lg w-full p-1">
        <>
          <Link to="/docentes">
            <button className="bg-slate-700 text-white m-5 text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-11/12">
              Profesores
            </button>
          </Link>
          <Link to="/docentes">
            <button className="bg-slate-700 text-white m-5 text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-11/12">
              PIE
            </button>
          </Link>
          <Link to="/docentes">
            <button className="bg-slate-700 text-white m-5 text-xl font-semibold h-24 rounded-lg hover:bg-sky-500 w-11/12">
              Dirección
            </button>
          </Link>
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
