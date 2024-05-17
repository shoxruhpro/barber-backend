import { Injectable } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  findOne() {
    return this.contactRepository.findOneBy({ id: 1 });
  }

  update(updateContactDto: UpdateContactDto) {
    return this.contactRepository.save({ id: 1, ...updateContactDto });
  }
}
