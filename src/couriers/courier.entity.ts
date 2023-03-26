import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/client.entity';
import { Order } from 'src/orders/orders.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('couriers')
export class Courier {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Олег', description: 'Имя' })
  @Column()
  firstName: string;
  @ApiProperty({ example: 'Соколов', description: 'Фамилия' })
  @Column()
  lastName: string;
  // @Column()
  // orders_to_delivery: number[];
  ///////////////////////////////
  // @Column()
  // clients: [number];
  @ManyToOne((type) => Order, (order) => order.couriers)
  @JoinTable({
    name: 'order_courier',
    joinColumn: { name: 'courier_id' },
    inverseJoinColumn: { name: 'order_id' },
  })
  orders: Order[];
  clients: Client[];
}
