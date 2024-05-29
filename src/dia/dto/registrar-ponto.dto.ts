import { ApiProperty } from '@nestjs/swagger';
import { OrdemRegistro } from 'src/models/OrdemRegistro';

export class RegistrarPonto {
  @ApiProperty()
  diaId?: number;
  @ApiProperty()
  funcionarioId?: string;
  @ApiProperty()
  ordemRegistro: OrdemRegistro;
}
