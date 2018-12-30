import express from "express";
import questionsController from "../controllers/questions";
import Validate from "../helpers/validate";

const router = express.Router();

router.post("/", Validate.validateMeetups, questionsController.saveQuestion);
router.patch("/:id/upvote", questionsController.questionUpvote);
router.patch("/:id/downvote", questionsController.questionDownvote);


export default router;