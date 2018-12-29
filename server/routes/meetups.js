import express from "express";
import meetupsController from "../controllers/meetups";
import Authenticate from "../helpers/authenticate";

const router = express.Router();

router.post("/", Authenticate.checkAdmin, meetupsController.saveMeetup);
router.post("/:id/rsvps", meetupsController.saveResponse);
router.get("/", meetupsController.getMeetups);
router.get("/:Id", meetupsController.getEachMeetup);


export default router;
