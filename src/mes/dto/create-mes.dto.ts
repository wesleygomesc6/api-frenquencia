import { ApiProperty } from '@nestjs/swagger';

export class CreateMesDto {
  @ApiProperty({ required: true, example: '05/2024' })
  mesAno: string;
  @ApiProperty({ example: '3600000' })
  saldoMes: number;
  @ApiProperty({ example: 'dasfs-f44151-fdafd' })
  funcionarioId: string;
}
