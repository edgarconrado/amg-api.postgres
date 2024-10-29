import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from 'src/employees/employees.module';
import { Product } from 'src/products/entities/product.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { Detail } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail, Sale, Product]), EmployeesModule],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
