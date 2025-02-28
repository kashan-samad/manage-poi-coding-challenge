import { Test, TestingModule } from '@nestjs/testing';
import { PoiController } from '../../poi.controller';
import { PoiService } from '../../poi.service';
import { CreatePoiDto } from '../../dto/create-poi.dto';
import { Poi } from '../../entities/poi.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OpeningHours } from '../../config/openingHours.config';

describe('PoiController', () => {
  let poiController: PoiController;
  let poiService: PoiService;

  beforeEach(async () => {
    // Mock PoiService
    const mockPoiService = {
      create: jest.fn().mockResolvedValue({
        id: 'new-poi-id',
        status: 'ONLINE',
        country: 'Germany',
        zipCode: '80939',
        city: 'München',
        street: 'Ingolstaedter Str.',
        houseNumber: '59',
        openingHours: OpeningHours.CASE_ONE,
        pumps: [
          {
            pumpId: '91144c75-4e01-49bf-911b-4a6330962b17',
            pumpName: '1',
            fuelProducts: [
              {
                name: 'SUPER E10',
                prices: { EUR: 1.5, USD: 1.6 },
              },
            ],
          },
        ],
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoiController],
      providers: [
        {
          provide: PoiService,
          useValue: mockPoiService,
        },
        {
          provide: getRepositoryToken(Poi),
          useValue: {}, // If you need to mock the repository, you can provide a mock here too
        },
      ],
    }).compile();

    poiController = module.get<PoiController>(PoiController);
    poiService = module.get<PoiService>(PoiService);
  });

  it('should be defined', () => {
    expect(poiController).toBeDefined();
  });

  it('should create a new POI', async () => {
    const createPoiDto: CreatePoiDto = {
      status: 'ONLINE',
      country: 'Germany',
      zipCode: '80939',
      city: 'München',
      street: 'Ingolstaedter Str.',
      houseNumber: '59',
      openingHours: OpeningHours.CASE_ONE,
      pumps: [
        {
          pumpName: '1',
          fuelProducts: [
            {
              name: 'SUPER E10',
              prices: { EUR: 1.5, USD: 1.6 },
            },
          ],
        },
      ],
    };

    const result = await poiController.create(createPoiDto);
    expect(result).toHaveProperty('id');
    expect(result.id).toBe('new-poi-id');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(poiService.create).toHaveBeenCalledWith(createPoiDto);
  });
});
