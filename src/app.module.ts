import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { DetailsModule } from './details/details.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl:
          process.env.DB_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    CommonModule,
    ProductsModule,
    CategoriesModule,
    SalesModule,
    EmployeesModule,
    DetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
