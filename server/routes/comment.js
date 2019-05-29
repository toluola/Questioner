import express from "express";
import commentsController from "../controllers/comment";
import authRoute from "../helpers/authenticate";
import middleware from "../middlewares/comment";

const router = express.Router();

router.post(
  "/:questionId",
  authRoute.verifyToken,
  commentsController.createComment
);

router.get("/:questionId", authRoute.verifyToken, commentsController.fetchComments);

export default router;
