import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { JwrPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwrPayload): Promise<Employee> {
    const { id } = payload;
    const user = await this.employeeRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('Token is not valid');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'El usuario esta inactivo, contacte al administrador del sistema',
      );
    }
    return user;
  }
}
