import express from "express";
import questionsController from "../controllers/questions";

const router = express.Router();

router.post("/", questionsController.saveQuestion);
router.patch("/:id/upvote", questionsController.questionUpvote);
router.patch("/:id/downvote", questionsController.questionDownvote);


export default router;