import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'SuperSecret!23',
  database: 'quiz',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
