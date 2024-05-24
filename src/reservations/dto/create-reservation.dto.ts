import {
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  fullname: string;

  @IsPhoneNumber('UZ')
  phone: string;

  @IsString()
  @MaxLength(255)
  comment?: string;

  @IsInt({ each: true })
  serviceIds: number[];

  @IsOptional()
  @IsInt()
  employeeId?: number | null;

  @IsDateString()
  date: Date;

  @IsMilitaryTime({ each: true })
  times: string[];
}
