import express from "express";
import { tracker as trackerRoutes } from "./routes";

const app = express();

app.use(trackerRoutes, "/trackers");

app.listen(3000, () => {
	console.log("Running on port 3000!");
});
