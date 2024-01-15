import {
	type HttpStatusError,
	type HttpStatusOk,
	httpStatusError,
	httpStatusOk,
} from './types';

export const isHttpStatusOk = (status: number): status is HttpStatusOk =>
	httpStatusOk.has(status as HttpStatusOk);

export const isHttpStatusError = (status: number): status is HttpStatusError =>
	httpStatusError.has(status as HttpStatusError);
