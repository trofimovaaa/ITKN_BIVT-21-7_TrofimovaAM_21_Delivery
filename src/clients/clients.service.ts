import { HttpStatus, Injectable } from '@nestjs/common';
import { Courier } from 'src/couriers/courier.entity';

import { Order } from 'src/orders/orders.entity';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateClientDto } from './dto/clientDto';
import { IncompleteClientDto } from './dto/incomplete-clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>, // "внедряем" репозиторий Courier в сервис
  ) {}

  findOne(id: number): Promise<Client> {
    // Promise<Author> - указывает, что функция возвращает объект Client в виде Promise (c асинхронного потока)
    return this.clientRepository.findOne({
      //получаем объект Client по id
      where: { id }, //указываем условие поиска по id
      relations: { orders: true, couriers: true },
      //получаем связанные объекты
    });
  }

  async createClient(clientDto: CreateClientDto): Promise<Client> {
    //получаем объект CreateAuthorDto
    const client = this.clientRepository.create(); //создаем объект Client из репозитория
    client.firstName = clientDto.firstName; //заполняем поля объекта Client
    client.lastName = clientDto.lastName;
    client.address = clientDto.address;
    console.log(clientDto.orders);
    await this.clientRepository.save(client); //сохраняем объект client в БД
    for (let _order of clientDto.orders) {
      let order = this.orderRepository.create({ ..._order });
      await this.orderRepository.save(order);
    }
    return client; //возвращаем объект client
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find({
      //получаем связанные объекты
      relations: {
        couriers: true,
        orders: true,
      },
    }); //получаем массив Client из БД
    return clients; //возвращаем массив Client
  }

  async update(id: number, updatedClient: Client) {
    //получаем объект Client для обновления по id
    const client = await this.clientRepository.findOne({ where: { id } }); //получаем объект Client по id из БД
    client.firstName = updatedClient.firstName; //обновляем поля объекта Author
    client.lastName = updatedClient.lastName;
    client.address = updatedClient.address;
    client.orders = updatedClient.orders;
    client.couriers = updatedClient.couriers;
    await this.clientRepository.save(client); //сохраняем объект Client в БД
    return client; //возвращаем объект Client
  }

  remove(id: number) {
    this.clientRepository.delete({ id }); //удаляем объект Author из БД
  }

  async findIncomplete(): Promise<IncompleteClientDto[]> {
    const clients = await this.clientRepository.find(); //получаем массив Author из БД
    const incompleteAuthors: IncompleteClientDto[] = clients.map((client) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteClient = new IncompleteClientDto();
      incompleteClient.id = client.id;
      incompleteClient.firstName = client.firstName;
      incompleteClient.lastName = client.lastName;
      return incompleteClient;
    });
    return incompleteAuthors; //возвращаем массив IncompleteAuthorDto
  }
}
