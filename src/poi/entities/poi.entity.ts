import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OpeningHours } from '../config/openingHours.config';
import { Pump } from './pump.entity';

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
