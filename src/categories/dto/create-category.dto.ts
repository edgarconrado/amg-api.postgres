import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nombre de la Categoria', example: 'Nieves' })
  @IsString()
  name: string;
}
