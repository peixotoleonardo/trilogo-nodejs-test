import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}