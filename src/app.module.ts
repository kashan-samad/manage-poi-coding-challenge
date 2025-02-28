import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PoiModule } from './poi/poi.module'; // Import PoiModule if you've set it up
import { ConfigModule } from '@nestjs/config'; // Optional: For env variables
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poi } from './poi/entities/poi.entity'; // Assuming you're using TypeORM (can change based on your ORM choice)

@Module({
  imports: [
    ConfigModule.forRoot(), // Optional: Load environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',               // Database type
      host: process.env.DB_HOST,      // Database host (use environment variables for safety)
      port: parseInt(process.env.DB_PORT || '5432', 10),  // Use fallback '5432' and parse it to int
      username: process.env.DB_USERNAME,  // Database username
      password: process.env.DB_PASSWORD,  // Database password
      database: process.env.DB_NAME,  // Database name
      entities: [Poi],  // Register entities
      synchronize: true,  // Auto create DB tables (for dev only, set to false in production)
    }),
    AuthModule,             // Authentication module
    UsersModule,            // User management
    PoiModule,            // Poi module (CRUD)
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY', // Using env var for JWT secret
      signOptions: { expiresIn: '1h' }, // JWT expiration time
    }), PoiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
