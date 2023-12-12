const { Router } = require("express");

const UsersControllers = require("../controllers/UsersController");
const UsersValidatedController = require("../controllers/UsersValidatedController");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');


const usersRoutes = Router();

const usersController = new UsersControllers();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);

module.exports = usersRoutes;
