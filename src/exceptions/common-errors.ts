import { httpStatus } from '../http-status';
import { Exception } from './create-custom';
import type { ExceptionOptions } from './create-custom';

export class BadRequestException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Bad request', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'BadRequest',
      status: options?.status ?? httpStatus.badRequest,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class UnauthorizedException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Unauthorized', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Unauthorized',
      status: options?.status ?? httpStatus.unauthorized,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class ForbiddenException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Forbidden', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Forbidden',
      status: options?.status ?? httpStatus.forbidden,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class NotFoundException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Not Found', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'NotFound',
      status: options?.status ?? httpStatus.notFound,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class MethodNotAlloweddException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Method Not Allowed', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'MethodNotAllowed',
      status: options?.status ?? httpStatus.methodNotAllowed,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class ConflictException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Conflict', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Conflict',
      status: options?.status ?? httpStatus.conflict,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class GoneException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Gone', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Gone',
      status: options?.status ?? httpStatus.gone,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class UnknownException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param {string} message - The error message.
   * @param {ExceptionOptions} options - Optional object containing additional error details.
   */
  constructor(message = 'Internal server error', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Unknown',
      status: options?.status ?? httpStatus.internalServerError,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}
