import NavBarAdmin from "../components/navBar/NavBarAdmin";
import NextMeeting from "../components/nextMeeting/NextMeeting";
import HistoryMeetingsAdmin from "../components/historyMeetings/HistoryMeetingsAdmin";

export default function HomeAdmin() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2">
      <div className="col-span-2">
        <NavBarAdmin />
      </div>
      <div className="bg-grey-bg col-span-8 rounded-3xl m-1">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Bienvenido
        </h1>
        {/* <Link to={`usuarios/${userId}`}>Usuarios</Link> */}
        <div className="m-3 md:grid  md:m-5 lg:m-10 gap-10 md:h-3/4">
          <div className="md:col-span-2 ">
            <NextMeeting />
            <HistoryMeetingsAdmin />
          </div>
        </div>
      </div>
    </div>
  );
}
