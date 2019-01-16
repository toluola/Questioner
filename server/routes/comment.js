import express from "express";
import questionsController from "../controllers/questions";
import authRoute from "../helpers/authenticate";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
  "/",
  authRoute.verifyToken,
  Validate.validateComment,
  questionsController.createQuestionComment
);

export default router;
