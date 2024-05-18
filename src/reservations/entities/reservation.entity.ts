import { Employee } from 'src/employees/entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  fullname: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 255 })
  comment?: string;

  @OneToMany(() => Service, (service) => service.reservation, {
    nullable: false,
  })
  services: Service[];

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn()
  employee?: Employee;

  @Column()
  date: Date;

  @Column('simple-array')
  times: string[];
}
