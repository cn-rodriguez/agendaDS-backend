export default function ScheduleInfoTime({ time, day, sentData }) {
  const timeStart = time.time.start.slice(0, 5);
  const timeEnd = time.time.end.slice(0, 5);

  const handleClick = () => {
    const timeToDelete = {
      day,
      time: { start: time.time.start, end: time.time.end },
    };
    sentData(timeToDelete);
  };
  return (
    <div className="flex bg-white rounded-full justify-between">
      <div className="">
        <p>
          Hora de inicio: <span>{timeStart}</span>
        </p>
        <p>
          Hora de termino: <span>{timeEnd}</span>
        </p>
      </div>
      <button onClick={handleClick}>[-]</button>
    </div>
  );
}
