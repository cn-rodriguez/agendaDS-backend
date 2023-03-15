import { useState } from "react";

export default function InfoScheduleAdmin({ dia, datos }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="p-2 ">
      <div className="border shadow-lg rounded-lg">
        <div className="bg-gray-700 text-white rounded-lg ">
          <div className="p-2 flex justify-between">
            <h2>{dia}</h2>
            <button
              onClick={handleOpen}
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Abrir
            </button>
          </div>
        </div>
        {open && (
          <div>
            {datos.length === 0 ? (
              <div className="flex justify-between bg-white border-b mx-2">
                <p className="font-semibold">No se han encontrado registros</p>
              </div>
            ) : null}
            {datos.map((elemento, index) => (
              <div
                key={index}
                className="flex justify-between bg-white border-b mx-2"
              >
                <p className="font-semibold">Horario</p>
                <p className="font-semibold">
                  Hora Inicio: {elemento.time.start}
                </p>
                <p className="font-semibold">
                  Hora Termino: {elemento.time.end}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
