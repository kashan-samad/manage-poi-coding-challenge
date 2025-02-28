import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator';
import { OpeningHours } from '../config/openingHours.config';

export class UpdatePoiDto {
  @IsEnum(['ONLINE', 'OFFLINE'])
  @IsNotEmpty()
  status?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  houseNumber?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsEnum(OpeningHours)
  @IsOptional()
  openingHours: OpeningHours;
}

export class UpdatePumpDto {
  @IsString()
  @IsOptional()
  pumpName?: string;
}

export class UpdateFuelProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  prices?: { [currency: string]: number };
}
