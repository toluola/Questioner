import express from "express";
import meetupsController from "../controllers/meetups";
import authRoute from "../helpers/authenticate";
import validateMeetup from "../middlewares/meetup";

const router = express.Router();

router.post(
  "/",
  authRoute.verifyTokenAdmin,
  validateMeetup.validateMeetupRequest,
  meetupsController.createMeetup
);
router.get("/", authRoute.verifyToken, meetupsController.viewMeetups);
router.get("/:id", authRoute.verifyToken, meetupsController.viewSingleMeetup);
router.delete(
  "/:id",
  authRoute.verifyTokenAdmin,
  meetupsController.deleteMeetup
);

export default router;
