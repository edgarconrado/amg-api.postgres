import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/employees/decorators';
import { ValidRoles } from 'src/employees/interfaces';
import { Product } from './entities/product.entity';

@Controller('products')
@ApiTags('Productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Products found',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Products updated',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Products removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
