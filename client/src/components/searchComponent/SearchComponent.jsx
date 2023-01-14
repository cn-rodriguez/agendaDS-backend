import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import React from "react";
// import TeacherSelector from "./../teacherSelector/TeacherSelector";

export default function SearchComponent() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  // function to get data from API
  const URL = "https://jsonplaceholder.typicode.com/users";

  const showData = async () => {
    const resp = await fetch("http://localhost:3001/api/users");
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
    <div className="mx-2">
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Buscar"
        className="form-input rounded text-pink-500"
      />
      <div className="md:grid md:grid-cols-2 gap-2 lg:grid lg:grid-cols-3">
        {results.map((teacher) => (
          <div
            key={teacher.id}
            className="my-3 grid grid-cols-4 content-center border-2 rounded-lg border-slate-200 hover:bg-sky-500"
          >
            <div className="w-24 h-24">
              <p>IMG</p>
            </div>
            <div className="col-span-2 px-2 min-w-fit">
              <p className="hidden"> {teacher.id} </p>
              <p> {teacher.name}</p>
              <p> {teacher.email}</p>
            </div>

            <Link to={`/docentes/agendar/${teacher._id}`}>
              <div className="bg-white cursor-pointer hover:bg-white m-1 rounded-xl justify-center">
                Agenda
              </div>
            </Link>
          </div>
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
