import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del producto' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Cantidad de productos vendidos', example: 3 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Precio del producto al momento de la venta',
    example: 50.75,
  })
  price: number;

  @ManyToOne(() => Product, (product) => product.details, {
    nullable: true,
  })
  @ApiProperty({
    description: 'Producto a la que pertenece la Venta',
    type: () => Product,
  })
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.details, {
    nullable: true,
  })
  @ApiProperty({
    description: 'Detalle de Venta a la que pertenece la Venta',
    type: () => Sale,
  })
  sale: Sale;
}
