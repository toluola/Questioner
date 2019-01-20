import express from "express";
import questionsController from "../controllers/questions";
import authRoute from "../helpers/authenticate";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
  "/",
  authRoute.verifyToken,
  Validate.validateQuestion,
  questionsController.createQuestion
);
router.get("/", authRoute.verifyToken, questionsController.getQuestions);
router.patch(
  "/:question_id/upvote",
  authRoute.verifyToken,
  questionsController.upvoteQuestion
);
router.patch(
  "/:question_id/downvote",
  authRoute.verifyToken,
  questionsController.downvoteQuestion
);

export default router;
