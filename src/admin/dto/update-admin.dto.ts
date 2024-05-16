import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ required: true })
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(64)
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
