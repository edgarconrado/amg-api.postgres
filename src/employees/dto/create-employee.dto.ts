import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'user Name del empleado',
    example: 'edgar_conrado',
  })
  @IsString()
  user_name: string;

  @ApiProperty({
    description: 'Password de acceso del empleado',
    example: 'D54321',
  })
  @IsString()
  @MinLength(3)
  password: string;

  @ApiProperty({ description: 'Nombre del empleado', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Fecha de contratación del empleado (YYYY-MM-DD)',
    example: '2023-01-15',
  })
  @IsDateString()
  hire_date: string;
}
