import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MesService } from './mes.service';
import { CreateMesDto } from './dto/create-mes.dto';
import { UpdateMesDto } from './dto/update-mes.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Mes } from './entities/mes.entity';

@Controller('meses')
@ApiTags('Meses')
export class MesController {
  constructor(private readonly mesService: MesService) {}

  @Post()
  @ApiCreatedResponse({ type: Mes })
  create(@Body() createMesDto: CreateMesDto) {
    return this.mesService.create(createMesDto);
  }

  @Get()
  @ApiCreatedResponse({ type: Mes, isArray: true })
  findAll() {
    return this.mesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: Mes })
  findOne(@Param('id') id: string) {
    return this.mesService.findOne(+id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: Mes })
  update(@Param('id') id: string, @Body() updateMesDto: UpdateMesDto) {
    return this.mesService.update(+id, updateMesDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: Mes })
  remove(@Param('id') id: string) {
    return this.mesService.remove(+id);
  }
}
