import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MesService } from './mes.service';
import { CreateMesDto } from './dto/create-mes.dto';
import { UpdateMesDto } from './dto/update-mes.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Mes } from './entities/mes.entity';

@Controller('meses')
@ApiTags('Meses')
@ApiBearerAuth()
export class MesController {
  constructor(private readonly mesService: MesService) {}

  @Post()
  @ApiCreatedResponse({ type: Mes })
  create(@Body() createMesDto: CreateMesDto) {
    return this.mesService.create(createMesDto);
  }

  @Get()
  @ApiCreatedResponse({ type: Mes, isArray: true })
  findAll(@Query('funcionarioId') funcionarioId: string) {
    return this.mesService.findAll(funcionarioId);
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
