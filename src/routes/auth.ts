import express from "express";
import axios from "axios";
import md5 from "md5-hex";
import qs from "querystring";
import { Response, AxiosHelpers } from "../utils";

export const auth = express.Router();

auth.post("login", async (req, res) => {
	const api = axios.create({ withCredentials: true });

	const seed = await api(
		"http://securepath.atsuae.net/php/getpage.php?mode=login&fx=getSeed",
		{
			method: "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
	);

	api.defaults.headers.Cookie = seed.headers["set-cookie"][0];

	const hash = md5("ATS0555544292" + seed.data);

	const queryString = qs.stringify({
		uname: "admin",
		hash,
		tz: "Asia/Dubai",
		language: "en"
	});

	const login = await api.post(
		"http://securepath.atsuae.net/php/getpage.php?mode=login&fx=authenticate",
		queryString,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
	);

	const isLoggedIn = await api.get(
		"http://securepath.atsuae.net/php/getpage.php?mode=admin&fx=display"
	);

	if (AxiosHelpers.isSecurepathForbidden(isLoggedIn)) {
		return res.status(403).json(new Response(null, "Invalid Credentials"));
	}
	return res
		.json(new Response(null, "Successfully logged in."))
		.setHeader("set-cookie", seed.headers["set-cookie"][0]);
});
