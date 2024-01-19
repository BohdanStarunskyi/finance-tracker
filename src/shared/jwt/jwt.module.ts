import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
    imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET
      }),
    ],
    exports: [JwtModule],
  })
  export class JwtAuthModule {}
