import { HttpException, HttpStatus } from '@nestjs/common';

export class IntervaloIrregularError extends HttpException {
  constructor() {
    super(
      'O intervalo de almoço deve ser no mínimo 01 (uma) e no máximo 02 (duas) horas.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
