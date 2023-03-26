import { HttpStatus, Injectable } from '@nestjs/common';
import { Client } from 'src/clients/client.entity';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Courier } from './courier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/orders.entity';
import { In } from 'typeorm';
import { CreateCourierDto } from './dto/CourierDTO';
import { IncompleteCourierDto } from './dto/incomplete-courier.dto';
@Injectable()
export class CouriersService {
  constructor(
    private readonly datasourceService: DatasourceService,
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Courier в сервис)
  ) {}

  async create(courierDto: CreateCourierDto): Promise<Courier> {
    //получаем объект CreateCourierDto
    const courier = this.courierRepository.create(); //создаем объект Courier из репозитория

    courier.firstName = courierDto.firstName; //заполняем поля объекта Courier
    courier.lastName = courierDto.lastName;
    const orders = await this.orderRepository.findBy({
      //получаем массив Client по id
      id: In(courierDto.orders),
    });
    courier.orders = orders;
    await this.courierRepository.save(courier); //сохраняем объект Courier в БД
    return courier; //возвращаем объект Courier
  }

  findOne(id: number): Promise<Courier> {
    // Promise<Courier> - указывает, что функция возвращает объект Courier в виде Promise (c асинхронного потока)
    return this.courierRepository.findOne({
      //получаем объект Courier по id
      where: { id }, //указываем условие поиска по id
      relations: { clients: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Courier[]> {
    const couriers = await this.courierRepository.find({
      //получаем связанные объекты
      relations: {
        orders: true,
        // clients: true,
      },
    }); //получаем массив Couriers из БД
    return couriers; //возвращаем массив Couriers
  }

  async update(id: number, updatedCourier: Courier) {
    //получаем объект Courier для обновления по id
    const courier = await this.courierRepository.findOne({ where: { id } }); //получаем объект Courier по id из БД
    courier.firstName = updatedCourier.firstName; //обновляем поля объекта Courier
    courier.lastName = updatedCourier.lastName;
    courier.clients = updatedCourier.clients;
    // courier.orders_to_delivery = updatedCourier.orders_to_delivery;
    await this.courierRepository.save(courier); //сохраняем объект Author в БД
    return courier; //возвращаем объект Author
  }

  remove(id: number) {
    this.courierRepository.delete({ id }); //удаляем объект Courier из БД
  }

  async findIncomplete(): Promise<IncompleteCourierDto[]> {
    const couriers = await this.courierRepository.find(); //получаем массив Courier из БД
    const incompleteCouriers: IncompleteCourierDto[] = couriers.map(
      (courier) => {
        //преобразуем массив Author в массив IncompleteAuthorDto
        const incompleteCourier = new IncompleteCourierDto();
        incompleteCourier.id = courier.id;
        incompleteCourier.firstName = courier.firstName;
        incompleteCourier.lastName = courier.lastName;
        return incompleteCourier;
      },
    );
    return incompleteCouriers; //возвращаем массив IncompleteAuthorDto
  }
}
