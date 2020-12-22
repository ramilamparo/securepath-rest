import { Handler } from "express";
import { SecurePath } from "securepath-api";
import { baseUrl } from "../config/securepath";
import { ResponseBuilder } from "../utils";

export const requireLogin: Handler = async (req, res, next) => {
	const response = new ResponseBuilder<null>(null);
	try {
		const sp = await SecurePath.useCookie(
			`PHPSESSID=${req.cookies.PHPSESSID}`,
			{
				baseUrl
			}
		);
		req.user = sp;
		return next();
	} catch (e) {
		response.handleExpressError(e, res);
	}
	return res.json(response.toObject());
};
