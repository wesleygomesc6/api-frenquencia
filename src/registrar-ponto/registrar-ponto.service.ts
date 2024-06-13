import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrarPontoEntity } from './entities/registrar-ponto.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dia } from 'src/dia/entities/dia.entity';
import { RegistroRepetidoError } from './errors/registro-repetido-error';
import { MesService } from 'src/mes/mes.service';
import { RegistroPassadoError } from './errors/registro-passado-error';
import { EntradaNecessariaError } from './errors/entrada-necessaria-error';

@Injectable()
export class RegistrarPontoService {
  constructor(
    private prismaService: PrismaService,
    private mesService: MesService,
  ) {}

  async registrarPonto(registrarPonto: RegistrarPontoEntity): Promise<Dia> {
    const entradas = [1, 3];
    let diaAtual: Dia = new Dia();
    if (registrarPonto.diaId) {
      diaAtual = await this.prismaService.dia.findUnique({
        where: {
          id: registrarPonto.diaId,
        },
      });
    } else if (!entradas.includes(registrarPonto.ordemRegistro)) {
      throw new HttpException(
        'Necessário enviar o diaId',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      // verificar se ja existe algum registro naquele dia
      const hoje = new Date().toISOString().split('T')[0];
      const query = `${hoje}%`;

      const registroHoje = await this.prismaService.$queryRaw<
        Dia[]
      >`SELECT * FROM dias d WHERE d.hora_entrada LIKE ${query} OR d.hora_entrada_almoco LIKE ${query}`;

      if (registroHoje.length > 0) {
        throw new HttpException(
          'Você já registrou todos os pontos no dia atual.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    switch (registrarPonto.ordemRegistro) {
      case 1:
        if (diaAtual.horaEntrada) throw new RegistroRepetidoError();
        if (diaAtual.horaSaidaAlmoco || diaAtual.horaEntradaAlmoco) {
          throw new RegistroPassadoError();
        }

        return this.registrarPontoEntrada(registrarPonto);
      case 2:
        if (diaAtual.horaSaidaAlmoco) throw new RegistroRepetidoError();
        if (diaAtual.horaEntradaAlmoco) throw new RegistroPassadoError();
        if (!diaAtual.horaEntrada) {
          throw new EntradaNecessariaError();
        }

        return this.registrarPontoSaidaAlmoco(registrarPonto);
      case 3:
        if (diaAtual.horaEntradaAlmoco) {
          throw new RegistroRepetidoError();
        }
        if (!diaAtual.horaSaidaAlmoco) {
          throw new HttpException(
            'Necessário registrar um horário de entrada do almoço.',
            HttpStatus.BAD_REQUEST,
          );
        }
        return this.registrarPontoEntradaAlmoco(registrarPonto);

      default:
        if (diaAtual.horaSaida) {
          throw new RegistroRepetidoError();
        }
        if (!diaAtual.horaEntradaAlmoco) {
          throw new EntradaNecessariaError();
        }
        return this.registrarPontoSaida(registrarPonto);
    }
  }

  async registrarPontoEntrada(
    registrarPonto: RegistrarPontoEntity,
  ): Promise<Dia> {
    return await this.prismaService.dia.create({
      data: {
        horaEntrada: new Date(),
        funcionarioId: registrarPonto.funcionarioId,
        mesId: registrarPonto.mesId,
      },
    });
  }

  async registrarPontoSaidaAlmoco(
    registrarPonto: RegistrarPontoEntity,
  ): Promise<Dia> {
    return await this.prismaService.dia.update({
      where: {
        id: registrarPonto.diaId,
      },
      data: {
        horaSaidaAlmoco: new Date(),
      },
    });
  }

  async registrarPontoEntradaAlmoco(
    registrarPonto: RegistrarPontoEntity,
  ): Promise<Dia> {
    if (registrarPonto.diaId) {
      return await this.prismaService.dia.update({
        where: {
          id: registrarPonto.diaId,
        },
        data: {
          horaEntradaAlmoco: new Date(),
        },
      });
    }
    return await this.prismaService.dia.create({
      data: {
        horaEntradaAlmoco: new Date(),
        funcionarioId: registrarPonto.funcionarioId,
        mesId: registrarPonto.mesId,
      },
    });
  }

  async registrarPontoSaida(
    registrarPonto: RegistrarPontoEntity,
  ): Promise<Dia> {
    return await this.prismaService.dia
      .update({
        where: {
          id: registrarPonto.diaId,
        },
        data: {
          horaSaida: new Date(),
        },
      })
      .then(async (dia: Dia) => {
        const { tempoTrabalhado, saldoDia } = await this.calcularSaldo(dia);
        return await this.atualizarSaldoDia(dia.id, tempoTrabalhado, saldoDia);
      });
  }

  async atualizarSaldoDia(
    id: number,
    tempoTrabalhado: number,
    saldoDia: number,
  ): Promise<Dia> {
    const dia = await this.prismaService.dia.update({
      where: { id },
      data: {
        saldoDia,
        tempoTrabalhado,
      },
    });
    this.mesService.atualizarSaldoMes(dia.mesId);
    return dia;
  }

  async calcularSaldo(
    dia: Dia,
  ): Promise<{ tempoTrabalhado: number; saldoDia: number }> {
    let tempoTrabalhado: number;
    const tempoEsperado = 1000 * 60 * 60 * 8; // 8 horas

    if (dia.horaEntrada) {
      tempoTrabalhado =
        Number(dia.horaSaidaAlmoco.getTime() - dia.horaEntrada.getTime()) +
        Number(dia.horaSaida.getTime() - dia.horaEntradaAlmoco.getTime());
    } else {
      tempoTrabalhado =
        dia.horaSaida.getTime() - dia.horaEntradaAlmoco.getTime();
    }

    let saldoDia: number;
    if (tempoEsperado < tempoTrabalhado) {
      saldoDia = tempoTrabalhado - tempoEsperado;
    } else {
      saldoDia = tempoEsperado - tempoTrabalhado;
    }
    return { tempoTrabalhado, saldoDia };
  }
}
