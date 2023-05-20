import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('orders')
@ApiTags('Заказы')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Вывод всех заказов' })
  @Public()
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Вывод заказа по id' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление данных заказа' })
  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrder: Order) {
    return this.ordersService.update(+id, updateOrder);
  }

  @ApiOperation({ summary: 'Создание заказа' })
  @Public()
  @Post()
  create(@Body() createOrder: Order) {
    this.ordersService.create(createOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @ApiOperation({ summary: 'Получение неполной информации о заказе' })
  @Public()
  @Get('incomplete')
  findIncomplete() {
    this.ordersService.findIncomplete();
  }
}
