import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, In } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(
    createEmployeeDto: Partial<CreateEmployeeDto> & { photo: string },
  ) {
    const services: Service[] = [];

    if (createEmployeeDto.serviceIds)
      for await (const serviceId of createEmployeeDto.serviceIds) {
        const service = await this.serviceRepository.findOneBy({
          id: +serviceId,
        });

        services.push(service);
      }
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll(text: string, serviceIds: string[]) {
    const findOptionsWhere: FindOptionsWhere<Employee> = {};

    if (text) findOptionsWhere.fullname = ILike(`%${text}%`);
    if (serviceIds?.length > 0)
      findOptionsWhere.services = {
        id: In(serviceIds.map((value: string) => ~~value)),
      };

    return this.employeeRepository.find({
      where: findOptionsWhere,
    });
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: { id },
      relations: { services: true },
    });
  }

  async update(
    id: number,
    updateEmployeeDto: Partial<UpdateEmployeeDto> & { photo?: string },
  ) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) throw new NotFoundException();

    const services: Service[] = [];

    if (updateEmployeeDto.serviceIds)
      for await (const serviceId of updateEmployeeDto.serviceIds) {
        const service = await this.serviceRepository.findOneBy({
          id: +serviceId,
        });

        services.push(service);
      }

    if (updateEmployeeDto.fullname)
      employee.fullname = updateEmployeeDto.fullname;
    if (updateEmployeeDto.instagram)
      employee.instagram = updateEmployeeDto.instagram;
    if (updateEmployeeDto.photo) employee.photo = updateEmployeeDto.photo;
    if (services.length > 0) employee.services = services;

    return this.employeeRepository.save(employee);
  }

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
