import express from "express";
import userController from "../controllers/user";
import validate from "../helpers/helpers"

const router = express.Router();

router.post("/signup", validate.validateSignup, userController.signup);
router.post("/login", validate.validateLogin, userController.login);

export default router;