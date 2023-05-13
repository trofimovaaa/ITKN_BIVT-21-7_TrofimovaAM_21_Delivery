import { Courier } from './courier.entity';
import { CouriersService } from './couriers.service';
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

@Controller('couriers')
@ApiTags('Курьеры')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @ApiOperation({ summary: 'Вывод всех курьеров' })
  @Get()
  findAll() {
    return this.couriersService.findAll();
  }

  @ApiOperation({ summary: 'Вывод курьера по id' })
  @Get('id')
  findOne(@Param('id') id: string) {
    return this.couriersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление данных курьера' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourier: Courier) {
    return this.couriersService.update(+id, updateCourier);
  }

  @ApiOperation({ summary: 'Создание курьера' }) // Операция для Swagger
  @Post()
  create(@Body() createCourier: Courier) {
    return this.couriersService.create(createCourier);
  }

  @ApiOperation({ summary: 'Удаление клиента' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couriersService.remove(+id);
  }

  @ApiOperation({ summary: 'Получение неполной информации об курьере' })
  @Get('incomplete')
  findIncomplete() {
    this.couriersService.findIncomplete();
  }
}
