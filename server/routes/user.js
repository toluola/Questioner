import express from "express";
import userController from "../controllers/user";
import Validate from "../helpers/validate";

const router = express.Router();

router.post("/signup", Validate.validateSignup, userController.signup);

export default router;