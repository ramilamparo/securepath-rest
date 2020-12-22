const { SECUREPATH_BASE_URL } = process.env;

if (!SECUREPATH_BASE_URL) {
	throw new Error("Environment variable SECUREPATH_BASE_URL is not set!");
}

export const baseUrl = SECUREPATH_BASE_URL;
