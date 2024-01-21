import { Body, Controller, DefaultValuePipe, Delete, Get, Headers, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { validate } from "class-validator";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { JwtAuthService } from "src/shared/jwt/jwt.service";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto } from "./models/expenses";

@Controller("/api")
export class ExpensesController {

    constructor(
        private readonly jwtAuthService: JwtAuthService,
        private readonly expensesService: ExpensesService,
    ) { }

    @Get('/expense/:id')
    @UseGuards(AuthGuard)
    async getExpense(
        @Headers('authorization') token: string,
        @Param("id") id: number
    ) {
        if (!id) {
            throw new HttpException("id shouldn't be empty", HttpStatus.BAD_REQUEST);
        }
        const user = await this.jwtAuthService.decode(token);
        return await this.expensesService.getExpenseDto(id, user);
    }

    @Get('/expenses')
    @UseGuards(AuthGuard)
    async getExpenses(
        @Headers('authorization') token: string,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.expensesService.getExpenses(offset, limit, user);
    }

    @Post('/expense/add')
    @UseGuards(AuthGuard)
    async addExpense(
        @Headers('authorization') token: string,
        @Body(new ValidationPipe({ whitelist: true })) expense: CreateExpenseDto
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.expensesService.createExpense(expense, user);
    }

    @Put('/expense/update')
    @UseGuards(AuthGuard)
    async editExpense(
        @Headers('authorization') token: string,
        @Body(new ValidationPipe({ whitelist: true })) expense: UpdateExpenseDto
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.expensesService.updateExpense(expense, user);
    }

    @Delete('/expense/delete/:id')
    @UseGuards(AuthGuard)
    async deleteExpense(
        @Headers('authorization') token: string,
        @Param("id") id: number
    ) {
        if (!id) {
            throw new HttpException("id shouldn't be empty", HttpStatus.BAD_REQUEST);
        }
        const user = await this.jwtAuthService.decode(token);
        return await this.expensesService.deleteExpense(id, user);
    }

}