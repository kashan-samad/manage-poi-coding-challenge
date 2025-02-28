import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  houseNumber: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  status: string;
}
