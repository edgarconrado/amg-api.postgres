import { ApiProperty } from '@nestjs/swagger';
import { Detail } from 'src/details/entities/detail.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único de la venta' })
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Fecha y hora de la venta',
    example: '2023-09-23T17:45:00.000Z',
  })
  sale_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Total de la venta', example: 200.5 })
  total: number;

  @ManyToOne(() => Employee, (employee) => employee.sales, {
    nullable: true,
  })
  @ApiProperty({
    description: 'Empleado a la que pertenece la venta',
    type: () => Employee,
  })
  employee: Employee;

  @OneToMany(() => Detail, (detail) => detail.product)
  details: Detail[];
}
