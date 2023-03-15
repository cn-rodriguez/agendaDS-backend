import NavBarTeacher from "../components/navBar/NavBarTeacher";
import CalendarTeacher from "../components/calendar/CalendarTeacher";
import InfoMeeting from "../components/InfoMeeting";

export default function ScheduleTeacherPage() {
  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 m-1">
      <div className="col-span-2">
        <NavBarTeacher />
      </div>
      <div className="bg-grey-bg col-span-8 rounded-3xl m-1">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          <div>ScheduleTeacherPage</div>
        </h1>
        {/* <Link to={`usuarios/${userId}`}>Usuarios</Link> */}
        <div className="m-3 md:m-5 lg:m-10 gap-10 md:h-3/4">
          <div>
            <CalendarTeacher />
          </div>
          {/* <div className="bg-white pb-4 md:col-span-1 md:pb-0">
            <InfoMeeting />
          </div> */}
        </div>
      </div>
    </div>
  );
}
