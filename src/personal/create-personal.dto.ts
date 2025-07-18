import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator'

export class CreatePersonalDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsInt()
  @Min(0)
  edad: number;

  @IsInt()
  dni: number;

  @IsOptional()
  @IsString()
  avatar?: string;
}