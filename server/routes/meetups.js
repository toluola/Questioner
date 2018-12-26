import express from "express";
import meetupsController from "../controllers/meetups";

const router = express.Router();

router.post("/", meetupsController.saveMeetup);

export default router;
