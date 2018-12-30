import express from "express";
import meetupsController from "../controllers/meetups";
import Validate from "../helpers/validate";

const router = express.Router();

router.get("/", meetupsController.getUpcoming);

export default router;