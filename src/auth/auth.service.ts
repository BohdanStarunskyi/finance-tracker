import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/shared/entities/user.entity';
import { User } from 'src/shared/model/user';
import { Repository } from 'typeorm';
import { AuthRequestDto } from './models/login';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async login(request: AuthRequestDto): Promise<User> {
    if (!request.email || !request.password) {
      throw new HttpException("Email and password can't be empty", HttpStatus.BAD_REQUEST);
    }

    const result = await this.userRepository.findOne({
      select: { id: true, email: true, password: true },
      where: { email: request?.email },
    });

    if (!result || !(await this.comparePasswords(request.password, result.password))) {
      throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
    }

    return { id: result?.id, email: request?.email } as User;
  }

  async signIn(request: AuthRequestDto): Promise<User> {
    const hashedPassword = await this.hashPassword(request?.password);

    const existingUser = await this.userRepository.findOne({
      where: { email: request?.email },
    });

    if (existingUser) {
      throw new HttpException('User already registered', HttpStatus.BAD_REQUEST);
    }

    const result = await this.userRepository.insert(
      new UserEntity({
        email: request?.email,
        password: hashedPassword,
      }),
    );
    return { id: +result.identifiers[0].id, email: request.email } as User;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}