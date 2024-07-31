import { Exception } from './create-custom';
import type { ExceptionOptions } from './create-custom';

export class BadRequestException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Bad request', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'BadRequest',
      status: options?.status ?? 400,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class UnauthorizedException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Unauthorized', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Unauthorized',
      status: options?.status ?? 401,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class ForbiddenException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Forbidden', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Forbidden',
      status: options?.status ?? 403,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class NotFoundException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Not Found', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'NotFound',
      status: options?.status ?? 404,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class MethodNotAlloweddException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Method Not Allowed', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'MethodNotAllowed',
      status: options?.status ?? 405,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class ConflictException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Conflict', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Conflict',
      status: options?.status ?? 409,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class GoneException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Gone', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Gone',
      status: options?.status ?? 410,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}

export class UnknownException extends Exception {
  /**
   * Constructor for the custom exception.
   * @param message - The error message.
   * @param options - Optional object containing additional error details.
   */
  constructor(message = 'Internal server error', options?: ExceptionOptions) {
    super(message, {
      ...options,
      name: options?.name || 'Unknown',
      status: options?.status ?? 500,
      logLevel: options?.logLevel ?? 'error',
    });
  }
}
