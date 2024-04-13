export class CustomError extends Error {
	private readonly _initialStatus = 400;
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

export class ValidationError extends CustomError {}

export class DataBaseError extends CustomError {}
