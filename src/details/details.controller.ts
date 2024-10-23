import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';

@Controller('details')
@ApiTags('Detalles')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.detailsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailsService.update(+id, updateDetailDto);
  }
}
