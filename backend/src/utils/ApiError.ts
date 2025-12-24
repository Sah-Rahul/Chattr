import { HTTPSTATUS, httpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enum";

export class AppError extends Error {
  statusCode: number;
  data: null;
  errors: unknown[];
  success: false;
  code?: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode: number,
    code?: ErrorCodeEnumType,
    errors: unknown[] = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.success = false;
    this.code = code;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class HttpException extends AppError {
  constructor(
    message = "Http Exception Error",
    statusCode: httpStatusCodeType,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerException extends AppError {
  constructor(
    message = "Internal Server Error",
    errorCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR
  ) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
  }
}

export class NotFoundException extends AppError {
  constructor(
    message = "Resource not found",
    errorCode = ErrorCodeEnum.RESOURCE_NOT_FOUND
  ) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode);
  }
}

export class BadRequestException extends AppError {
  constructor(
    message = "Bad Request",
    errorCode = ErrorCodeEnum.VALIDATION_ERROR
  ) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}

export class UnauthorizedException extends AppError {
  constructor(
    message = "Unauthorized Access",
    errorCode = ErrorCodeEnum.ACCESS_UNAUTHORIZED
  ) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
  }
}
