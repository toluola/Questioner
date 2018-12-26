import express from "express";
import meetupsController from "../controllers/meetups";

const router = express.Router();

router.post("/", meetupsController.saveMeetup);
router.get("/", meetupsController.getMeetups);
router.get("/:Id", meetupsController.getEachMeetup);

export default router;
