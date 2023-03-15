import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function InfoMeeting({ showEvent }) {
  const [meeting, setMeeting] = useState({});
  const [reason, setReason] = useState("No hay motivo registrado");
  const [pressed, setPressed] = useState();
  // console.log(showEvent);

  const MySwal = withReactContent(Swal);

  const showAlert = (pressed) => {
    MySwal.fire({
      title: <p>Cambiando estado</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    })
      .then(() => {
        if (pressed === "completed") {
          return MySwal.fire({
            title: <p>Completada</p>,
            text: "Ha completado la reunion",
            icon: "success",
            confirmButtonText: "Cool",
            timer: 3000,
          });
        } else if (pressed === "pending") {
          return MySwal.fire({
            title: <p>Pendiente</p>,
            text: "Ha dejado pendiente la reunion",
            icon: "info",
            confirmButtonText: "Ok",
            timer: 3000,
          });
        } else if (pressed === "canceled") {
          return MySwal.fire({
            title: <p>Cancelado</p>,
            text: "Ha cancelado la reunion",
            icon: "error",
            confirmButtonText: "Cool",
            timer: 3000,
          });
        }
      })
      .catch(() => {
        return MySwal.fire({
          title: <p>Error</p>,
          text: "Ha ocurrido un error inesperado",
          icon: "error",
          confirmButtonText: "Regresar",
          timer: 3000,
        });
      });
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (showEvent) {
      const { meet } = showEvent;
      if (meet !== null) {
        setMeeting(meet);
        if (meet.extendedProps.hasOwnProperty("reason")) {
          setReason(meet.extendedProps.reason);
        } else {
          setReason("No hay motivo registrado");
        }
      }
      // fetch();
    }
  });

  const press = (event) => {
    setPressed(event.target.name);
  };

  const onSubmit = (values) => {
    const meetId = meeting.publicId;

    const statusToChange = {
      id: meeting.publicId,
      status: pressed,
    };
    fetch(`http://localhost:3001/api/meetings/${meetId}`, {
      method: "PUT",
      body: JSON.stringify(statusToChange),
      headers: { "Content-Type": "application/json" },
    })
      .then(showAlert(pressed))
      .then((showEvent.meet = null));
  };

  return (
    <>
      {showEvent?.meet === null ? (
        <div className="my-2">
          <p className="text-lg">No hay reunion seleccionada</p>
        </div>
      ) : (
        <div>
          {/* <form action="">
          <p>{JSON.stringify(showEvent)}</p>
        </form> */}
          <form
            className="rounded-md text-sm px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="hidden">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Hidden
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  // placeholder="Diego"
                  value={meeting.publicId}
                  {...register("id")}
                  // disabled={disable}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nombre Tutor
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  // placeholder="Diego"
                  value={meeting.title}
                  {...register("name")}
                  // disabled={disable}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Rut
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={meeting.extendedProps?.rut}
                  {...register("rut")}
                  // disabled={disable}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Motivo
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={reason}
                  {...register("reason")}
                  // disabled={disable}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>

            <div className="flex items-center justify-evenly md:flex-col">
              <button
                className="inline-block align-baseline font-bold text-sm bg-yellow-400 hover:text-gray-50 rounded outline-8 hover:bg-yellow-300 py-2 px-4 text-gray-300 hover:outline hover:outline-2 hover:outline-offset-2 hover:border-indigo-500"
                type="submit"
                onClick={press}
                {...register("pending")}
              >
                Pendiente
              </button>

              <button
                className="inline-block align-baseline font-bold text-sm  bg-red-500 hover:text-white rounded outline-8 hover:bg-red-600 py-2 px-4 text-white"
                type="submit"
                onClick={press}
                {...register("canceled")}
              >
                Cancelar
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={press}
                {...register("completed")}

                // disabled={disable}
              >
                Completar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
