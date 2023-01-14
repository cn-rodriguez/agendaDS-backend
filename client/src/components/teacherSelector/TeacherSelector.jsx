export default function TeacherSelector(props) {
  return (
    <div className="bg-red-400">
      <h3>{props.name}</h3>
      <p>{props.email}</p>
      <p>{props.website}</p>
    </div>
  );
}
