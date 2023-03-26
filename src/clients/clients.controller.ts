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
import { CreateClientDto } from './dto/ClientDTO';

@Controller('clients')
@ApiTags('Kлиенты')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClient: Client) {
    return this.clientsService.update(+id, updateClient);
  }

  @ApiOperation({ summary: 'Создание автора' })
  @Post()
  create(@Body() createClient: CreateClientDto) {
    //   return this.clientsService.create(createClient);
    //
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
  @Get('incomplete')
  findIncomplete() {
    this.clientsService.findIncomplete();
  }
}
