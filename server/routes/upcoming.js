import express from "express";
import meetupsController from "../controllers/meetups";

const router = express.Router();

router.get("/", meetupsController.getUpcoming);

export default router;