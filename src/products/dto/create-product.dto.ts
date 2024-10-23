import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Paleta de Nieve a Agua',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Paleta Nieve de Agua',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Precio del producto', example: 12.5 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  categoryId: number;
}
