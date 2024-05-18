import { Employee } from 'src/employees/entities/employee.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ServiceType {
  AKA = 'aka',
  VIP = 'vip',
  TOP = 'top',
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  price: number;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: ServiceType,
    default: ServiceType.AKA,
  })
  serviceType: ServiceType;

  @ManyToOne(() => Reservation, (reservation) => reservation.services, {
    onDelete: 'SET NULL',
  })
  reservation: Reservation;

  @ManyToMany(() => Employee, (Employee) => Employee.services, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  employees?: Employee[];
}
