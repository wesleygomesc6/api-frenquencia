import { HttpException, HttpStatus } from '@nestjs/common';

export class EntradaRepetidaError extends HttpException {
  constructor() {
    super('Você já registrou a entrada no dia atual.', HttpStatus.BAD_REQUEST);
  }
}
