import { Module } from '@nestjs/common';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poi } from './entities/poi.entity'; // Assuming you're using TypeORM (can change based on your ORM choice)

@Module({
  imports: [
    TypeOrmModule.forFeature([Poi]), // Register the poi entity here
  ],
  controllers: [PoiController],
  providers: [PoiService],
})
export class PoiModule {}
