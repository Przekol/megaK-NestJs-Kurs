import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'megak_nestjs_kurs',
  bigNumberStrings: false,
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
} satisfies TypeOrmModuleOptions;
