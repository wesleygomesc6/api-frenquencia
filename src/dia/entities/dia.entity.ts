import { ApiProperty } from '@nestjs/swagger';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Mes } from 'src/mes/entities/mes.entity';

export class Dia {
  @ApiProperty()
  id: number;
  @ApiProperty()
  horaEntrada: Date;
  @ApiProperty()
  horaSaidaAlmoco: Date;
  @ApiProperty()
  horaEntradaAlmoco: Date;
  @ApiProperty()
  horaSaida: Date;
  @ApiProperty()
  saldoDia: number;
  @ApiProperty()
  tempoTrabalhado: number;
  @ApiProperty()
  mes?: Mes;
  @ApiProperty()
  mesId: number;
  @ApiProperty()
  funcionario?: Funcionario;
  @ApiProperty()
  funcionarioId: string;
}
