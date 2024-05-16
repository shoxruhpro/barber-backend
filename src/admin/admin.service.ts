import { Injectable } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findOne(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy({ username });
  }

  async update(updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update({}, updateAdminDto);
  }
}
