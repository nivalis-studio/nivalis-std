import {createCustomException} from './create-custom';

export const BadRequestException = createCustomException({
	defaultName: 'BadRequest',
	defaultMessage: 'Bad request',
	defaultStatus: 400,
});

export const UnauthorizedException = createCustomException({
	defaultName: 'Unauthorized',
	defaultMessage: 'Unauthorized',
	defaultStatus: 401,
});

export const ForbiddenException = createCustomException({
	defaultName: 'Forbidden',
	defaultMessage: 'Forbidden',
	defaultStatus: 403,
});

export const NotFoundException = createCustomException({
	defaultName: 'NotFound',
	defaultMessage: 'Not found',
	defaultStatus: 404,
});

export const ConflictException = createCustomException({
	defaultName: 'Conflict',
	defaultMessage: 'Conflict',
	defaultStatus: 409,
});

export const GoneException = createCustomException({
	defaultName: 'Gone',
	defaultMessage: 'Gone',
	defaultStatus: 410,
});
