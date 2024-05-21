import { Employee } from 'src/employees/entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Service, {
    // nullable: false,
    cascade: true,
  })
  @JoinTable()
  services: Service[];

  @OneToOne(() => Employee, { createForeignKeyConstraints: false })
  employeeId?: number;

  @Column('date')
  date: Date;

  @Column('simple-array')
  times: string[];
}
