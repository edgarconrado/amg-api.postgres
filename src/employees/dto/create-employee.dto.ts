import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nombre del empleado', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Puesto del empleado', example: 'Gerente' })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Fecha de contratación del empleado (YYYY-MM-DD)',
    example: '2023-01-15',
  })
  @IsDateString()
  hire_date: string;
}
