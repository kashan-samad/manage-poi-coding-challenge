import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { FuelProduct } from './fuel-product.entity';
import { Poi } from './poi.entity';

@Entity()
export class Pump {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  pumpName: string;

  @OneToMany(() => FuelProduct, (fuelProduct) => fuelProduct.pump, {
    cascade: true,
  })
  fuelProducts: FuelProduct[];

  @ManyToOne(() => Poi, (poi) => poi.pumps, { onDelete: 'CASCADE' })
  poi: Poi;
}

