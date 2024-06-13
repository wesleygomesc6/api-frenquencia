import { ApiProperty } from '@nestjs/swagger';

export class Dia {
  @ApiProperty()
  id: number;
  @ApiProperty()
  horaEntrada: Date;
  @ApiProperty()
  horaSaidaAlmoco: Date;
  @ApiProperty()
  horaEntradaAlmoco: Date;
  @ApiProperty()
  horaSaida: Date;
  @ApiProperty()
  saldoDia: number;
  @ApiProperty()
  tempoTrabalhado: number;
  @ApiProperty()
  mesId: number;
  @ApiProperty()
  funcionarioId: string;
}
