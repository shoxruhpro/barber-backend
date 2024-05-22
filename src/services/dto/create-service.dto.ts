import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ServiceType } from '../entities/service.entity';

export class CreateServiceDto {
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({ minimum: 30_000, maximum: 3_000_000 })
  @IsInt()
  @Min(30_000)
  @Max(3_000_000)
  price: number;

  @ApiProperty({ minimum: 15, maximum: 300 })
  @IsInt()
  @Min(15)
  @Max(300)
  duration: number;

  @ApiProperty()
  @IsString()
  serviceType: ServiceType;
}
