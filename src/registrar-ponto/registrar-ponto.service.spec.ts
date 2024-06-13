import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarPontoService } from './registrar-ponto.service';

describe('RegistrarPontoService', () => {
  let service: RegistrarPontoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrarPontoService],
    }).compile();

    service = module.get<RegistrarPontoService>(RegistrarPontoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
