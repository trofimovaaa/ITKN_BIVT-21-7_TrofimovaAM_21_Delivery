import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { Courier } from 'src/couriers/courier.entity';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Client, Order, Courier]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!],
  ],
})
export class OrdersModule {}
