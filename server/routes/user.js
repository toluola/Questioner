import express from "express";
import userController from "../controllers/user";
<<<<<<< HEAD
import Validate from "../helpers/validate";

const router = express.Router();

router.post("/signup", Validate.validateSignup, userController.signup);
=======
import validate from "../helpers/helpers"

const router = express.Router();

router.post("/signup", validate.validateSignup, userController.signup);
router.post("/login", validate.validateLogin, userController.login);

>>>>>>> 871d75ce260b2988cdd05d011987bcd656d7243c

export default router;