import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ required: true, example: 'john@doe.com' })
  email: string;
  @ApiProperty({ required: true, example: 'Hjf34@55ls' })
  senha: string;
}
