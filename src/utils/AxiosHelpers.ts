import { AxiosResponse } from "axios";

export abstract class AxiosHelpers {
	public static isResponseHtml = (response: AxiosResponse): boolean => {
		const contentType: string = response.headers["Content-Type"];
		if (contentType.search("text/html") < 0) {
			return false;
		}
		return true;
	};

	public static isSecurepathForbidden = (response: AxiosResponse): boolean => {
		if (response.data.search("Redirecting to login page .. Please wait") < 0) {
			return true;
		}
		return false;
	};
}
