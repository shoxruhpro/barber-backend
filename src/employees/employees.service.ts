import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Service, ServiceType } from 'src/services/entities/service.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(createEmployeeDto: Partial<CreateEmployeeDto> & { photo: string }) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll(text: string) {
    return this.employeeRepository.find({
      where: text ? { fullname: ILike(`%${text}%`) } : {},
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

    const services: Service[] = [];

    if (updateEmployeeDto.serviceIds)
      for await (const serviceId of updateEmployeeDto.serviceIds) {
        const service = await this.serviceRepository.findOneBy({
          id: +serviceId,
        });

        if (service.serviceType === ServiceType.TOP)
          throw new BadRequestException(
            "TOP xizmat turini xodimga bog'lash mumkin emas.",
          );

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
