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
    private poiRepository: Repository<Poi>,  // Inject TypeORM repository
  ) {}

  create(createPoiDto: CreatePoiDto) {
    const poi = this.poiRepository.create(createPoiDto);
    return this.poiRepository.save(poi);
  }

  findAll() {
    return this.poiRepository.find();
  }

  findOne(id: number) {
    return this.poiRepository.findOne({
      where: { id },  // Search criteria is provided via "where"
    });
  }

  update(id: number, updatePoiDto: UpdatePoiDto) {
    return this.poiRepository.update(id, updatePoiDto);
  }

  remove(id: number) {
    return this.poiRepository.delete(id);
  }
}
