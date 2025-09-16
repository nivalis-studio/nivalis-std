export {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  MethodNotAlloweddException,
  NotFoundException,
  UnauthorizedException,
  UnknownException,
} from './common-errors';
export {
  createCustomException,
  Exception,
  type ExceptionConstructor,
  type ExceptionOptions,
  type FormattedException,
} from './create-custom';
export { toDiscord } from './to-discord';
