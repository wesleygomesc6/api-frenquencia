import { Test, TestingModule } from '@nestjs/testing';
import { MesService } from './mes.service';

describe('MesService', () => {
  let service: MesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesService],
    }).compile();

    service = module.get<MesService>(MesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
