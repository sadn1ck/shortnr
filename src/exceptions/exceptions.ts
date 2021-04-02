import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
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
