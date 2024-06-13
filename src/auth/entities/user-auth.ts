import { ApiProperty } from '@nestjs/swagger';

export class UserAuth {
  @ApiProperty({ example: 'fd56as45f-fdsa564-fads4f5dsf4' })
  id: string;
  @ApiProperty({ example: 'John' })
  nome: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}
