import { HttpException, HttpStatus } from '@nestjs/common';

export class IdNecessarioError extends HttpException {
  constructor() {
    super('É necessário enviar o diaId.', HttpStatus.BAD_REQUEST);
  }
}
