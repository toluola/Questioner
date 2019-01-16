import express from "express";
import meetupsController from "../controllers/meetups";
import authRoute from "../helpers/authenticate";
import Validate from "../helpers/validate";

const router = express.Router();

router.post(
  "/",
  authRoute.verifyTokenAdmin,
  Validate.validateMeetups,
  meetupsController.createMeetup
);
router.post(
  "/:meetup_id/rsvps",
  authRoute.verifyToken,
  Validate.validateRes,
  meetupsController.createMeetupResponse
);

router.get(
  "/upcomings",
  authRoute.verifyToken,
  meetupsController.getUpcomingMeetups
);
router.delete(
  "/:id",
  authRoute.verifyTokenAdmin,
  meetupsController.deleteMeetup
);
router.get("/", authRoute.verifyToken, meetupsController.getMeetups);
router.get("/:id", authRoute.verifyToken, meetupsController.getEachMeetup);

export default router;
