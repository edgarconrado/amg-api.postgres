import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);
      await this.employeeRepository.save(employee);
      return employee;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'ASC', // "DESC"
      },
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee)
      throw new NotFoundException(`Employee with id: ${id} not found`);
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.preload({
      id: id,
      ...updateEmployeeDto,
    });

    if (!employee)
      throw new NotFoundException(`Category with id: ${id} not found`);

    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.details);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
