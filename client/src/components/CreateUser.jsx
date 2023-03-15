import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateUser() {
  const [active, setActive] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [roles, setRoles] = useState(false);
  const [roleSelected, setRoleSelected] = useState("");

  const MySwal = withReactContent(Swal);

  const showAlertCreate = () => {
    MySwal.fire({
      title: <p>Creando Usuario</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    })
      .then(() => {
        return MySwal.fire({
          title: <p>Usuario Creado</p>,
          text: "Ha creado correctamente el usuario",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 3000,
        });
      })
      .then(
        setTimeout(() => {
          location.reload();
        }, 3500)
      );
  };

  const showAlertError = (resp) => {
    const messages = resp.map((error) => error.msg);
    MySwal.fire({
      title: <p>Creando Usuario</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    })
      .then(() => {
        return MySwal.fire({
          title: <p>Ha ocurrido un error</p>,
          text: messages,
          icon: "error",
          confirmButtonText: "Ok",
          timer: 3000,
        });
      })
      .then(
        setTimeout(() => {
          location.reload();
        }, 3500)
      );
  };

  const showFilter = (role) => {
    switch (role) {
      case "ADMIN_ROLE":
        return "Administrador";
      case "TEACHER_ROLE":
        return "Profesor";
      case "TEACHER_PIE_ROLE":
        return "Profesor P.I.E";
      case "STUDENT_ROLE":
        return "Estudiante";
      case "RECEPTION_ROLE":
        return "Recepción";
      default:
        return null;
    }
  };

  const handleActive = () => {
    setActive(!active);
  };

  const handleChange = (event) => {
    setRoleSelected(event.target.value);
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, setError },
  } = useForm({
    validate: (data) => {
      if (data.roleCreated == "") {
        setError("roleCreated", {
          type: "manual",
          message: "Debe elegir un rol",
        });
      } else {
        return true;
      }
    },
  });

  const getRoles = async () => {
    const respRoles = await fetch("http://localhost:3001/api/roles");
    const dataRoles = await respRoles.json();

    await setRoles(dataRoles);
  };

  useEffect(() => {
    getRoles();
  }, []);

  const onSubmit = async (values) => {
    const user = {
      name: values.nameCreated,
      email: values.emailCreated,
      role: values.roleCreated,
    };

    const response = await fetch("http://localhost:3001/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    data.errors ? showAlertError(data.errors) : showAlertCreate();
    // console.log(values, errors);
    // console.log({ ...info, details: values });
    // const meet = {
    //   idStudent: info.userLoggedId,
    //   idTeacher: info.teacherId,
    //   nameTeacher: info.teacherName,
    //   date: info.date,
    //   rut: values.rut,
    //   nameTutor: `${values.name} ${values.lastName}`,
    //   reason: values.reason,
    //   status: "pending",
    // };
    // console.log(meet, errors);
    // fetch("http://localhost:3001/api/meetings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(meet),
    // }).then(showAlert());
    // navigate("/inicio");
    // console.log(data);
  };

  return (
    <>
      {!active ? (
        <>
          <div className="bg-white mt-4 md:mt-0 p-4 rounded-md shadow-lg">
            <div className="m-2">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleActive}
              >
                Crear nuevo usuario
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white mt-4 p-4 rounded-md shadow-lg md:mt-0 flex justify-center ">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg"
            >
              <div className="flex flex-wrap -mx-3 mb-6  md:grid md:grid-flow-row">
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
                    <p className="text-red-500">
                      {errors.emailCreated.message}
                    </p>
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
                      <option
                        value={role.role}
                        key={role._id}
                        className="odd:bg-gray-200"
                      >
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
            </form>
          </div>
        </>
      )}
    </>
  );
}
