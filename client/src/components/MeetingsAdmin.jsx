import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MeetingsAdminPage() {
  const [userStats, setUsersStats] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = (id) => {
    const idUser = String(id);
    navigate(`${idUser}/panel`);
  };

  const handleData = async () => {
    const respStats = await fetch(
      "http://localhost:3001/api/users/teacher/stats"
    );
    const dataStats = await respStats.json();

    setUsersStats(dataStats.stats);
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRole = (role) => {
    switch (role) {
      case "TEACHER_ROLE":
        return "Profesor";
        break;
      case "TEACHER_PIE_ROLE":
        return "Profesor P.I.E";
        break;
      default:
        return "Desconocido";
    }
  };

  const results = !search
    ? userStats
    : userStats.filter((dato) =>
        dato.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <>
      <div className="w-full">
        <div className="my-4">
          <input
            type="text"
            onChange={handleSearch}
            className="bg-gray-300 focus:bg-white p-2 rounded-md w-full placeholder:text-slate-500"
            placeholder="Buscar..."
          />
        </div>

        {userStats ? (
          <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-1">
              <thead className="text-xs text-gray-900 uppercase bg-gray-700 dark:text-gray-400 ">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3">Pendiente</th>
                  <th className="px-6 py-3">Cancelado</th>
                  <th className="px-6 py-3">Completado</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b hover:bg-gray-600 text-gray-900 hover:text-white"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap ">
                      {user.name}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{handleRole(user.role)}</td>
                    <td className="px-6 py-4">{user.meeting.pending}</td>
                    <td className="px-6 py-4">{user.meeting.canceled}</td>
                    <td className="px-6 py-4">{user.meeting.completed}</td>
                    <td>
                      <button
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                        onClick={() => handleClick(user._id)}
                      >
                        Agendar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}
