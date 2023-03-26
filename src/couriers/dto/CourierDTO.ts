import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/client.entity';
import { Order } from 'src/orders/orders.entity';

export class CreateCourierDto {
  @ApiProperty({ example: 'Олег', description: 'Имя' })
  firstName: string;
  @ApiProperty({ example: 'Соколов', description: 'Фамилия' })
  lastName: string;
  // orders_to_delivery: [number];
  @ApiProperty({
    example: [
      {
        id: 5,
        firstName: 'Джек',
        lastName: 'Смит',
        address: 'Street 2',
      },
    ],
    description: 'Список Клиентов',
  })
  orders: Order[];
}
