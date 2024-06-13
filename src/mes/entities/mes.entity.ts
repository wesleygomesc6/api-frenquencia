import { ApiProperty } from '@nestjs/swagger';
import { Dia } from 'src/dia/entities/dia.entity';

export class Mes {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: true, example: '05/2024' })
  mesAno: string;
  @ApiProperty({ example: '3600000' })
  saldoMes: number;
  @ApiProperty({ example: 'dasfs-f44151-fdafd' })
  funcionarioId: string;
  @ApiProperty()
  dias: Dia[];
}
