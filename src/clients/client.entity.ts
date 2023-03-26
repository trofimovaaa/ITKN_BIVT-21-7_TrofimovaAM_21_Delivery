import { ApiProperty } from '@nestjs/swagger';
import { Courier } from 'src/couriers/courier.entity';
import { Order } from 'src/orders/orders.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//артикл - курьер

@Entity('clients')
export class Client {
  @ApiProperty({ example: '2', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Николай', description: 'Имя' })
  @Column({})
  firstName: string;
  @ApiProperty({ example: 'Петров', description: 'Фамилия' })
  @Column()
  lastName: string;
  @ApiProperty({ example: 'Большая Якиманка 32', description: 'Адрес' })
  @Column()
  address: string;
  // @Column()
  // all_orders: number[];

  @ManyToMany((type) => Courier, (courier) => courier.clients)
  @JoinTable({
    //join таблица с названием clients_courier
    name: 'client_courier',
    joinColumn: { name: 'client_id' }, //для связи с идентификатором автора
    inverseJoinColumn: { name: 'courier_id' }, //для связи с идентификатором статьи
  })
  couriers: Courier[]; //объект, в котором будем автоматически получать все курьеры
  // orders: Order[];
  @ManyToMany((type) => Order, (order) => order.clients) //тоже самое для заказов
  @JoinTable({
    name: 'client_order',
    joinColumn: { name: 'client_id' },
    inverseJoinColumn: { name: 'order_id' },
  })
  orders: Order[];

  // couriers: Courier[];

  // orders: Array<Order>;
  // couriers: Array<Courier>;
}
