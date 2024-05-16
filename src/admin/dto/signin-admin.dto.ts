import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class SignInAdminDto {
  @ApiProperty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
