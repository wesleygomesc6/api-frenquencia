import { HttpException, HttpStatus } from '@nestjs/common';

export class DadosIncorretosError extends HttpException {
  constructor() {
    super('Dados Incorretos', HttpStatus.UNAUTHORIZED);
  }
}
