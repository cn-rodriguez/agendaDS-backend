import { useParams } from "react-router-dom";
import AttentionSchedule from "../../components/attentionSchedule/AttentionSchedule";

import NavBar from "./../../components/navBar/NavBar";

export default function SelectSchedulePage() {
  const params = useParams();

  return (
    <div className="bg-dark-blue md:grid md:grid-cols-10 h-screen p-2 m-1">
      <div className="col-span-2">
        <NavBar />
      </div>
      <div className="bg-white col-span-8 rounded-3xl m-1 {}">
        <div>
          <AttentionSchedule />
        </div>
      </div>
    </div>
  );
}
