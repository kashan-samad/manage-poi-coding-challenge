import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OpeningHours } from '../config/opening-hours.config';

@Entity()
export class Poi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  status: string; // ONLINE, OFFLINE

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 20 })
  zipCode: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 10 })
  houseNumber: string;

  @Column({ type: 'enum', enum: OpeningHours })
  openingHours: OpeningHours;

  @OneToMany(() => Pump, (pump) => pump.poi, { cascade: true })
  pumps: Pump[];
}

@Entity()
export class Pump {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  pumpName: string;

  @OneToMany(() => FuelProduct, (fuelProduct) => fuelProduct.pump, { cascade: true })
  fuelProducts: FuelProduct[];

  @ManyToOne(() => Poi, (poi) => poi.pumps, { onDelete: 'CASCADE' })
  poi: Poi;
}

@Entity()
export class FuelProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('jsonb')
  prices: { [currency: string]: number }; // Example: { "EUR": 1.50, "USD": 1.60 }

  @ManyToOne(() => Pump, (pump) => pump.fuelProducts, { onDelete: 'CASCADE' })
  pump: Pump;
}
