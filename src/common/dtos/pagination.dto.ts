import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Limite de Registros a mostrar',
    example: '10',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'A partir de que registro va a mostrar',
    example: '0',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
