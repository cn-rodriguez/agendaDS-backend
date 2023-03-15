import ScheduleAdmin from "./ScheduleAdmin";
import HistoryAdmin from "./HistoryAdmin";
import TimetableAdmin from "./TimetableAdmin";

export default function InfoMeetManager({ info }) {
  const componentSelector = (info) => {
    switch (info) {
      case "agenda":
        return <ScheduleAdmin />;
      case "historial":
        return <HistoryAdmin />;
      case "horario":
        return <TimetableAdmin />;
      default:
        return <ScheduleAdmin />;
    }
  };

  return (
    <div className="w-full bg-white h-fit">
      <>{componentSelector(info)}</>
    </div>
  );
}
