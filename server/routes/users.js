const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const {
  usersGet,
  usersGetOne,
  usersGetTeachers,
  usersGetTeachersPIE,
  usersGetTeachersAll,
  userPut,
  userDelete,
  userCreate,
  usersTeacherStats,
  usersGetByRole,
} = require("../controllers/users");

const { isValidRole, emailExist } = require("../helpers/db-validators");

const routerUsers = Router();

routerUsers.get("/", usersGet);

routerUsers.get("/teacher", usersGetTeachers);
routerUsers.get("/teacher/pie", usersGetTeachersPIE);
routerUsers.get("/teacher/all", usersGetTeachersAll);

routerUsers.get("/teacher/stats", usersTeacherStats);

routerUsers.get("/teacher/:role", usersGetByRole);

routerUsers.get(
  "/:id",
  [check("id", "Is not a valid MongoDB ID").isMongoId(), validateFields],
  usersGetOne
);

routerUsers.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("role").custom(isValidRole),
    check("email").custom(emailExist),
    validateFields,
  ],
  userCreate
);

routerUsers.put(
  "/update/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPut
);

routerUsers.put(
  "/delete/:id",
  [check("name", "El nombre es obligatorio").not().isEmpty(), validateFields],
  userDelete
);

module.exports = routerUsers;
