import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, isString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;
}