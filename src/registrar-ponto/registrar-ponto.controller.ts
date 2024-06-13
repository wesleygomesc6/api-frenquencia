import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarPontoService } from './registrar-ponto.service';
import { RegistrarPontoEntity } from './entities/registrar-ponto.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Dia } from 'src/dia/entities/dia.entity';

@Controller('registrar-ponto')
@ApiTags('Registrar Ponto')
@ApiBearerAuth()
export class RegistrarPontoController {
  constructor(private registrarPontoService: RegistrarPontoService) {}

  @Post()
  @ApiCreatedResponse({ type: Dia })
  create(@Body() registrarPonto: RegistrarPontoEntity) {
    return this.registrarPontoService.registrarPonto(registrarPonto);
  }
}
