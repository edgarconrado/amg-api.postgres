import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({
    description: 'Fecha de la venta (YYYY-MM-DD)',
    example: '2023-01-15',
  })
  @IsDateString()
  sale_date: string;

  @ApiProperty({ description: 'Total de la venta', example: 200.5 })
  @IsNumber()
  @IsPositive()
  total: number;

  @ApiProperty({
    description: 'ID del empleado  a la que pertenece la Venta',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  employeeId: number;
}
