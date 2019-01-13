import express from "express";
import questionsController from "../controllers/questions";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
	"/",
	Validate.validateComment,
	questionsController.createQuestionComment
);

export default router;
