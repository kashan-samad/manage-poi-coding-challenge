import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { Poi } from './entities/poi.entity';

@Injectable()
export class PoiService {
  constructor(
    @InjectRepository(Poi)
    private poiRepository: Repository<Poi>, // Inject TypeORM repository
  ) {}

  create(createPoiDto: CreatePoiDto) {
    const poi = this.poiRepository.create(createPoiDto);
    return this.poiRepository.save(poi);
  }

  async findAll(
    page: number,
    limit: number,
    includePumps: boolean,
    includeFuel: boolean,
  ) {
    const skip = (page - 1) * limit;

    let query = this.poiRepository.createQueryBuilder('poi');

    if (includePumps) {
      query = query.leftJoinAndSelect('poi.pumps', 'pumps');

      if (includeFuel) {
        query = query.leftJoinAndSelect('pumps.fuelProducts', 'fuelProducts');
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      pageSize: limit,
      data,
    };
  }

  findOne(id: string) {
    return this.poiRepository.findOne({
      where: { id }, // Search criteria is provided via "where"
    });
  }

  update(id: number, updatePoiDto: UpdatePoiDto) {
    return this.poiRepository.update(id, updatePoiDto);
  }

  remove(id: number) {
    return this.poiRepository.delete(id);
  }
}
