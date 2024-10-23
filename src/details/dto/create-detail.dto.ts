import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetailDto {
  @ApiProperty({
    description: 'Cantidad de producto de la venta',
    example: '2',
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Precio que costo el producto',
    example: '20.5',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'ID del Producto que se vendio',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'ID de la venta',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  saleId: number;
}
