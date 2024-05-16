import { Employee } from 'src/employees/entities/employee.entity';
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

  @ManyToMany(() => Employee, (Employee) => Employee.services, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  employees?: Employee[];
}
