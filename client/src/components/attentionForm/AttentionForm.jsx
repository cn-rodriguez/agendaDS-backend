import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkRut } from "react-rut-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// TODO: Get date an hour from calendar and add to form
// TODO: Enable form when a date is selected and disable when is not
// TODO: Fix responsive design
export default function AttentionForm({ saveEvent, disable }) {
  const [info, setInfo] = useState("");
  useEffect(() => {
    // console.log(typeof saveEvent.meet.date.start);
    // console.log(JSON.stringify(saveEvent.meet.date.start));
    setInfo(saveEvent.meet);
  }, [saveEvent.meet]);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const showAlert = () => {
    MySwal.fire({
      title: <p>Agendando</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    }).then(() => {
      return MySwal.fire({
        title: <p>Completado</p>,
        text: "Ha agendado su hora correctamente",
        icon: "success",
        confirmButtonText: "Cool",
        timer: 3000,
      });
    });
    navigate("/inicio");
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    // console.log(values, errors);
    // console.log({ ...info, details: values });
    const meet = {
      idStudent: info.userLoggedId,
      idTeacher: info.teacherId,
      nameTeacher: info.teacherName,
      date: info.date,
      rut: values.rut,
      nameTutor: `${values.name} ${values.lastName}`,
      reason: values.reason,
      status: "pending",
    };
    console.log(meet, errors);

    fetch("http://localhost:3001/api/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meet),
    }).then(showAlert());

    // navigate("/inicio");
  };

  return (
    // <div>
    //   <p> {saveEvent ? JSON.stringify(saveEvent.meet.date.start) : "No Existe"}</p>
    // </div>
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md mt-5">
      <form
        className="rounded-md text-sm px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Nombre
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Diego"
              {...register("name", {
                required: "El nombre es obligatorio.",
                pattern: /^[A-Za-z]+$/i,
              })}
              disabled={disable}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Apellido
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Marambio"
              {...register("lastName", {
                required: "El apellido es obligatorio",
                pattern: /^[A-Za-z]+$/i,
              })}
              disabled={disable}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Rut
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="rut"
              placeholder="12345678-9"
              {...register("rut", {
                validate: (value) => {
                  if (!value) {
                    return "El RUT es obligatorio";
                  } else if (!checkRut(value)) {
                    return "El RUT es invalido";
                  }
                },
              })}
              disabled={disable}
            />
            {errors.rut && <p className="text-red-500">{errors.rut.message}</p>}
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Motivo
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-auto"
              type="textarea"
              placeholder="Cual es el motivo de su reunion"
              {...register("reason")}
              rows="4"
              disabled={disable}
            />
          </label>
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-white rounded outline-8 hover:bg-red-500 py-2 px-4"
            type="reset"
            disabled={disable}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={disable}
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
}
