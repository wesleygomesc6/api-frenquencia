import { HttpException, HttpStatus } from '@nestjs/common';

export class EntradaNecessariaError extends HttpException {
  constructor() {
    super(
      'É necessário registrar um horário de entrada.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
