import { ApiProperty } from '@nestjs/swagger';
import { Mes } from 'src/mes/entities/mes.entity';

export class Funcionario {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
  @ApiProperty()
  meses?: Mes[];
}
