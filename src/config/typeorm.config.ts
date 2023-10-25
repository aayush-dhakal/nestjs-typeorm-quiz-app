import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

// this is for typeorm integration in Nest.js
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    };
  },
};

// this is for typeorm migration integration as the migration doesn't support asynchronous config so we define a synchronous configuration for it
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};

// export default class TypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
//     console.log("configService.get('DB_HOST')", configService.get('DB_HOST'));
//     return {
//       type: 'postgres',
//       // host: 'localhost',
//       // port: 5432,
//       // username: 'postgres',
//       // password: 'SuperSecret!23',
//       // database: 'quiz',
//       host: configService.get('DB_HOST'),
//       port: configService.get('DB_PORT'),
//       username: configService.get('DB_USERNAME'),
//       password: configService.get('DB_PASSWORD'),
//       database: configService.get('DB_NAME'),
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       synchronize: true, // this will auto update the database tables and any changes
//       logging: true, // this will log all the raw sql queries
//     };
//   }
// }

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
// };
