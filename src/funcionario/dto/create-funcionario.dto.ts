import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  sobrenome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
