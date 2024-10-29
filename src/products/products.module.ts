import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), EmployeesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
