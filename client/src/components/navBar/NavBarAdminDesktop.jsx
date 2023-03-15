import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/Imagen1.webp";

export default function NavBarAdminDesktop({ site1, site2, site3, site4 }) {
  async function LogOut() {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem("session"), (done) => {
      localStorage.clear();
      location.reload();
    });
  }

  return (
    <div className="bg-dark-blue flex p-5 md:grid md:h-full md:grid-rows-4">
      <div className="flex justify-center">
        <div className="md:content-center max-w-md">
          <img src={logo} alt="" className="w-20 md:w-48 h-auto " />
        </div>
      </div>
      <div className="flex md:flex-col text-center md:row-span-2 md:item">
        <NavLink
          to={site1}
          style={{ color: "" }}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-dark-blue m-2  py-1 px-3 font-semibold text-2xl rounded-full"
              : "text-white m-2 py-1 px-3 font-bold text-2xl"
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to={site2}
          // style={{ color: "tex" }}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-dark-blue m-2 py-1 px-3 font-semibold text-2xl rounded-full"
              : "text-white m-2 py-1 px-3 font-bold text-2xl"
          }
        >
          Agenda
        </NavLink>

        <NavLink
          to={site3}
          // style={{ color: "tex" }}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-dark-blue m-2 py-1 px-3 font-semibold text-2xl rounded-full"
              : "text-white m-2 py-1 px-3 font-bold text-2xl"
          }
        >
          Usuarios
        </NavLink>
        <NavLink
          to={site4}
          // style={{ color: "tex" }}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-dark-blue m-2 py-1 px-3 font-semibold text-2xl rounded-full"
              : "text-white m-2 py-1 px-3 font-bold text-2xl"
          }
        >
          Reuniones
        </NavLink>
      </div>
      <div className="text-white  flex justify-center items-center">
        <div className="hover:bg-red-500 m-2 p-2 rounded-lg">
          <Link className="text-xl" onClick={LogOut}>
            Cerrar sesión {"  "}
            <FontAwesomeIcon icon={faRightFromBracket} />
            {/* {` Salir`} */}
          </Link>
        </div>
      </div>
    </div>
  );
}
