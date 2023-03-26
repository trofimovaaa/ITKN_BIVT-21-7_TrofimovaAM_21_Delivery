import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/client.entity';
import { Courier } from 'src/couriers/courier.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('orders')
export class Order {
  @ApiProperty({ example: '3', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Базовый', description: 'Тариф' })
  @Column()
  plan: string;
  @ApiProperty({
    example: 'Большая Якиманка 32',
    description: 'Адрес отправления',
  })
  @Column()
  address_from: string;
  @ApiProperty({
    example: 'Ленинский проспект 100',
    description: 'Адрес получения',
  })
  @Column()
  address_to: string;
  // @Column()
  // clients: [Client];
  @OneToMany((type) => Courier, (courier) => courier.orders)
  @JoinTable({
    name: 'order_courier',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'courier_id' },
  })
  couriers: Courier[];
  clients: Client[];
  orders: Order[];
}
