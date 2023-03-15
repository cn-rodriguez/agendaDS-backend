import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import React from "react";
// import TeacherSelector from "./../teacherSelector/TeacherSelector";

export default function SearchComponent() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  // function to get data from API
  let { state } = useLocation();

  console.log(state);
  //! USANDO STATE UTILIZAR PUEDO GENERAR UNA RUTA EN BACKEND
  //! PARA SOLICITAR LOS USUARIOS DEPENDIENDO DEL DATO DE LA REQUEST

  const showData = async () => {
    const resp = await fetch(
      `http://localhost:3001/api/users/teacher/${state.role}`
    );
    const data = await resp.json();
    setTeachers(data.users);
  };

  // funcion de busqueda
  const searcher = (event) => {
    setSearch(event.target.value);
  };
  //
  const results = !search
    ? teachers
    : teachers.filter((dato) =>
        dato.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    showData();
  }, []);

  return (
    <div className="mx-2 mb-4 pb-8">
      <label className="font-semibold text-lg">Buscar: </label>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Juan Perez"
        className="form-input rounded text-pink-500"
      />
      <div className="md:grid md:grid-cols-2 gap-2 lg:grid lg:grid-cols-3">
        {results.map((teacher) => (
          <Link to={`/docentes/agendar/${teacher._id}`} key={teacher._id}>
            <div
              key={teacher._id}
              className="my-3 flex flex-col border-2 rounded-lg shadow-lg border-slate-200 hover:bg-sky-500"
            >
              <div className="grid px-2 min-w-fit">
                <p className="hidden"> {teacher.id} </p>
                <div className="flex justify-between">
                  <p className="font-semibold ">Nombre:</p>
                  <p> {teacher.name}</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold">Email:</p>
                  <p>{teacher.email}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>USER NAME</th>
          </tr>
        </thead>
        <tbody>
          {results.map((teacher) => (
            <tr key={teacher.id}>
              <td> {teacher.name}</td>
              <td> {teacher.username}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
