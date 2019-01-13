import express from "express";
import meetupsController from "../controllers/meetups";
import Authenticate from "../helpers/authenticate";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
	"/",
	Authenticate.checkAdmin,
	Validate.validateMeetups,
	meetupsController.createMeetup
);
router.post(
	"/:meetup_id/rsvps",
	Validate.validateRes,
	meetupsController.createMeetupResponse
);

router.get(
	"/upcomings",
	// Validate.validateUpcomings,
	meetupsController.getUpcomingMeetups
);
router.delete("/:id", meetupsController.deleteMeetup);
router.get("/", meetupsController.getMeetups);
router.get("/:id", meetupsController.getEachMeetup);

export default router;
