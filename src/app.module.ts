import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DiaModule } from './dia/dia.module';
import { MesModule } from './mes/mes.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

@Module({
  imports: [PrismaModule, DiaModule, MesModule, FuncionarioModule],
})
export class AppModule {}
