import { useState, useEffect } from "react";
import NavBarTeacherMobile from "./NavBarTeacherMobile";
import NavBarTeacherDesktop from "./NavBarTeacherDesktop";

export default function NavBarTeacher() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <NavBarTeacherMobile
          site1="/profesor"
          site2="/agenda_profesor"
          site3="/horarios"
        />
      ) : (
        <NavBarTeacherDesktop
          site1="/profesor"
          site2="/agenda_profesor"
          site3="/horarios"
        />
      )}
    </div>
  );
}

//   return (

//     <div className="bg-dark-blue flex p-5 md:grid md:h-full md:grid-rows-4">
//       <div className="md:content-center ">
//         <img src={logo} alt="" className="w-20 md:w-48 h-auto " />
//       </div>
//       <div className="flex md:flex-col text-center md:row-span-2 md:item">
//         <NavLink
//           to={site1}
//           style={{ color: "" }}
//           className={({ isActive }) =>
//             isActive
//               ? "bg-white text-dark-blue m-2  py-1 px-3 font-semibold text-2xl rounded-full"
//               : "text-white m-2 py-1 px-3 font-bold text-2xl"
//           }
//         >
//           Inicio
//         </NavLink>
//         <NavLink
//           to={site2}
//           // style={{ color: "tex" }}
//           className={({ isActive }) =>
//             isActive
//               ? "bg-white text-dark-blue m-2 py-1 px-3 font-semibold text-2xl rounded-full"
//               : "text-white m-2 py-1 px-3 font-bold text-2xl"
//           }
//         >
//           Agenda
//         </NavLink>
//       </div>
//       <div className="text-white  flex justify-center items-center">
//         <div className="hover:bg-red-500 m-2 p-2 rounded-lg">
//           <Link className="text-xl" onClick={LogOut}>
//             <FontAwesomeIcon icon={faRightFromBracket} />
//             {/* {` Salir`} */}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
