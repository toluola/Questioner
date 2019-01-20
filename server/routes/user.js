import express from "express";
import UserController from "../controllers/user";
import validate from "../helpers/helpers";

const router = express.Router();

router.post("/signup", validate.validateSignup, UserController.signup);
router.post("/login", validate.validateLogin, UserController.login);

export default router;
