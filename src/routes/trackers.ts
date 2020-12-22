import express from "express";
import { TrackerData } from "securepath-api";
import { requireLogin } from "../middlewares/requireLogin";
import { ResponseBuilder, ServerResponse } from "../utils";

const router = express.Router();

export interface TrackerItem {
	name: string;
	imei: string;
	sim: string;
	trackerId: string;
	lat?: number;
	lng?: number;
}

export type TrackersGetAllServerResponse = ServerResponse<TrackerItem[]>;

router.get<{}, TrackersGetAllServerResponse | ServerResponse<null>, {}>(
	"/",
	requireLogin,
	async (req, res) => {
		const response = new ResponseBuilder<TrackerItem[] | null>(null);
		try {
			if (req.user) {
				const trackers = await req.user.Live.getTrackers();
				const responseData: TrackerItem[] = trackers.map(tracker => {
					return {
						name: tracker.trackerName,
						imei: tracker.imei,
						sim: tracker.simNo,
						trackerId: tracker.trackerId,
						lat: tracker.latitude,
						lng: tracker.longitude
					};
				});
				response.setData(responseData);
				response.handleExpressSuccess(
					`Found ${responseData.length} trackers`,
					res
				);
			}
		} catch (e) {
			response.handleExpressError(e, res);
		}
		res.json(response.toObject());
	}
);

export default router;
