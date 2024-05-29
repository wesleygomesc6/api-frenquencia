import { Test, TestingModule } from '@nestjs/testing';
import { MesController } from './mes.controller';
import { MesService } from './mes.service';

describe('MesController', () => {
  let controller: MesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesController],
      providers: [MesService],
    }).compile();

    controller = module.get<MesController>(MesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
