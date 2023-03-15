import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkRut } from "react-rut-formatter";
import moment from "moment";

//* Context
import LoginContext from "../context/Login/LoginContext";

export default function ScheduleAdmin() {
  const [user, setUser] = useState(null);
  const { userLogged } = useContext(LoginContext);

  const { id } = useParams();
  const showData = async () => {
    const userResp = await fetch(`http://localhost:3001/api/users/${id}`);
    const userData = await userResp.json();

    setUser(userData.user);
  };

  useEffect(() => {
    showData();
  }, []);

  const onSubmit = (values) => {
    const meetingSubmit = {
      idStudent: userLogged.id,
      idTeacher: user._id,
      nameTeacher: user.name,
      date: {
        start: startAux,
        end: endAux,
      },
      rut: values.rut,
      nameTutor: values.nameSolicited,
      status: "pending",
    };

    // console.log(meetingSubmit);

    fetch("http://localhost:3001/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingSubmit),
    }).then((response) => console.log(response));

    // console.log();
  };

  const validatesHours = (horaInicio, horaTermino) => {
    console.log(horaInicio, horaTermino);
    const horaInicioMoment = moment(horaInicio, "HH:mm", true);
    const horaTerminoMoment = moment(horaTermino, "HH:mm", true);

    if (horaTerminoMoment.isSame(horaInicioMoment)) {
      setError("end", {
        type: "manual",
        message: "La hora de inicio y termino no pueden ser iguales",
      });
    }

    if (horaTerminoMoment.isAfter(horaInicioMoment)) {
      setError(
        "end",
        "invalidTime",
        "La hora de termino debe ser posterior a la hora de inicio"
      );
    }

    if (horaInicioMoment.isBefore("08:00")) {
      setError(
        "start",
        "invalidTime",
        "La hora de inicio no debe ser anterior a las 08:00 hrs"
      );
    }

    if (horaInicioMoment.isBefore("08:00")) {
      setError(
        "end",
        "invalidTime",
        "La hora de inicio no debe ser anterior a las 08:00 hrs"
      );
    }

    return true;
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, setError },
  } = useForm({});

  return (
    <div>
      {user ? (
        <>
          <div className="pt-4">
            <h2 className="mx-2">
              <b>Agendando con docente: </b>
              {user.name}
            </h2>
          </div>
          <div className="h-full overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid p-2">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nombre de solicitante{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("nameSolicited", {
                      required: "El nombre es obligatorio.",
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                </div>
                {errors.nameSolicited && (
                  <p className="text-red-500">{errors.nameSolicited.message}</p>
                )}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    RUT{" "}
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("rut", {
                      validate: (value) => {
                        if (!value) {
                          return "El RUT es obligatorio";
                        } else if (!checkRut(value)) {
                          return "El RUT es invalido";
                        }
                      },
                    })}
                  />
                </div>
                {errors.rut && (
                  <p className="text-red-500">{errors.rut.message}</p>
                )}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("date", {
                      required: "La fecha es obligatorio",
                    })}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500">{errors.date.message}</p>
                )}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    id="start"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("start", {
                      required: "La hora de inicio es obligatorio",
                      validate: (value) => {
                        if (
                          moment(value, "HH:mm").isBefore(
                            moment("08:00", "HH:mm")
                          )
                        ) {
                          return "La hora de inicio no debe ser anterior a las 08:00 hrs";
                        }
                        if (
                          moment(value, "HH:mm").isAfter(
                            moment("18:00", "HH:mm")
                          )
                        ) {
                          return "La hora de inicio no debe ser posterior a las 18:00 hrs";
                        }
                      },
                    })}
                    min="08:00"
                    max="18:00"
                  />
                </div>
                {errors.start && (
                  <p className="text-red-500">{errors.start.message}</p>
                )}

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Hora Termino
                  </label>
                  <input
                    type="time"
                    name="end"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("end", {
                      required: "La hora de termino es obligatorio",
                      validate: (value) => {
                        if (
                          moment(value, "HH:mm").isAfter(
                            moment("18:00", "HH:mm")
                          )
                        ) {
                          return "La hora de termino no debe ser posterior a las 18:00 hrs";
                        }
                        if (
                          moment(value, "HH:mm").isBefore(
                            moment("08:00", "HH:mm")
                          )
                        ) {
                          return "La hora de termino no debe ser anterior a las 08:00 hrs";
                        }
                      },
                    })}
                  />
                  {errors.end && (
                    <p className="text-red-500">{errors.end.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Razón
                  </label>
                  <textarea
                    name="reason"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("reason")}
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 mb-2 grid mx-2 md:flex md:justify-evenly">
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Agendar
                </button>
                <button
                  type="reset"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}

// validate: (value) => {
//   if (
//     parseInt(value.slice(0, 2)) >= 18 &&
//     parseInt(value.slice(3, 5)) > 0
//   ) {
//     return "La hora de termino debe ser anterior a las 18:00 hrs ";
//   } else if (parseInt(value.slice(0, 2)) < 8) {
//     return "La hora de termino debe ser posterior a las 08:00 hrs";
//   }
// },

{
  /* <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
  <div className="flex flex-wrap -mx-3 mb-4  md:grid md:grid-flow-row">
    <div className="w-full px-3 mb-6 ">
      <label>Nombre</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Miguel"
        {...register("nameCreated", {
          required: "El nombre es obligatorio.",
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors.nameCreated && (
        <p className="text-red-500">{errors.nameCreated.message}</p>
      )}
    </div>
    <div className="w-full px-3 mb-6 ">
      <label>Correo</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email"
        placeholder="miguel@mail.com"
        {...register("emailCreated", {
          required: "El correo es obligatorio.",
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        })}
      />
      {errors.emailCreated && (
        <p className="text-red-500">{errors.emailCreated.message}</p>
      )}
    </div>
    <div className="w-full px-3 mb-6">
      <label>Rol</label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...register("roleCreated", {
          required: "El rol es obligatorio.",
        })}
        defaultValue=""
        onChange={handleChange}
      >
        <option value="">-- Seleccione un rol --</option>
        {roles?.map((role) => (
          <option value={role.role} key={role._id} className="odd:bg-gray-200">
            {showFilter(role.role)}
          </option>
        ))}
      </select>
      {errors.roleCreated && (
        <p className="text-red-500">{errors.roleCreated.message}</p>
      )}
    </div>

    <div className="mt-4 grid w-full">
      <button
        type="submit"
        className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Guardar
      </button>
      <button
        type="button"
        className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => {
          reset({
            nameCreated: "",
            emailCreated: "",
            roleCreated: "",
          });
        }}
      >
        Limpiar
      </button>
      <button
        type="button"
        className="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
        onClick={handleActive}
      >
        Cerrar
      </button>
    </div>
  </div>
</form>; */
}
