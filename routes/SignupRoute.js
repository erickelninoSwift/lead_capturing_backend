const express = require("express");
const { SignupController } = require("../controllers/UserControllers");
const router = express.Router();

router.post("/signup", SignupController);

module.exports = router;
