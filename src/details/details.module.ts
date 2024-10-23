import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail, Sale, Product])],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
