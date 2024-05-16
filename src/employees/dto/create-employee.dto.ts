import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ required: true, minLength: 1, maxLength: 128 })
  @MinLength(1)
  @MaxLength(128)
  fullname: string;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsString()
  @MaxLength(255)
  instagram?: string;

  @ApiProperty()
  serviceIds?: number[];
}
