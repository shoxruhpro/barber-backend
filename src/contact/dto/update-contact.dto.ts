import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMilitaryTime,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateContactDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(6)
  weekdayFrom: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(6)
  weekdayTo: number;

  @ApiProperty()
  @IsMilitaryTime()
  open: string;

  @ApiProperty()
  @IsMilitaryTime()
  close: string;

  @ApiProperty()
  @IsPhoneNumber('UZ')
  phone: string;
}
