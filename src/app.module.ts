import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './shared/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from './shared/jwt/jwt.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtAuthModule,
    DbModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }