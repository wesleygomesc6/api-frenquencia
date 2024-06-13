import { Module } from '@nestjs/common';
import { MesService } from './mes.service';
import { MesController } from './mes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MesController],
  providers: [MesService, PrismaService],
})
export class MesModule {}
