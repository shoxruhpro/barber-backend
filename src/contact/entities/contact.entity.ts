import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  weekdayFrom: number;

  @Column()
  weekdayTo: number;

  @Column()
  open: string;

  @Column()
  close: string;
}
