import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'education',
  username: 'postgres',
  password: '',
  // entities: ['dist/**/*.entity{.ts,.js}'],
  logging: false,
  synchronize: true,
  migrationsTableName: 'migrations',

  // migrations: ['dist/src/migrations/*{.ts,.js}'],
  // migrations: [
  //   /*...*/
  // ],
  // entities: [
  //   __dirname + '/../**/*.entity{.ts,.js}',
  //   // UserPassword,
  //   // User,
  // ],
  migrations: ['./migrations/*.js'],
  entities: ['src/**/*.entity{.ts,.js}'],
});
export default ormConfig;
