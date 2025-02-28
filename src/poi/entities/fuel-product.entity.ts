import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Pump } from './pump.entity';

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
