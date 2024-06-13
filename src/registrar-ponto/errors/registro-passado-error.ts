import { HttpException, HttpStatus } from '@nestjs/common';

export class RegistroPassadoError extends HttpException {
  constructor() {
    super(
      'Você não pode registrar um horário no passado.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
