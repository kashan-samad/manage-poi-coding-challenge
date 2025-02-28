import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoiModule } from './poi/poi.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poi } from './poi/entities/poi.entity';
import { Pump } from './poi/entities/pump.entity';
import { FuelProduct } from './poi/entities/fuel-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Poi, Pump, FuelProduct],
      synchronize: true,
    }),
    PoiModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    PoiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
