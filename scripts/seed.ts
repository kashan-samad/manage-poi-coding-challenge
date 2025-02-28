import { DataSource } from 'typeorm';
import { Poi } from './../src/poi/entities/poi.entity';
import { Pump } from './../src/poi/entities/pump.entity';
import { FuelProduct } from './../src/poi/entities/fuel-product.entity';
import { OpeningHours } from '../src/poi/config/openingHours.config';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // Change this if needed
  port: 5432,
  username: 'kashansamad',
  password: 'newPassword',
  database: 'poi',
  entities: [Poi, Pump, FuelProduct],
  synchronize: true, // Auto-create tables
});

async function seed() {
  await dataSource.initialize();
  console.log('Database Connected!');

  const poiRepository = dataSource.getRepository(Poi);
  const pumpRepository = dataSource.getRepository(Pump);
  const fuelProductRepository = dataSource.getRepository(FuelProduct);

  console.log('Seeding data...');

  const poi1 = poiRepository.create({
    status: 'ONLINE',
    country: 'Germany',
    zipCode: '80939',
    city: 'München',
    street: 'Ingolstaedter Str.',
    houseNumber: '59',
    openingHours: OpeningHours.CASE_ONE,
  });

  const poi2 = poiRepository.create({
    status: 'OFFLINE',
    country: 'France',
    zipCode: '75001',
    city: 'Paris',
    street: 'Rue de Rivoli',
    houseNumber: '10',
    openingHours: OpeningHours.CASE_TWO,
  });

  await poiRepository.save([poi1, poi2]);

  const pump1 = pumpRepository.create({
    pumpName: 'Pump 1',
    poi: poi1,
  });

  const pump2 = pumpRepository.create({
    pumpName: 'Pump 2',
    poi: poi1,
  });

  await pumpRepository.save([pump1, pump2]);

  const fuel1 = fuelProductRepository.create({
    name: 'SUPER E10',
    prices: { EUR: 1.50, USD: 1.60 },
    pump: pump1,
  });

  const fuel2 = fuelProductRepository.create({
    name: 'Diesel',
    prices: { EUR: 1.30, USD: 1.40 },
    pump: pump2,
  });

  await fuelProductRepository.save([fuel1, fuel2]);

  console.log('Seeding completed!');
  await dataSource.destroy();
}

seed().catch((err) => console.error('Error in seeding:', err));
