import { ApiProperty } from '@nestjs/swagger';
import { Dia } from 'src/dia/entities/dia.entity';

export class Funcionario {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  sobrenome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
  @ApiProperty()
  dias: Dia[];
}
