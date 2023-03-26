import { ApiProperty } from '@nestjs/swagger';
import { Courier } from 'src/couriers/courier.entity';
import { Order } from 'src/orders/orders.entity';

export class CreateClientDto {
  @ApiProperty({ example: 'Николай', description: 'Имя' })
  firstName: string;
  @ApiProperty({ example: 'Петров', description: 'Фамилия' })
  lastName: string;
  @ApiProperty({ example: 'Большая Якиманка 32', description: 'Адрес' })
  address: string;
  @ApiProperty({
    example: [
      {
        id: 5,
        plan: 'Оптима',
        address_from: 'Большая Никитская 1',
        address_to: 'Малая Бронная 12',
      },
    ],
    description: 'Список заказов',
  })
  orders: Order[];
  @ApiProperty({
    example: [
      {
        id: 5,
        firstName: 'Максим',
        lastName: 'Воробьев',
      },
    ],
    description: 'Список курьеров',
  })
  couriers: Courier[];
  // orders: Array<number>;
}
