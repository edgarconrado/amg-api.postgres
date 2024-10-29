import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, LoginUserDto, UpdateEmployeeDto } from './dto';
import { Employee } from './entities/employee.entity';
import { JwrPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { password, ...userData } = createEmployeeDto;

      const employee = this.employeeRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.employeeRepository.save(employee);
      delete employee.password;
      return {
        ...employee,
        token: this.getJwtToken({ id: employee.id }),
      };
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
        id: 'ASC',
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

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, user_name } = loginUserDto;

      const user = await this.employeeRepository.findOne({
        where: { user_name },
        select: { user_name: true, password: true, id: true },
      });

      if (!user) {
        throw new UnauthorizedException('Creadenciales are not valid (email)');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Creadenciales are not valid (email)');
      }

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async checkStatus(user: Employee) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwrPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.details);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
