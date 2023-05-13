import { HttpStatus, Injectable } from '@nestjs/common';
// import { DatasourceService } from 'src/datasource/datasource.service';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Client } from 'src/clients/client.entity';
import { Courier } from 'src/couriers/courier.entity';
import { CreateOrderDto } from './dto/orderDto';
import { IncompleteOrderDto } from './dto/incomplete-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    // private readonly datasourceService: DatasourceService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>, // "внедряем" репозиторий Courier в сервис)
  ) {}

  async create(orderDto: CreateOrderDto): Promise<Order> {
    //получаем объект CreateOrderDto
    const order = this.orderRepository.create(); //создаем объект Order из репозитория
    order.plan = orderDto.plan; //заполняем поля объекта Order
    order.address_from = orderDto.address_from;
    order.address_to = orderDto.address_to;

    if (orderDto.clients) {
      const client = await this.clientRepository.findBy({
        //получаем массив Client по id
        id: In(orderDto.clients),
      });
      order.clients = client;
    }

    if (orderDto.couriers) {
      const courier = await this.courierRepository.findBy({
        //получаем массив Client по id
        id: In(orderDto.couriers),
      });
      order.couriers = courier;
    }

    await this.orderRepository.save(order); //сохраняем объект Order в БД
    return order; //возвращаем объект Order
  }

  findOne(id: number): Promise<Order> {
    // Promise<Order> - указывает, что функция возвращает объект Order в виде Promise (c асинхронного потока)
    return this.orderRepository.findOne({
      //получаем объект Order по id
      where: { id }, //указываем условие поиска по id
      relations: { clients: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      //получаем связанные объекты
      relations: {
        couriers: true,
        // clients: true,
      },
    }); //получаем массив Order из БД
    return orders; //возвращаем массив Order
  }

  async update(id: number, updatedOrder: Order) {
    //получаем объект Order для обновления по id
    const order = await this.orderRepository.findOne({ where: { id } }); //получаем объект Order по id из БД
    order.plan = updatedOrder.plan; //обновляем поля объекта Order
    order.address_from = updatedOrder.address_from;
    order.address_to = updatedOrder.address_to;
    order.clients = updatedOrder.clients;
    await this.orderRepository.save(order); //сохраняем объект Order в БД
    return order; //возвращаем объект Order
  }

  remove(id: number) {
    this.orderRepository.delete({ id }); //удаляем объект Order из БД
  }

  async findIncomplete(): Promise<IncompleteOrderDto[]> {
    const authors = await this.orderRepository.find(); //получаем массив Ordeer из БД
    const incompleteOrders: IncompleteOrderDto[] = authors.map((order) => {
      //преобразуем массив Order в массив IncompleteAuthorDto
      const incompleteOrder = new IncompleteOrderDto();
      incompleteOrder.id = order.id;
      incompleteOrder.plan = order.plan;
      return incompleteOrder;
    });
    return incompleteOrders; //возвращаем массив IncompleteAuthorDto
  }
}
