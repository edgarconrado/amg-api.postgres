import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class DetailsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async create(createDetailDto: CreateDetailDto) {
    try {
      const { productId, saleId, ...detailDetail } = createDetailDto;

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      const sale = await this.saleRepository.findOne({
        where: { id: saleId },
      });

      const detail = this.detailRepository.create({
        ...detailDetail,
        product,
        sale,
      });
      await this.detailRepository.save(detail);
      return detail;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.detailRepository.find({
      take: limit,
      skip: offset,
      relations: ['sale', 'product'],
    });
  }

  async findOne(id: number) {
    const details = this.detailRepository.findOne({
      where: { id },
      relations: ['sale', 'product'],
      order: {
        id: 'ASC', // "DESC"
      },
    });
    if (!details)
      throw new NotFoundException(`Details with id ${id} not found`);
    return details;
  }

  async update(id: number, updateDetailDto: UpdateDetailDto) {
    const detail = await this.detailRepository.preload({
      id: id,
      ...updateDetailDto,
    });

    if (!detail) {
      throw new NotFoundException(`Details with id ${id} not found`);
    }

    return this.detailRepository.save(detail);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.details);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
