import { ApiProperty } from '@nestjs/swagger';
import { Dia } from '@prisma/client';

export class Mes {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: true, example: '05/2024' })
  mesAno: string;
  @ApiProperty({ example: '3600000' })
  saldoMes: number;
  @ApiProperty()
  dias: Dia[];
}
