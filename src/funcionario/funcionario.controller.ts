import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { Funcionario } from './entities/funcionario.entity';

@Controller('funcionario')
@ApiTags('Funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiAcceptedResponse({ type: Funcionario })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  @ApiAcceptedResponse({ type: Funcionario, isArray: true })
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({ type: Funcionario })
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Put(':id')
  @ApiAcceptedResponse({ type: Funcionario })
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(id, updateFuncionarioDto);
  }

  @Delete(':id')
  @ApiAcceptedResponse({ type: Funcionario })
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(id);
  }
}
