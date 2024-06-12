import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FuncionarioService, PrismaService],
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SECRET_JWT,
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class AuthModule {}
