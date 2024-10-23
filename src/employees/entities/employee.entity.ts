import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del empleado' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre del empleado' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Puesto del empleado' })
  position: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Fecha de contratación del empleado' })
  hire_date: Date;

  @OneToMany(() => Sale, (sale) => sale.employee, { cascade: true })
  sales: Sale[];
}
