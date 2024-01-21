import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CategoryDto } from "src/categories/models/categories";

export class CreateExpenseDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsOptional()
    note: string;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
    
    constructor(
        expense: Partial<CreateExpenseDto>
    ) {
        Object.assign(this, expense);
    }
}

export class ExpenseDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsOptional()
    note: string;

    @IsOptional()
    category: CategoryDto;

    @IsOptional()
    createdDate: Date;

    constructor(
        expense: Partial<ExpenseDto>
    ) {
        Object.assign(this, expense);
    }
}

export class UpdateExpenseDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsOptional()
    note: string;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsOptional()
    createdDate: Date;

    constructor(
        expense: Partial<ExpenseDto>
    ) {
        Object.assign(this, expense);
    }
}