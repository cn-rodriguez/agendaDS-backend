import Calendar from "../../components/calendar/Calendar";
import ScheduleButtons from "./../../components/scheduleButtons/ScheduleButtons";
import NavBar from "./../../components/navBar/NavBar";

export default function SchedulePage() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 m-1">
      <div className="col-span-2">
        <NavBar />
      </div>
      <div className="bg-white col-span-8 rounded-3xl m-1">
        <h2 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Agenda
        </h2>
        <div className="m-3 md:grid md:grid-cols-3 md:m-5 lg:m-10 gap-10 md:h-3/4">
          <div className="md:col-span-2 md:mt-10">
            <Calendar />
          </div>
          <ScheduleButtons />
        </div>
      </div>
    </div>
  );
}
