import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserAuth } from './entities/user-auth';
import { Public } from 'src/decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @ApiTags('Auth')
  @ApiCreatedResponse({ type: UserAuth })
  create(@Body() authDto: AuthDto) {
    try {
      return this.authService.auth(authDto);
    } catch (error) {
      throw new Error();
    }
  }
}
