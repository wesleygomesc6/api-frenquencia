import { Injectable } from '@nestjs/common';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiaService {
  constructor(private prismaService: PrismaService) {}

  create(createDiaDto: CreateDiaDto) {
    return this.prismaService.dia.create({
      data: {
        ...createDiaDto,
        mesId: createDiaDto.mesId,
        funcionarioId: createDiaDto.funcionarioId,
      },
    });
  }

  findAll(mesAno: string, funcionarioId: string) {
    return this.prismaService.dia.findMany({
      where: {
        mes: {
          mesAno,
          funcionarioId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.dia.findUnique({
      where: { id },
      include: {
        mes: true,
      },
    });
  }

  update(id: number, updateDiaDto: UpdateDiaDto) {
    return this.prismaService.dia.update({
      where: { id },
      data: updateDiaDto,
    });
  }

  remove(id: number) {
    return this.prismaService.dia.delete({
      where: { id },
    });
  }
}
