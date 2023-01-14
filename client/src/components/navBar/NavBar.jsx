import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/Imagen1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    // <div className="bg-dark-blue mb-8">
    //   <ul className="flex h-10 items-center justify-center">
    //     <li className="px-5 text-lg">
    //       <NavLink to="/inicio" style={{ color: "white" }}>
    //         Inicio
    //       </NavLink>
    //     </li>
    //     <li className="px-5 text-lg">
    //       <NavLink to="/agenda" style={{ color: "white" }}>
    //         Agenda
    //       </NavLink>
    //     </li>
    //   </ul>
    // </div>md:flex-col h-full md:items-center md:content-around
    <div className="bg-dark-blue flex p-5 md:grid md:h-full md:grid-rows-4">
      <div className="md:content-center ">
        <img src={logo} alt="" className="w-20 md:w-48 h-auto " />
      </div>
      <div className="flex md:flex-col text-center md:row-span-2 md:item">
        <NavLink
          to="/inicio"
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
          to="/agenda"
          // style={{ color: "tex" }}
          className={({ isActive }) =>
            isActive
              ? "bg-white text-dark-blue m-2 py-1 px-3 font-semibold text-2xl rounded-full"
              : "text-white m-2 py-1 px-3 font-bold text-2xl"
          }
        >
          Agenda
        </NavLink>
      </div>
      <div className="text-white  flex justify-center items-center">
        <div className="hover:bg-red-500 m-2 p-2 rounded-lg">
          <Link className="text-xl">
            <FontAwesomeIcon icon={faRightFromBracket} />
            {/* {` Salir`} */}
          </Link>
        </div>
      </div>
    </div>
  );
}
