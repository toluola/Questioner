import express from "express";
import meetupsController from "../controllers/meetups";
import Authenticate from "../helpers/authenticate";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
	"/",
	Authenticate.checkAdmin,
	Validate.validateMeetups,
	meetupsController.saveMeetup
);
router.post(
	"/:id/rsvps",
	Validate.validateRes,
	Validate.validateRespond,
	meetupsController.saveResponse
);
router.get("/", meetupsController.getMeetups);
router.get("/:Id", meetupsController.getEachMeetup);

export default router;
