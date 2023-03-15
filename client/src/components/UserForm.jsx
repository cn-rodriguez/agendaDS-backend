import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function UserForm({ user, users }) {
  const userDefault = user;
  const [inputValue, setInputValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userUpdated, setUserUpdated] = useState();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  //  * Manejar valores de input
  // const [nameChange, setNameChange] = useState(initialValues.name);
  // const [emailChange, setEmailChange] = useState(initialValues.email);

  // const [selectedRole, setSelectedRole] = useState(user.role);
  // const [selectedStatus, setSelectedStatus] = useState(user.status);

  const MySwal = withReactContent(Swal);

  const showAlertUpdate = () => {
    MySwal.fire({
      title: <p>Modificando Usuario</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    })
      .then(() => {
        return MySwal.fire({
          title: <p>Usuario Modificado</p>,
          text: "Ha modificado correctamente el usuario",
          icon: "success",
          confirmButtonText: "Cool",
          timer: 3000,
        });
      })
      .then(
        setTimeout(() => {
          location.reload();
        }, 2500)
      )
      .catch(() => {
        return MySwal.fire({
          title: <p>Ha ocurrido un error</p>,
          text: "Intente nuevamente",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 3000,
        });
      });
  };

  const showAlertDeactivate = () => {
    MySwal.fire({
      title: <p>Desactivando Usuario</p>,
      icon: "question",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    })
      .then(() => {
        return MySwal.fire({
          title: <p>Usuario desactivado</p>,
          text: "Ha desactivado correctamente el usuario",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 3000,
        });
      })
      .then(
        setTimeout(() => {
          location.reload();
        }, 2500)
      )
      .catch(() => {
        return MySwal.fire({
          title: <p>Ha ocurrido un error</p>,
          text: "Intente nuevamente",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 3000,
        });
      });
  };

  const isEditing = () => {
    setEditing(!editing);
  };

  const open = () => {
    setClicked(!clicked);
    // setEditing(!editing);
  };

  //   const handleNameChange = (event) => {
  //     setNameChange(event.target.value);
  //   };

  //   const handleEmailChange = (event) => {
  //     setEmailChange(event.target.value);
  //   };

  //   const handleChange = (event) => {
  //     setInputValue(event.target.value);
  //   };

  //   const handleSelectRole = (event) => {
  //     setSelectedRole(event.target.value);
  //   };

  //   const handleSelectStatus = (event) => {
  //     setSelectedStatus(event.target.value);
  //   };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };

  const handleReset = async () => {
    // setNameChange(initialValues.nombre);
    // setEmailChange(initialValues.correo);
    await setInitialValues(userDefault);
    await setEditing(!editing);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:3001/api/users/update/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(initialValues),
      headers: { "Content-Type": "application/json" },
    }).then(showAlertUpdate());
    //   .then((showEvent.meet = null));

    // console.log(initialValues);
  };

  const deactivateUser = async () => {
    await fetch(
      `http://localhost:3001/api/users/delete/${initialValues._id}}`,
      {
        method: "PUT",
        body: JSON.stringify({ _id: initialValues._id }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(showAlertDeactivate());
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid grid-flow-col grid-cols-4 bg-gray-100 my-1 rounded-sm">
          <label className="col-span-1 ml-1.5">Nombre:</label>

          <input
            className="bg-inherit col-span-4 rounded-sm"
            type="text"
            readOnly={!editing}
            disabled={!editing}
            value={initialValues.name}
            onChange={handleInputChange}
            name="name"
            id="name"
          />
        </div>
        <div className="grid grid-flow-col grid-cols-4 bg-gray-100 my-1 rounded-sm">
          <label className="col-span-1 ml-1.5">Correo: </label>
          <input
            className="bg-inherit col-span-4"
            type="email"
            readOnly={!editing}
            value={initialValues.email}
            disabled={!editing}
            name="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-flow-col grid-cols-4 bg-gray-100 my-1 rounded-sm">
          <label htmlFor="role" className="col-span-1 ml-1.5">
            Rol:
          </label>
          <select
            name="role"
            id="role"
            value={initialValues.role}
            onChange={handleInputChange}
            readOnly={!editing}
            disabled={!editing}
            className="bg-inherit disabled:opacity-100 col-span-4"
          >
            <option value="STUDENT_ROLE">Estudiante</option>
            <option value="TEACHER_ROLE">Profesor</option>
            <option value="TEACHER_PIE_ROLE">P.I.E</option>
            <option value="ADMIN_ROLE">Administrador</option>
            <option value="RECEPTION_ROLE">Recepción</option>
          </select>
        </div>
        <div className="grid grid-flow-col grid-cols-4 bg-gray-100 my-1 rounded-sm">
          <label className="col-span-1 ml-1.5">Estado: </label>

          <select
            name="status"
            id="status"
            value={initialValues.status}
            onChange={handleInputChange}
            readOnly={!editing}
            disabled={!editing}
            className="bg-inherit disabled:opacity-100 col-span-4"
          >
            <option value={true}>Habilitado</option>
            <option value={false}>Deshabilitado</option>
          </select>
        </div>

        {editing ? (
          <div className="grid grid-flow-row grid-cols-2">
            <button
              type="submit"
              className="bg-green-400 border-2 border-[#242331] rounded-md w-4/5"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-400 border-2 border-[#242331] rounded-md"
            >
              Cancelar
            </button>
          </div>
        ) : null}
      </form>
      <div className="flex justify-end">
        <button onClick={open}>
          {clicked ? (
            <>
              <FontAwesomeIcon icon={faCaretUp} />
            </>
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </button>
      </div>

      {clicked ? (
        <div className="grid grid-flow-row grid-cols-2">
          <button
            onClick={isEditing}
            key={user._id}
            className="bg-yellow-400 border-2 border-[#242331] rounded-md w-4/5"
          >
            Editar usuario
          </button>
          <button
            className="bg-red-400 border-2 border-[#242331] rounded-md"
            onClick={deactivateUser}
          >
            Desactivar usuario
          </button>
        </div>
      ) : null}
    </>
  );
}
