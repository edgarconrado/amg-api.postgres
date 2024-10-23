import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { Detail } from 'src/details/entities/detail.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del producto' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre del producto' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Descripción del producto', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Precio del producto' })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @ApiProperty({
    description: 'Categoría a la que pertenece el producto',
    type: () => Category,
  })
  category: Category;

  @OneToMany(() => Detail, (detail) => detail.product)
  details: Detail[];
}
