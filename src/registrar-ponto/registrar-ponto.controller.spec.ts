import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarPontoController } from './registrar-ponto.controller';
import { RegistrarPontoService } from './registrar-ponto.service';

describe('RegistrarPontoController', () => {
  let controller: RegistrarPontoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrarPontoController],
      providers: [RegistrarPontoService],
    }).compile();

    controller = module.get<RegistrarPontoController>(RegistrarPontoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
