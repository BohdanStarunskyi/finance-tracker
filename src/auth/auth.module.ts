import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { JwtAuthModule } from 'src/shared/jwt/jwt.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthService } from 'src/shared/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService],
  exports: [AuthService]
})
export class AuthModule {}
