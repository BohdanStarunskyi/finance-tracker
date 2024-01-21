import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/shared/entities/category.entity";
import { ExpenseEntity } from "src/shared/entities/expense.entity";
import { UserEntity } from "src/shared/entities/user.entity";
import { IdDto } from "src/shared/model/basic";
import { User } from "src/shared/model/user";
import { Repository } from "typeorm";
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto } from "./models/expenses";

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(ExpenseEntity)
        private expenseRepository: Repository<ExpenseEntity>,

        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) { }

    async getExpenseEntity(id: number, user: User): Promise<ExpenseEntity> {
        const property = await this.expenseRepository.findOne({
            where: { id, user: { id: user.id } },
            relations: ['category']
        });
        if (!property) {
            throw new HttpException("no such expense", HttpStatus.BAD_REQUEST);
        }
        return property;
    }

    async getCategoryEntity(id: number, user: User): Promise<CategoryEntity> {
        const property = await this.categoryRepository.findOne({
            where: { id: id, user: { id: user.id } }
        });
        if (!property) {
            throw new HttpException("no such category", HttpStatus.BAD_REQUEST);
        }
        return property;
    }


    async createExpense(request: CreateExpenseDto, user: User): Promise<ExpenseDto> {
        await this.getCategoryEntity(request?.categoryId, user);
        console.log(request.note)
        const result = await this.expenseRepository.save(
            new ExpenseEntity({
                name: request?.name,
                user: new UserEntity({ id: user?.id }),
                amount: request?.amount,
                note: request?.note,
                category: new CategoryEntity({ id: request.categoryId })
            })
        );
        return new ExpenseDto(result);
    }

    async updateExpense(expense: UpdateExpenseDto, user: User): Promise<ExpenseDto> {
        await this.getCategoryEntity(expense.categoryId, user);
        await this.getExpenseEntity(expense.id, user);
        const entity = new ExpenseEntity({
            id: expense?.id,
            amount: expense?.amount,
            name: expense?.name,
            note: expense?.note,
            user: new UserEntity({id: user?.id}),
            category: new CategoryEntity({id: expense.categoryId})
        })
        const result = await this.expenseRepository.save(entity);
        return new ExpenseDto(result);
    }

    async deleteExpense(id: number, user: User): Promise<IdDto> {
        const property = await this.getExpenseEntity(id, user);
        const result = await this.expenseRepository.delete(new ExpenseEntity({ id: property.id }));
        if (result.affected == 0) {
            throw new HttpException("the expense wasn't deleted", HttpStatus.BAD_REQUEST);
        }
        return { id: property.id } as IdDto;
    }

    async getExpenseDto(id: number, user: User): Promise<ExpenseDto> {
        return new ExpenseDto(await this.getExpenseEntity(id, user));
    }

    async getExpenses(offset: number, limit: number, user: User): Promise<ExpenseDto[]> {
        return await this.expenseRepository.find({
            where: { user: { id: user?.id } },
            order: { id: 'DESC' },
            take: limit,
            skip: offset,
            relations: ['category']
        });
    }


}