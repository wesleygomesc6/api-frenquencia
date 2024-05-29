import { ApiProperty } from '@nestjs/swagger';

export class CreateMesDto {
  @ApiProperty({ required: true, example: '05/2024' })
  mesAno: string;
  @ApiProperty({ example: '3600000' })
  saldoMes: number;
}
