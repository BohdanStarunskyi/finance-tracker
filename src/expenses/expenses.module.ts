import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseEntity } from "src/shared/entities/expense.entity";
import { JwtAuthModule } from "src/shared/jwt/jwt.module";
import { JwtAuthService } from "src/shared/jwt/jwt.service";
import { ExpensesService } from "./expenses.service";
import { ExpensesController } from "./expenses.controller";
import { CategoryEntity } from "src/shared/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ExpenseEntity, CategoryEntity]), JwtAuthModule, PassportModule],
    controllers: [ExpensesController],
    providers: [ExpensesService, JwtAuthService]
  })
export class ExpensesModule {}
  