import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/employees/decorators';
import { ValidRoles } from 'src/employees/interfaces';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('Categorias')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Category found',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 201,
    description: 'Category Found',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 201,
    description: 'category was updated',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Category Removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
