import express from "express";
import commentsController from "../controllers/comment";
import authRoute from "../helpers/authenticate";
import middleware from "../middlewares/comment";

const router = express.Router();

router.post(
  "/",
  authRoute.verifyToken,
  middleware.checkComment,
  middleware.checkQuestionIdExist,
  commentsController.createComment
);

router.get("/", authRoute.verifyToken, commentsController.fetchComments);

export default router;
