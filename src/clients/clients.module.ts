import { Module } from '@nestjs/common';
import { Courier } from 'src/couriers/courier.entity';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Order } from 'src/orders/orders.entity';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersModule } from 'src/couriers/couriers.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    DatasourceModule,
    CouriersModule,
    OrdersModule,
    ClientsModule,
    TypeOrmModule.forFeature([Client, Order, Courier]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!],
  ],
})
export class ClientsModule {}
