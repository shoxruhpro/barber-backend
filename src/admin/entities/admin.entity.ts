import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn({ length: 64, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;
}
