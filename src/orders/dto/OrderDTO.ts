import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/client.entity';
import { Courier } from 'src/couriers/courier.entity';
import { FindOperator } from 'typeorm';

export class CreateOrderDto {
  id: number;
  @ApiProperty({ example: 'Оптима', description: 'Тариф' })
  plan: string;
  @ApiProperty({ example: 'Ленинский 105', description: 'Адрес отправления' })
  address_from: string;
  @ApiProperty({ example: 'Никольская 12', description: 'Адрес получения' })
  address_to: string;
  @ApiProperty({
    example: [
      {
        id: 5,
        firstName: 'Джон',
        lastName: 'Смит',
        address: 'Street 6',
      },
    ],
    description: 'Список Клиентов',
  })
  clients: Client[];
  couriers: Courier[];
  // static id: number | FindOperator<number>;
}
