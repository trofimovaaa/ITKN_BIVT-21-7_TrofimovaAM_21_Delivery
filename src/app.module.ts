import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/client.entity';
import { OrdersModule } from './orders/orders.module';
import { CouriersModule } from './couriers/couriers.module';
import { Courier } from './couriers/courier.entity';
import { Order } from './orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД

      port: 5432, //порт
      username: 'postgres', //имя пользователя
      password: '', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: true, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: true, //включим логирование для удобства отслеживания процессов
      entities: [Client, Courier, Order], //указываем путь к сущностям
      // synchronize: true,
      // migrationsTableName: 'migrations',
      // migrations: ['dist/src/migrations/*{.ts,.js}'],
    }),
    ClientsModule,
    OrdersModule,
    CouriersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
