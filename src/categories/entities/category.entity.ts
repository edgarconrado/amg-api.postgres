import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único de la categoría' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Nombre de la categoría' })
  name: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
