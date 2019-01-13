import express from "express";
import questionsController from "../controllers/questions";
import Validate from "../helpers/validate";

const router = express.Router();

router.post("/", Validate.validateQuestion, questionsController.createQuestion);
router.get("/", questionsController.getQuestions);
router.patch("/:question_id/upvote", questionsController.upvoteQuestion);
router.patch("/:question_id/downvote", questionsController.downvoteQuestion);

export default router;
