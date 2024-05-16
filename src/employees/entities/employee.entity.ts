import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  fullname: string;

  @Column({ length: 255 })
  photo: string;

  @Column({ length: 255 })
  instagram?: string;

  @ManyToMany(() => Service, (Service) => Service.employees, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  @JoinTable()
  services?: Service[];
}
