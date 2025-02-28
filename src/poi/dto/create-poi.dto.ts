import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsObject,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OpeningHours } from '../config/openingHours.config';

export class CreatePoiDto {
  @IsEnum(['ONLINE', 'OFFLINE'])
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEnum(OpeningHours)
  openingHours: OpeningHours;

  @IsArray()
  @Type(() => CreatePumpDto)
  pumps: CreatePumpDto[];
}

export class CreatePumpDto {
  @IsString()
  @IsNotEmpty()
  pumpName: string;

  @IsArray()
  @Type(() => CreateFuelProductDto)
  fuelProducts: CreateFuelProductDto[];
}

export class CreateFuelProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  prices: { [currency: string]: number };
}
