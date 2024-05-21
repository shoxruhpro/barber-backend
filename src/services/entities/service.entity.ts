import { Employee } from 'src/employees/entities/employee.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Reservation, (reservation) => reservation.services, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  reservation?: Reservation[];

  @ManyToMany(() => Employee, (employee) => employee.services, {
    // onDelete: 'SET NULL',
    // onUpdate: 'SET NULL',
  })
  employees: Employee[];
}
