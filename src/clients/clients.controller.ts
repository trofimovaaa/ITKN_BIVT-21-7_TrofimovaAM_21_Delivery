import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/clientDto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('clients')
@ApiTags('Kлиенты')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Вывод всех клиентов' })
  @Public()
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Вывод клиента по id' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление данных клиента' })
  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClient: Client) {
    return this.clientsService.update(+id, updateClient);
  }

  @ApiOperation({ summary: 'Создание клиента' })
  @Public()
  @Post()
  create(@Body() createClient: CreateClientDto) {
    this.clientsService.createClient(createClient);
  }

  @ApiOperation({ summary: 'Удаление клиента' })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }

  @ApiOperation({ summary: 'Получение неполной информации об клиенте' })
  @Public()
  @Get('incomplete')
  findIncomplete() {
    this.clientsService.findIncomplete();
  }
}
