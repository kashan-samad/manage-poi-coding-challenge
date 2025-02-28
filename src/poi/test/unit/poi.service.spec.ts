import { Test, TestingModule } from '@nestjs/testing';
import { PoiService } from '../../poi.service';
import { Poi } from '../../entities/poi.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePoiDto } from '../../dto/create-poi.dto';
import { OpeningHours } from '../../config/openingHours.config';

describe('PoiService', () => {
  let poiService: PoiService;
  //   let poiRepository: Repository<Poi>;

  beforeEach(async () => {
    const mockPoiRepository = {
      create: jest.fn().mockImplementation((dto: CreatePoiDto) => ({
        ...dto, // returns the dto as the created POI entity
        id: 'new-poi-id', // mock the ID as returned by the database
      })),
      save: jest.fn().mockResolvedValue({
        id: 'new-poi-id', // mock the returned POI from the save method
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
      providers: [
        PoiService,
        {
          provide: getRepositoryToken(Poi),
          useValue: mockPoiRepository,
        },
      ],
    }).compile();

    poiService = module.get<PoiService>(PoiService);
  });

  it('should be defined', () => {
    expect(poiService).toBeDefined();
  });

  it('should create a new POI successfully', async () => {
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

    const result = await poiService.create(createPoiDto);
    expect(result).toHaveProperty('id');
    expect(result.id).toBe('new-poi-id');
  });
});
