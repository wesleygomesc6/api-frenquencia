import { ApiProperty } from '@nestjs/swagger';
import { OrdemRegistro } from 'src/models/OrdemRegistro';

export class RegistrarPontoEntity {
  @ApiProperty()
  diaId?: number;
  @ApiProperty()
  funcionarioId: string;
  @ApiProperty()
  mesId: number;
  @ApiProperty({ required: true, example: 2 })
  ordemRegistro: OrdemRegistro;
}
