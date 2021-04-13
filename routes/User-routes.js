const express = require("express");
const router = express.Router();

const { LoginView, DeshBoard } = require("../controllers/userController");

router.get("/", LoginView);

module.exports = {
  routes: router,
};
