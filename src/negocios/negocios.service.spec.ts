import { Test, TestingModule } from '@nestjs/testing';
import { NegociosService } from './negocios.service';

describe('NegociosService', () => {
  let service: NegociosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NegociosService],
    }).compile();

    service = module.get<NegociosService>(NegociosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
