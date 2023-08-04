const {registrerAdmin,login__controller, login__controller_web} = require("../Controllers/AdminController");
const router = require("express").Router();
router.post("/register-admin" ,registrerAdmin)
router.post("/login",login__controller)
router.post("/loginW",login__controller_web)
module.exports = router;
