import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import meetupRoutes from "./routes/meetups";
import upcomingRoutes from "./routes/upcoming";
import questionRoutes from "./routes/question";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/meetups/upcomings", upcomingRoutes);
app.use("/api/v1/meetups", meetupRoutes);
app.use("/api/v1/questions", questionRoutes);

app.use((req, res, next) => {
	const error = new Error("Invalid URL");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
	next();
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
