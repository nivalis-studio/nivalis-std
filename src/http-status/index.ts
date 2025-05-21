import { httpStatusError, httpStatusOk } from './types';
import type { HttpStatus, HttpStatusError, HttpStatusOk } from './types';

export const isHttpStatusOk = (status: number): status is HttpStatusOk =>
  httpStatusOk.has(status as HttpStatusOk);

export const isHttpStatusError = (status: number): status is HttpStatusError =>
  httpStatusError.has(status as HttpStatusError);

export const httpStatus = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  unprocessableEntity: 422,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
} as const satisfies { [key: string]: HttpStatus };

export type { HttpStatus, HttpStatusError, HttpStatusOk } from './types';
