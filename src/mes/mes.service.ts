import { Injectable } from '@nestjs/common';
import { CreateMesDto } from './dto/create-mes.dto';
import { UpdateMesDto } from './dto/update-mes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesService {
  constructor(private prismaService: PrismaService) {}

  async create(createMesDto: CreateMesDto) {
    return await this.prismaService.mes.create({ data: createMesDto });
  }

  async findAll(funcionarioId: string) {
    return await this.prismaService.mes.findMany({
      where: {
        funcionarioId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.mes.findUnique({
      where: { id },
      include: {
        dias: true,
      },
    });
  }

  /**
   * @returns mes atual do banco de dados
   * caso não exista ele cadastra o mes e retorna
   */
  async findMesAnoAtual(funcionarioId: string) {
    const mes = await this.findMesAtual();
    return await this.prismaService.mes
      .findFirst({
        where: {
          mesAno: mes,
          funcionarioId,
        },
        select: {
          id: true,
        },
      })
      .then((res) => {
        if (res) {
          return res;
        } else {
          return this.prismaService.mes.create({
            data: {
              mesAno: mes,
              funcionarioId,
            },
          });
        }
      });
  }

  async update(id: number, updateMesDto: UpdateMesDto) {
    return await this.prismaService.mes.update({
      where: { id },
      data: updateMesDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.mes.delete({
      where: { id },
    });
  }

  /**
   * Retorna o mês e ano atual no formato: mm/aaaa
   */
  async findMesAtual(): Promise<string> {
    const mes: number = new Date().getMonth() + 1; // +1 pois o index começa em 0

    return `${mes < 10 ? '0' + mes : mes}/${new Date().getFullYear()}`; // adiciona o 0 caso o mes seja menor que 10
  }

  async atualizarSaldoMes(mesId: number) {
    const sumAllDias = await this.prismaService.dia.groupBy({
      by: ['mesId'],
      where: {
        mesId: mesId,
      },
      _sum: {
        saldoDia: true,
      },
    });

    await this.prismaService.mes.update({
      where: { id: mesId },
      data: {
        saldoMes: sumAllDias[0]._sum.saldoDia,
      },
    });
  }
}
