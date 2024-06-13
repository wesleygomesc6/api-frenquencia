import { Module } from '@nestjs/common';
import { RegistrarPontoService } from './registrar-ponto.service';
import { RegistrarPontoController } from './registrar-ponto.controller';
import { DiaService } from 'src/dia/dia.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MesService } from 'src/mes/mes.service';

@Module({
  controllers: [RegistrarPontoController],
  providers: [RegistrarPontoService, PrismaService, DiaService, MesService],
})
export class RegistrarPontoModule {}
