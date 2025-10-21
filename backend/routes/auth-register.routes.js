const express = require("express");
const router = express.Router();
const { createNewUser } = require("../controllers/registration.controller");

router.post("/create-account", createNewUser);

module.exports = router;
