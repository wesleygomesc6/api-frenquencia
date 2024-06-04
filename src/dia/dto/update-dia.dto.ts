import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiaDto } from './create-dia.dto';

export class UpdateDiaDto extends PartialType(CreateDiaDto) {
  @ApiProperty({ required: true, example: 25 })
  id?: number;
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
  mesId?: number;
  @ApiProperty({ required: true, example: 'daf6-fdasfsa-fadsfdsa' })
  funcionarioId?: string;
}
