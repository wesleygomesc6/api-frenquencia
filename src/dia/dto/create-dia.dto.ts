import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaDto {
  @ApiProperty({ example: 3600000 })
  horaEntrada?: Date;
  @ApiProperty({ example: 3600000 })
  horaSaidaAlmoco?: Date;
  @ApiProperty({ example: 3600000 })
  horaEntradaAlmoco?: Date;
  @ApiProperty({ example: 3600000 })
  horaSaida?: Date;
  @ApiProperty({ example: 3600000 })
  saldoDia?: number;
  @ApiProperty({ example: 3600000 })
  tempoTrabalhado?: number;
  @ApiProperty({ required: true, example: 24 })
  mesId: number;
  @ApiProperty({ required: true, example: 'fdaf541fd5f1sa25f' })
  funcionarioId: string;
}
