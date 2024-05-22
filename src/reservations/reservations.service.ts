import { Injectable, NotFoundException } from '@nestjs/common';
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

    let employee: Employee = null;
    if (createReservationDto.employeeId) {
      employee = await this.employeeRepostitory.findOneBy({
        id: createReservationDto.employeeId,
      });

      if (!employee) throw new NotFoundException('Employee topilmadi.');
    }

    return this.reservationRepository.save({
      ...createReservationDto,
      employee,
      services,
    });
  }

  findAll() {
    return this.reservationRepository.find({
      relations: { services: true },
    });
  }

  async findTimes(employeeId: number, date: Date) {
    const data = await this.reservationRepository.find({
      where: { employee: { id: employeeId }, date },
      select: { times: true },
      order: { date: { direction: 'DESC' } },
    });

    if (!data) throw new NotFoundException();

    return data.flatMap((value) => {
      return value.times;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(id, updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.delete(id);
  }
}
