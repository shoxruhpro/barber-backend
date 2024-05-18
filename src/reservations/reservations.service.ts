import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Employee)
    private employeeRepostitory: Repository<Employee>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const services = [];
    for await (const serviceId of createReservationDto.serviceIds) {
      const service = await this.serviceRepository.findOneBy({
        id: serviceId,
      });

      services.push(service);
    }

    const employee: Employee = createReservationDto.employeeId
      ? await this.employeeRepostitory.findOneBy({
          id: createReservationDto.employeeId,
        })
      : null;

    return this.reservationRepository.save({
      ...createReservationDto,
      employee,
      services,
    });
  }

  findAll() {
    return this.reservationRepository.find({
      relations: { employee: true, services: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return this.reservationRepository.delete(id);
  }
}
