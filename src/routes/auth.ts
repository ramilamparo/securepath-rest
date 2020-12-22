import express from "express";
import { SecurePath } from "securepath-api";
import { baseUrl } from "../config/securepath";
import { ResponseBuilder } from "../utils";

export const router = express.Router();

export interface LoginServerParams {
	username: string;
	password: string;
}

export interface LoginServerResponse {}

router.post<{}, LoginServerResponse, LoginServerParams>(
	"login",
	async (req, res) => {
		const response = new ResponseBuilder();

		try {
			const session = await SecurePath.login(
				req.body.username,
				req.body.password,
				{
					baseUrl
				}
			);

			response.handleExpressSuccess("Successfully logged in!", res);
			res.json(response.toObject).setHeader("set-cookie", session.authCookie);
		} catch (e) {
			response.handleExpressError(e, res);
		}
	}
);

export default router;
