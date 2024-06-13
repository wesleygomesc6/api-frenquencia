import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistroRepetidoError extends HttpException {
  constructor() {
    super('Registro repetido.', HttpStatus.CONFLICT);
  }
}
