import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service, ServiceType } from './entities/service.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  findAll(type?: ServiceType, text?: string) {
    const condition: Record<string, any> = { serviceType: type };
    if (text) condition.name = ILike(`%${text}%`);
    return this.serviceRepository.find({ where: condition });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
      relations: { employees: true },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.update(id, updateServiceDto);
  }

  remove(id: number) {
    return this.serviceRepository.delete(id);
  }
}
