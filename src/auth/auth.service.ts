import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { compare } from 'bcrypt';
import { DadosIncorretosError } from './errors/dados-incorretos-error';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from './entities/user-auth';

@Injectable()
export class AuthService {
  constructor(
    private funcionarioServie: FuncionarioService,
    private jwtService: JwtService,
  ) {}
  async auth(authDto: AuthDto) {
    const funcionario: Funcionario = await this.funcionarioServie.findByEmail(
      authDto.email,
    );

    if (!funcionario) throw new DadosIncorretosError();

    const isPasswordMatch = await compare(authDto.senha, funcionario.senha);

    if (!isPasswordMatch) throw new DadosIncorretosError();

    const payload = { sub: funcionario.id, username: funcionario.nome };

    const userAuth: UserAuth = {
      id: funcionario.id,
      nome: funcionario.nome,
      token: await this.jwtService.signAsync(payload),
    };

    return userAuth;
  }
}
