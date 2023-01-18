const { Router } = require("express");
const { googleSignIn } = require("../controllers/auth");
// import googleSignIn from "../controllers/auth";

const routerAuth = Router();

routerAuth.post("/google", googleSignIn);

module.exports = routerAuth;
