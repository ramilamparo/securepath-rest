export interface ResponseData<T> {
	data: T | null;
}

export class Response<T> {
	private data: T | null;
	private error: string | null;

	constructor(data: T | null, error: string | null = "Unknown error") {
		this.data = data;
		this.error = error;
	}

	public setData = (data: T | null = null) => {
		this.data = data;
	};

	public setError = (error: string) => {
		this.error = error;
	};

	public toJson = (): ResponseData<T | null> => ({
		data: this.data
	});
}
