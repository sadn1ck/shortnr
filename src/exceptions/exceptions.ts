import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

export class CustomException extends BadRequestException {
  constructor(prettyMessage?: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      prettyMessage,
      success: false,
    });
  }
}

export class CustomServerException extends InternalServerErrorException {
  constructor(prettyMessage?: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      prettyMessage,
      success: false,
    });
  }
}
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.send({
      statusCode: HttpStatus.BAD_REQUEST,
      success: false,
      prettyMessage: 'Invalid URL or slug provided',
    });
  }
}
