import { Link } from "react-router-dom";
import NextMeeting from "./../../components/nextMeeting/NextMeeting";
import HistoryMeetings from "./../../components/historyMeetings/HistoryMeetings";
import ScheduleButtons from "../../components/scheduleButtons/ScheduleButtons";
import NavBar from "./../../components/navBar/NavBar";

// TODO make responsive

export default function HomePage() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 m-1">
      <div className="col-span-2">
        <NavBar />
      </div>
      <div className="bg-grey-bg col-span-8 rounded-3xl m-1">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Bienvenido
        </h1>
        {/* <Link to={`usuarios/${userId}`}>Usuarios</Link> */}
        <div className="m-3 md:grid md:grid-cols-3 md:m-5 lg:m-10 gap-10 md:h-3/4">
          <div className="md:col-span-2 ">
            <NextMeeting />
            <HistoryMeetings />
          </div>
          <div className="pb-4 md:col-span-1 md:pb-0">
            <ScheduleButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
