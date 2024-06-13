import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DiaModule } from './dia/dia.module';
import { MesModule } from './mes/mes.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth-guard';
import { RegistrarPontoModule } from './registrar-ponto/registrar-ponto.module';

@Module({
  imports: [
    PrismaModule,
    DiaModule,
    MesModule,
    FuncionarioModule,
    AuthModule,
    RegistrarPontoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
