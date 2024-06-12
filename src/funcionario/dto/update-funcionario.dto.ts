import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFuncionarioDto } from './create-funcionario.dto';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
