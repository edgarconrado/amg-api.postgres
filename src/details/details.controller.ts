import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/employees/decorators';
import { DetailsService } from './details.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Detail } from './entities/detail.entity';

@Controller('details')
@ApiTags('Detalles')
@Auth()
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Details Created',
    type: Detail,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Detail Found',
    type: Detail,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.detailsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detail Found',
    type: Detail,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.detailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Detail updated',
    type: Detail,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailsService.update(+id, updateDetailDto);
  }
}
