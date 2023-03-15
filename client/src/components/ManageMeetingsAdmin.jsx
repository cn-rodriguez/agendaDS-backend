import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoMeetManager from "./InfoMeetManager";

const values = ["agenda", "historial", "horario"];

export default function ManageMeetingsAdmin() {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState("agenda");

  const isPressed = (event) => {
    setPressed(event.target.value);
    const notPressed = values.filter((item) => item !== event.target.value);

    const selected = document.getElementById(event.target.value);
    selected.classList.add("bg-white", "text-dark-blue", "col-span-2");

    selected.classList.remove("bg-dark-blue", "text-white", "col-span-1");

    for (let i = 0; i < notPressed.length; i++) {
      const notSelected = document.getElementById(notPressed[i]);

      notSelected.classList.add("bg-dark-blue", "text-white", "col-span-1");
      notSelected.classList.remove("bg-white", "text-dark-blue", "col-span-2");
    }
  };

  return (
    <div className="pb-2">
      <button
        onClick={() => {
          navigate("../reuniones");
        }}
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Volver
      </button>

      <div className="shadow-lg">
        <div className="bg-dark-blue rounded-t-lg">
          <div className="grid grid-flow-col text-white h-14 ">
            <button
              id="agenda"
              value="agenda"
              onClick={isPressed}
              className="col-span-1 hover:bg-white hover:text-black rounded-tl-lg border-dark-blue border-2"
            >
              Agendar
            </button>
            <button
              id="historial"
              value="historial"
              onClick={isPressed}
              className="col-span-1 hover:bg-white hover:text-black border-dark-blue border-2"
            >
              Historial
            </button>
            <button
              id="horario"
              value="horario"
              onClick={isPressed}
              className="col-span-1 hover:bg-white hover:text-black rounded-tr-lg border-dark-blue border-2"
            >
              Horarios
            </button>
          </div>
        </div>
      </div>
      <div>
        <InfoMeetManager info={pressed} />
      </div>
    </div>
  );
}
