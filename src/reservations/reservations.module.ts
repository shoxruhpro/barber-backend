import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Service } from 'src/services/entities/service.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Service, Employee])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
