import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMesDto } from './create-mes.dto';

export class UpdateMesDto extends PartialType(CreateMesDto) {
  @ApiProperty({ required: true, example: 15 })
  id?: number;
  @ApiProperty({ example: '05/2024' })
  mesAno?: string;
  @ApiProperty({ example: '3600000' })
  saldoMes?: number;
  @ApiProperty({ example: 'dasfs-f44151-fdafd' })
  funcionarioId?: string;
}
