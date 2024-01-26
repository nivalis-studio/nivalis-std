import {generateId} from '../generate';
import type {HttpStatusError} from '../http-status';

type ExceptionOptions = {
	name?: string;
	cause?: unknown;
	status?: HttpStatusError;
	traceId?: string;
	meta?: Record<string, unknown>;
};

export interface Exception extends Error {
	__exception: boolean;
	traceId: string;
	status: HttpStatusError;
	timestamp: number;
	meta?: Record<string, unknown>;
}

export interface ExceptionConstructor {
	new (message?: string, options?: ExceptionOptions): Exception;
	readonly prototype: Exception;
}

/**
 * Creates a custom exception class.
 *
 * @param defaultName - The default name for the exception.
 * @param properties - Default properties including message and HTTP status.
 * @returns A class that extends Error and implements the Exception interface.
 */
export const createCustomException = (
	properties: {
		defaultMessage: string;
		defaultName?: string;
		defaultStatus?: HttpStatusError;
	} = {
		defaultName: 'Exception',
		defaultMessage: 'Exception',
		defaultStatus: 500,
	},
): ExceptionConstructor => {
	return class extends Error implements Exception {
		__exception = true;
		meta: Record<string, unknown>;
		traceId: string;
		status: HttpStatusError;
		timestamp = Date.now();

		/**
		 * Constructor for the custom exception.
		 *
		 * @param message - The error message.
		 * @param options - Optional object containing additional error details.
		 */
		constructor(
			message: string = properties.defaultMessage,
			options?: ExceptionOptions,
		) {
			super(message);
			this.status = options?.status || properties.defaultStatus || 500;
			this.name = options?.name || properties.defaultName || 'Exception';
			this.cause = options?.cause;
			this.traceId = options?.traceId || generateId(8);
			this.meta = Object.assign(
				{},
				options?.meta,
				(options?.cause as Exception | undefined)?.meta,
			);
			Object.setPrototypeOf(this, new.target.prototype);
		}
	};
};
