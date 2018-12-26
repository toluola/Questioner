import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from 'cors';
import meetupRoutes from './routes/meetups';


const PORT = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/meetups", meetupRoutes);

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