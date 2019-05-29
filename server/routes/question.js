import express from "express";
import questionsController from "../controllers/questions";
import authRoute from "../helpers/authenticate";
import middleware from "../middlewares/question";
import validate from "../helpers/validate";

const router = express.Router();

router.post(
  "/:meetupId",
  authRoute.verifyToken,
  questionsController.createQuestion
);
router.get(
  "/:meetupId",
  authRoute.verifyToken,
  questionsController.fetchMeetupQuestions
);

router.patch(
  "/upvote/:id",
  authRoute.verifyToken,
  middleware.checkQuestionIdExist,
  questionsController.upvoteQuestion
);

router.patch(
  "/downvote/:id",
  authRoute.verifyToken,
  middleware.checkQuestionIdExist,
  questionsController.downvoteQuestion
);


export default router;
