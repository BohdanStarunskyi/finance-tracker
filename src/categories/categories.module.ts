import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/shared/entities/category.entity";
import { JwtAuthModule } from "src/shared/jwt/jwt.module";
import { JwtAuthService } from "src/shared/jwt/jwt.service";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), JwtAuthModule, PassportModule],
    controllers: [CategoriesController],
    providers: [CategoriesService, JwtAuthService]
  })
export class CategoriesModule {}
  