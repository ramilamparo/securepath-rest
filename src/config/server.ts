const { PORT } = process.env;

if (!PORT) {
	throw new Error("Port environment variable is not set!");
}

export const port = parseInt(PORT);
