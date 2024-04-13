export class CustomError extends Error {
	private _initialStatus = 400;
	protected readonly _code: number;
	protected readonly _message: string;
	protected readonly _logging: boolean;

	constructor(message: string, code?: number, logging?: boolean) {
		super();
		this._message = message;
		this._code = code || this._initialStatus;
		this._logging = logging || false;
	}
	public get message() {
		return this._message;
	}
	public get code() {
		return this._code;
	}
	public get logging() {
		return this._logging;
	}
}
export class DataBaseError extends CustomError {}
export class ValidationError extends CustomError {}

export class AuthenticationError extends ValidationError {
	protected readonly _key: string;

	constructor(message: string, key: "username" | "email_address" | "password", code?: number, logging?: boolean) {
		super(message, code, logging);
		this._key = key;
	}
	public get key() {
		return this._key;
	}
}
