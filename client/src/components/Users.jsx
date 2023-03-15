import { useState, useEffect, useRef } from "react";
import UserInfo from "./UserInfo";

export default function Users() {
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([
    { _id: "020577d2-a54e-4027-b02f-a8af88efdf14", role: "Seleccione un rol" },
  ]);
  const [users, setUsers] = useState();

  const showData = async () => {
    const respRoles = await fetch("http://localhost:3001/api/roles");
    const dataRoles = await respRoles.json();

    const respUsers = await fetch("http://localhost:3001/api/users/");
    const dataUsers = await respUsers.json();

    setRoles(dataRoles);
    setUsers(dataUsers.users);
  };
  const usersFilter = (users) => {
    const resultsAux = role
      ? users.filter((user) => user.role.includes(role))
      : users;

    return resultsAux;
  };

  const results = !search
    ? usersFilter(users)
    : usersFilter(users).filter((dato) =>
        dato.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  const searcher = (event) => {
    setSearch(event.target.value);
  };

  //   useEffect(() => {});
  useEffect(() => {
    showData();
  }, []);

  // const active = (event) => {
  //   const { name, value } = event;
  //   console.log(name);
  // };

  const roleFilter = (event) => {
    role == event.target.value ? setRole(null) : setRole(event.target.value);

    // console.log(prueba);
  };

  const showFilter = (role) => {
    switch (role) {
      case "ADMIN_ROLE":
        return "Administrador";
      case "TEACHER_ROLE":
        return "Profesor";
      case "TEACHER_PIE_ROLE":
        return "Profesor P.I.E";
      case "STUDENT_ROLE":
        return "Estudiante";
      case "RECEPTION_ROLE":
        return "Recepción";
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-white mb-4 shadow-md rounded-lg py-4 px-3">
        <div className="flex align-middle mb-6">
          <label
            htmlFor="search"
            className="block mb-2 text-lg font-medium text-gray-900 mr-2 text-center"
          >
            Buscar: {"  "}
          </label>
          <hr />
          <input
            type="text"
            onChange={searcher}
            id="search"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        {/* flex justify-evenly */}
        <div className="flex flex-wrap gap-4 my-3 justify-evenly">
          <button
            key={roles[0].role}
            value={roles[0]?.role}
            onClick={roleFilter}
            className="border-2 border-[#242331] text-black w-[7.2rem] h-9 rounded-md px-1 hover:bg-dark-blue hover:text-white"
            id={roles[0]?.role}
          >
            Administrador
          </button>
          <button
            key={roles[1]?.role}
            value={roles[1]?.role}
            onClick={roleFilter}
            className="border-2 border-[#242331] text-black w-[7.2rem] mx-1 h-9 rounded-md hover:bg-dark-blue hover:text-white"
            id={roles[1]?.role}
          >
            Profesor
          </button>
          <button
            key={roles[2]?.role}
            value={roles[2]?.role}
            onClick={roleFilter}
            className="border-2 border-[#242331] text-black hover:bg-dark-blue hover:text-white w-[7.2rem] h-9 rounded-md"
            id={roles[2]?.role}
          >
            Estudiante
          </button>
          <button
            key={roles[3]?.role}
            value={roles[3]?.role}
            onClick={roleFilter}
            className="border-2 border-[#242331] text-black hover:bg-dark-blue hover:text-white w-[7.2rem] h-9 rounded-md"
            id={roles[3]?.role}
          >
            P.I.E
          </button>
          <button
            key={roles[4]?.role}
            value={roles[4]?.role}
            onClick={roleFilter}
            className="border-2 border-[#242331] text-black hover:bg-dark-blue hover:text-white w-[7.2rem] h-9 rounded-md"
            id={roles[4]?.role}
          >
            Recepción
          </button>
        </div>
        {role ? (
          <p className="bg-dark-blue w-fit text-white px-2 rounded-full">
            Filtro: {showFilter(role)}
          </p>
        ) : null}
      </div>

      <div className="max-h-[40rem] overflow-y-auto bg-white rounded-md shadow-lg">
        {results?.map((user) => (
          <div className="my-3 mx-3" key={user._id}>
            <UserInfo user={user} key={user._id} users={users} />
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <tr key={user.id}>
  <td key={user.name}>{user.name}</td>
  <td key={user.role}>{user.role}</td>
  <td key={`${user.id}${String(user.status)}`}>
  {String(user.status)}
  </td>
  <td>
  <button className="bg-red-400" onClick={setClicked}>
  abrir
  </button>
  </td>
  </tr>
<tr>{<UserInfo user={user} open={clicked} />}</tr> */
}
