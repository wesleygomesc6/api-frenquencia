import { Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {
  constructor(private prismaService: PrismaService) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    let senha: string;
    await this.hashPassword(createFuncionarioDto.senha).then(
      (senhaHash: string) => {
        senha = senhaHash;
      },
    );
    return this.prismaService.funcionario.create({
      data: { ...createFuncionarioDto, senha },
    });
  }

  hashPassword(senha: string): Promise<string> {
    return bcrypt.hash(senha, 10);
  }

  findAll() {
    return this.prismaService.funcionario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        senha: false,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.funcionario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: false,
      },
    });
  }

  async update(id: string, updateFuncionarioDto: UpdateFuncionarioDto) {
    let senha: string;
    await this.hashPassword(updateFuncionarioDto.senha).then(
      async (senhaHash: string) => {
        senha = senhaHash;
      },
    );

    return this.prismaService.funcionario.update({
      where: { id },
      data: { ...updateFuncionarioDto, senha },
    });
  }
  remove(id: string) {
    return this.prismaService.funcionario.delete({
      where: { id },
    });
  }
}
