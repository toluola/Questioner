import express from "express";
import UserController from "../controllers/user";
import Validate from "../helpers/validate";
import helpers from "../helpers/helpers";

const router = express.Router();

router.post(
  "/signup",
  Validate.validateSignup,
  Validate.CheckMailExist,
  UserController.signup
);
router.post("/login", helpers.validateLogin, UserController.login);

export default router;
