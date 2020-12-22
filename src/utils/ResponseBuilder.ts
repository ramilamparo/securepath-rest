import { Response } from "express";
import {
	AuthNeededException,
	CredentialsException,
	DeviceExistingException
} from "securepath-api";

export enum StatusCode {
	OK = "OK",
	UNKNOWN_ERROR = "UNKNOWN_ERROR",
	INVALID_ACTION = "INVALID_ACTION",
	UNAUTHENTICATED = "UNAUTHENTICATED"
}

export interface ServerResponseMeta {
	code: StatusCode;
	errors: Array<FieldError>;
	success: boolean;
	message: string;
}

export interface ServerResponse<T> extends ServerResponseMeta {
	data: T;
}

export type FieldError =
	| string
	| {
			key: string;
			value: string;
	  };

export class ResponseBuilder<T> {
	constructor(
		public data: T,
		public meta: ServerResponseMeta = {
			success: false,
			message: "Unknown server error",
			errors: [],
			code: StatusCode.UNKNOWN_ERROR
		}
	) {}

	public setData = (data: T) => {
		this.data = data;
	};

	public setSuccess = (success: boolean) => {
		this.meta.success = success;
	};

	public appendError = (error: FieldError) => {
		this.meta.errors.push(error);
	};

	public setCode = (code: StatusCode) => {
		this.meta.code = code;
	};

	public setMessage = (message: string) => {
		this.meta.message = message;
	};

	public handleExpressError = (e: Error, res: Response) => {
		if (e instanceof AuthNeededException) {
			this.setCode(StatusCode.UNAUTHENTICATED);
			this.setMessage(e.message);
			res.status(401);
		} else if (e instanceof DeviceExistingException) {
			this.setCode(StatusCode.INVALID_ACTION);
			this.setMessage(e.message);
			res.status(403);
		} else if (e instanceof CredentialsException) {
			this.setCode(StatusCode.INVALID_ACTION);
			this.setMessage("Invalid credentails");
			res.status(403);
		} else {
			this.setMessage(e.message);
			res.status(500);
		}
		this.setSuccess(false);
	};

	public handleExpressSuccess = (message: string, res: Response) => {
		this.setMessage(message);
		this.setCode(StatusCode.OK);
		this.setSuccess(true);
		res.status(200);
	};

	public toObject = (): ServerResponse<T> => {
		return {
			data: this.data,
			...this.meta
		};
	};
}
