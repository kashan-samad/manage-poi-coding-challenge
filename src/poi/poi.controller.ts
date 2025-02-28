import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PoiService } from './poi.service';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';

@Controller('poi')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  @Post()
  create(@Body() createPoiDto: CreatePoiDto) {
    return this.poiService.create(createPoiDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('includePumps') includePumps: string,
    @Query('includeFuel') includeFuel: string,
  ) {
    return this.poiService.findAll(
      parseInt(page),
      parseInt(limit),
      includePumps === 'true',
      includeFuel === 'true',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poiService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePoiDto: UpdatePoiDto) {
    return this.poiService.update(id, updatePoiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.poiService.remove(id);
  }
}
