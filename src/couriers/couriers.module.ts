import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
// import { DatasourceModule } from 'src/datasource/datasource.module';
import { Order } from 'src/orders/orders.entity';
import { Courier } from './courier.entity';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './couriers.service';

@Module({
  controllers: [CouriersController],
  providers: [CouriersService],
  imports: [
    // DatasourceModule,
    TypeOrmModule.forFeature([Client, Order, Courier]), // !!! В модуле автор мы используем все три сущности, поэтому все три сущности необходимо импортирвоать!],
  ],
})
export class CouriersModule {}
