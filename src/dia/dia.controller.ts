import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DiaService } from './dia.service';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Dia } from './entities/dia.entity';
import { RegistrarPonto } from './dto/registrar-ponto.dto';

@Controller('dias')
@ApiTags('Dias')
export class DiaController {
  constructor(private readonly diaService: DiaService) {}

  @Post()
  @ApiCreatedResponse({ type: Dia })
  create(@Body() createDiaDto: CreateDiaDto) {
    return this.diaService.create(createDiaDto);
  }

  @Post('registrar-ponto')
  @ApiCreatedResponse({ type: Dia })
  registrarPonto(@Body() registrarPonto: RegistrarPonto) {
    return this.diaService.registrarPonto(registrarPonto);
  }

  @Get()
  @ApiCreatedResponse({ type: Dia, isArray: true })
  findAll() {
    return this.diaService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: Dia })
  findOne(@Param('id') id: string) {
    return this.diaService.findOne(+id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: Dia })
  update(@Param('id') id: string, @Body() updateDiaDto: UpdateDiaDto) {
    return this.diaService.update(+id, updateDiaDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: Dia })
  remove(@Param('id') id: string) {
    return this.diaService.remove(+id);
  }
}
