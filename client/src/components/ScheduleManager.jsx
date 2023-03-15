import { Link } from "react-router-dom";

export default function ScheduleManager() {
  return (
    <div className="bg-white rounded-lg py-4 mt-6 md:mt-0">
      <div className="font-bold mx-2">
        <h2>Gestion de horarios</h2>
        <hr />
      </div>
      <div className=" m-4">
        <Link className="w-full h-auto" to="/horarios">
          <button className="w-full text-white bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 h-[5rem]">
            Manejar horarios
          </button>
        </Link>
      </div>
    </div>
  );
}
