const express = require("express");
const router = express.Router();
const { LoginController } = require("../controllers/UserControllers");

router.post("/login", LoginController);

module.exports = router;
