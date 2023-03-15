import { useState } from "react";
import logo from "../../assets/img/Imagen1.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link } from "react-router-dom";

import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBarAdminMobile({ site1, site2, site3, site4 }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  async function LogOut() {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem("session"), (done) => {
      localStorage.clear();
      location.reload();
    });
  }
  return (
    <>
      <div className="bg-dark-blue p-5 grid grid-cols-3 md:h-full  md:grid-rows-4">
        <div className="sm:col-span-1 md:content-center ">
          <img src={logo} alt="" className="w-20 md:w-48 h-auto " />
        </div>
        <div className="col-start-3 col-span-1 grid justify-items-end">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="text-white h-2/4" />
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="grid">
          <NavLink
            to={site1}
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
            className={({ isActive }) =>
              isActive
                ? "bg-white text-dark-blue m-2  py-1 px-3 font-semibold text-2xl rounded-full"
                : "text-white m-2 py-1 px-3 font-bold text-2xl"
            }
          >
            Usuarios
          </NavLink>

          <NavLink
            // to="/reuniones"
            to={site4}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-dark-blue m-2  py-1 px-3 font-semibold text-2xl rounded-full"
                : "text-white m-2 py-1 px-3 font-bold text-2xl"
            }
          >
            Reuniones
          </NavLink>
          <div className="text-white  flex justify-center items-center">
            <div className="hover:bg-red-500 m-2 p-2 rounded-lg">
              <Link className="text-xl" onClick={LogOut}>
                Cerrar sesión <FontAwesomeIcon icon={faRightFromBracket} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
