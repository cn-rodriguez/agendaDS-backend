import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/Imagen1.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";

//* NavBar component
NavBarAdminDesktop;
import NavBarAdminDesktop from "./NavBarAdminDesktop";
import NavBarAdminMobile from "./NavBarAdminMobile";

export default function NavBarAdmin() {
  // async function LogOut() {
  //   console.log(google.accounts.id);
  //   google.accounts.id.disableAutoSelect();
  //   google.accounts.id.revoke(localStorage.getItem("session"), (done) => {
  //     localStorage.clear();
  //     location.reload();
  //   });
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
        <NavBarAdminMobile
          site1="/directora"
          site2="/agenda_directora"
          site3="/usuarios"
          site4="/reuniones"
        />
      ) : (
        <NavBarAdminDesktop
          site1="/directora"
          site2="/agenda_directora"
          site3="/usuarios"
          site4="/reuniones"
        />
      )}
    </div>
  );
}

// <div className="bg-dark-blue p-5 grid grid-cols-3 md:h-full  md:grid-rows-4">
//   <div className="sm:col-span-1 md:content-center ">
//     <img src={logo} alt="" className="w-20 md:w-48 h-auto " />
//   </div>
//   <div className="col-start-3 col-span-1 grid justify-items-end">
//     <button onClick={toggleMenu}>
//       <FontAwesomeIcon icon={faBars} className="h-2/4" />
//     </button>
//   </div>
//   <DropdownMenu toggleMenu={showMenu} site1={site1} site2={site2} />
// </div>
