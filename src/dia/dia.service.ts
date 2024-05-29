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
    return this.prismaService.dia.create({ data: createDiaDto });
  }

  findAll() {
    return this.prismaService.dia.findMany();
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
        const { id } = await this.mesService.findMesAnoAtual(); // retorna o id do mes atual
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
          const { id } = await this.mesService.findMesAnoAtual(); // retorna o id do mes atual
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

        await this.update(registrarPonto.diaId, diaSaidaDto).then(
          async (res: Dia) => {
            await this.atualizarSaldoDia(res).then((diaAtualizado: Dia) => {
              updatedDia = diaAtualizado;
            });
          },
        );
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

    const saldoDia: number = horasTrabalhadas - tempoEsperado;

    const diaDto: UpdateDiaDto = {
      tempoTrabalhado: horasTrabalhadas,
      saldoDia: saldoDia,
    };
    return this.update(dia.id, diaDto);
  }
}
