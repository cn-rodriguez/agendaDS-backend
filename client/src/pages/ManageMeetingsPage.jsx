import { useNavigate, useParams } from "react-router-dom";

import ManageMeetingsAdmin from "../components/ManageMeetingsAdmin";
import NavBarAdmin from "../components/navBar/NavBarAdmin";

export default function ManageMeetingsPage() {
  const params = useParams();
  console.log(params);

  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2">
      <div className="col-span-2">
        <NavBarAdmin site1="/directora" site2="/usuarios" />
      </div>
      <div className="bg-grey-bg col-span-8 rounded-3xl m-1 h-auto">
        <h1 className="font-bold text-2xl md:text-4xl m-2 md:m-5 lg:m-8 pt-4">
          Manejar reuniones
        </h1>
        <div className="m-3 md:m-5 lg:m-10 md:h-3/4 ">
          <ManageMeetingsAdmin />
        </div>
      </div>
    </div>
  );
}
