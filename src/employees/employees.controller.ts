import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser, RawHeaders } from './decorators';
import { CreateEmployeeDto, LoginUserDto, UpdateEmployeeDto } from './dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';

@Controller('employees')
@ApiTags('Empleados')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Employee Created',
    type: Employee,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.employeesService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: Employee,
    @GetUser('userName') user_name: string,
    @RawHeaders() rawHeader: string[],
  ) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      user_name,
      rawHeader,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: Employee) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @ApiBearerAuth('JWT-auth')
  @Auth()
  testingPrivateRoute3(@GetUser() user: Employee) {
    return {
      ok: true,
      user,
    };
  }

  @Get('check-auth-status')
  @Auth(ValidRoles.user)
  @ApiResponse({
    status: 200,
    description: 'token updated',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  checkAuthStatus(@GetUser() user: Employee) {
    return this.employeesService.checkStatus(user);
  }

  @Get()
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Employees found',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.employeesService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Employee Found',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Employee updated',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({
    status: 200,
    description: 'Employee Removed',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidded. Token related' })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
