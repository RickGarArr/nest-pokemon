import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from './mongooseConfig.service';

describe('MongooseService', () => {
  let service: MongooseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigService],
    }).compile();

    service = module.get<MongooseConfigService>(MongooseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
