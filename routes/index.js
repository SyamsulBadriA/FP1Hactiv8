const express = require("express");
const CrudController = require("../controller/user");
const xaccestoken = require("../middleware/x-acces-token");
const router = express.Router();

router.post("/login", CrudController.loginaja);
router.post("/register", CrudController.register);
router.use(xaccestoken);
router.post("/reflections", CrudController.reflectionCreate);
router.get("/reflections", CrudController.reflectionData);
router.put("/reflections/:id", CrudController.reflectionUpdate);
router.get("/reflections/:id", CrudController.reflectionId);
router.delete("/reflections/:id", CrudController.reflectionDelete);

module.exports = router;
