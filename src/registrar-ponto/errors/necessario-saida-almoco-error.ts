import { HttpException, HttpStatus } from '@nestjs/common';

export class NecessarioSaidaAlmocoError extends HttpException {
  constructor() {
    super(
      'Necessário registrar um horário de saída do almoço.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
