import express from "express";
import questionsController from "../controllers/questions";

const router = express.Router();

router.post("/", questionsController.saveQuestion);


export default router;