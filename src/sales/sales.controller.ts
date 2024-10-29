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
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
@ApiTags('Ventas')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Auth()
  @ApiResponse({
    status: 201,
    description: 'Sale Created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Saled Found',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.salesService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Sale Found',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Sale updated',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Sale Removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
