import { Injectable } from '@nestjs/common';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MesService } from 'src/mes/mes.service';
import { RegistrarPonto } from './dto/registrar-ponto.dto';
import { Dia } from './entities/dia.entity';

@Injectable()
export class DiaService {
  constructor(
    private prismaService: PrismaService,
    private mesService: MesService,
  ) {}

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

  async registrarPonto(registrarPonto: RegistrarPonto) {
    switch (registrarPonto.ordemRegistro) {
      case 1: // ENTRADA
        const { id } = await this.mesService.findMesAnoAtual(
          registrarPonto.funcionarioId,
        ); // retorna o id do mes atual
        return this.create({
          horaEntrada: new Date(),
          mesId: id,
          funcionarioId: registrarPonto.funcionarioId,
        });

      case 2: // SAIDA_ALMOCO
        const diaDto: UpdateDiaDto = {
          horaSaidaAlmoco: new Date(),
        };
        return this.update(registrarPonto.diaId, diaDto);
      case 3: // ENTRADA_ALMOCO
        if (registrarPonto.diaId) {
          const diaDto: UpdateDiaDto = {
            horaEntradaAlmoco: new Date(),
          };
          return this.update(registrarPonto.diaId, diaDto);
        } else {
          const { id } = await this.mesService.findMesAnoAtual(
            registrarPonto.funcionarioId,
          ); // retorna o id do mes atual
          return this.create({
            horaEntradaAlmoco: new Date(),
            mesId: id,
            funcionarioId: registrarPonto.funcionarioId,
          });
        }

      default: // SAIDA
        let updatedDia: Dia;
        const diaSaidaDto: UpdateDiaDto = {
          horaSaida: new Date(),
        };

        await this.update(registrarPonto.diaId, diaSaidaDto)
          .then(async (res: Dia) => {
            await this.atualizarSaldoDia(res).then((diaAtualizado: Dia) => {
              updatedDia = diaAtualizado;
            });
          })
          .then(async () => {
            const sumAllDias = await this.prismaService.dia.groupBy({
              by: ['mesId'],
              where: {
                mesId: updatedDia.mesId,
              },
              _sum: {
                saldoDia: true,
              },
            });

            await this.prismaService.mes.update({
              where: { id: updatedDia.mesId },
              data: {
                saldoMes: sumAllDias[0]._sum.saldoDia,
              },
            });
          });
        return updatedDia;
    }
  }

  atualizarSaldoDia(dia: Dia) {
    let horasTrabalhadas: number;
    const tempoEsperado = 1000 * 60 * 60 * 8; // 8 horas

    if (dia.horaEntrada) {
      horasTrabalhadas =
        Number(dia.horaSaidaAlmoco.getTime() - dia.horaEntrada.getTime()) +
        Number(dia.horaSaida.getTime() - dia.horaEntradaAlmoco.getTime());
    } else {
      horasTrabalhadas =
        dia.horaSaida.getTime() - dia.horaEntradaAlmoco.getTime();
    }

    let saldoDia: number;
    if (tempoEsperado < horasTrabalhadas) {
      saldoDia = horasTrabalhadas - tempoEsperado;
    } else {
      saldoDia = tempoEsperado - horasTrabalhadas;
    }

    const diaDto: UpdateDiaDto = {
      tempoTrabalhado: horasTrabalhadas,
      saldoDia: saldoDia,
    };
    return this.update(dia.id, diaDto);
  }
}
