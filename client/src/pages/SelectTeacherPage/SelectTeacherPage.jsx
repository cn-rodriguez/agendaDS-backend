import NavBar from "../../components/navBar/NavBar";
import SearchComponent from "./../../components/searchComponent/SearchComponent";

export default function SelectTeacherPage() {
  // TODO make search component
  // TODO make list Teachers component
  return (
    <>
      <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 m-1">
        <div className="col-span-2">
          <NavBar />
        </div>
        <div className="bg-white col-span-8 rounded-3xl m-1">
          <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
            Agendando
          </h1>
          {/* <Link to={`usuarios/${userId}`}>Usuarios</Link> */}
          <h2 className="font-bold text-lg pt-4 m-2 md:m-5 lg:m-10">
            Seleccione al docente
          </h2>
          <div className="m-3 md:grid md:m-5 lg:m-10 md:h-3/4">
            <SearchComponent />
          </div>
        </div>
      </div>
      {/* <ListTeachers /> */}
    </>
  );
}
