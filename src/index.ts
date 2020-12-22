import env from "dotenv";
env.config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import trackerRoutes from "./routes/trackers";

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/securepath/auth", authRoutes);
app.use("/api/securepath/trackers", trackerRoutes);

app.listen(3000, () => {
	console.log("Running on port 3000!");
});
