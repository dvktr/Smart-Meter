import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Response } from 'express';

type exceptionResponseType = {
  message: string;
  customMessage?: string;
  error: string;
  customError?: string;
  status: number;
};

@Catch(
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ServiceUnavailableException,
)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: exceptionResponseType = exception.getResponse();

    let errorCode: string;
    let errorDescription: string | string[];

    switch (status) {
      case 400:
        errorCode = exceptionResponse.customMessage ?? 'INVALID_DATA';
        errorDescription =
          exceptionResponse.customError ?? exceptionResponse.message;
        break;
      case 401:
        errorCode = 'NOT_AUTHENTICATED';
        errorDescription = 'customerCode inválido';
        break;
      case 404:
        errorCode = exceptionResponse.customMessage ?? 'MEASURE_NOT_FOUND';
        errorDescription =
          exceptionResponse.customError ?? exceptionResponse.message;
        break;
      case 409:
        errorCode = exceptionResponse.message;
        errorDescription = exceptionResponse.error;
        break;
      case 503:
        errorCode = 'SERVICE_UNAVAILABLE';
        errorDescription = exceptionResponse.message;
        break;
      default:
        errorCode = 'UNKNOWN_ERROR';
        errorDescription = 'Erro desconhecido';
    }

    response.status(status).json({
      error_code: errorCode,
      error_description: errorDescription,
    });
  }
}
