import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'user Name del empleado',
    example: 'edgar_conrado',
  })
  @IsString()
  user_name: string;

  @ApiProperty({
    description: 'Password de acceso del empleado',
    example: 'D54321',
  })
  @IsString()
  @MinLength(3)
  password: string;
}
