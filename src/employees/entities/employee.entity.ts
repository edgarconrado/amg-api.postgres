import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del empleado' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre de Usuario del empleado' })
  user_name: string;

  @Column({
    select: false,
  })
  @ApiProperty({ description: 'Password deacceso del empleado' })
  password: string;

  @Column()
  @ApiProperty({ description: 'Nombre del empleado' })
  name: string;

  @Column({
    default: true,
  })
  @ApiProperty({ description: 'Status del Empleado' })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @ApiProperty({ description: 'Puesto del empleado' })
  roles: string[];

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Fecha de contratación del empleado' })
  hire_date: Date;

  @OneToMany(() => Sale, (sale) => sale.employee, { cascade: true })
  sales: Sale[];
}
