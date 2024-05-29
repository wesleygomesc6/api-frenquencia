import { Module } from '@nestjs/common';
import { DiaService } from './dia.service';
import { DiaController } from './dia.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MesService } from 'src/mes/mes.service';

@Module({
  controllers: [DiaController],
  providers: [DiaService, PrismaService, MesService],
})
export class DiaModule {}
