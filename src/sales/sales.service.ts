import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class SalesService {
  private readonly logger = new Logger('SalesService');

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    try {
      const { employeeId, ...employeeDetail } = createSaleDto;
      const employee = await this.employeeRepository.findOne({
        where: { id: employeeId },
      });
      const sale = this.saleRepository.create({
        ...employeeDetail,
        employee,
      });
      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.saleRepository.find({
      take: limit,
      skip: offset,
      relations: ['employee'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const sale = this.saleRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!sale) throw new NotFoundException(`Sale with id: ${id} not found`);
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const sale = await this.saleRepository.preload({
      id: id,
      ...updateSaleDto,
    });

    if (!sale) throw new NotFoundException(`Sale with id: ${id} nor found`);

    return this.saleRepository.save(sale);
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    await this.saleRepository.remove(sale);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.details);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
