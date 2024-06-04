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
  @ApiProperty({ required: true, example: 24 })
  mesId: number;
  @ApiProperty({ required: true, example: 'daf6-fdasfsa-fadsfdsa' })
  funcionarioId?: string;
}
