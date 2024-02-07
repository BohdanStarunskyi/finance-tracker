import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/shared/entities/category.entity";
import { Repository } from "typeorm";
import { CategoryDto, CreateCategoryDto } from "./models/categories";
import { User } from "src/shared/model/user";
import { UserEntity } from "src/shared/entities/user.entity";
import { STATUS_CODES } from "http";
import { IdDto } from "src/shared/model/basic";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,
    ) { }

    async getCategoryEntity(id: number, user: User): Promise<CategoryEntity> {
        const property = await this.categoryRepository.findOne({
            where: { id: id, user: {id: user.id} }
        });
        if(!property){
            throw new HttpException("no such category", HttpStatus.BAD_REQUEST);
        }
        return property;
    }

    async checkIfUniqueByName(name: string, user: User): Promise<CategoryEntity> {
        const property = await this.categoryRepository.findOne({
            where: { name: name, user: {id: user.id} }
        });
        if(property){
            throw new HttpException("such category already exists", HttpStatus.BAD_REQUEST);
        }
        return property;
    }

    async createCategory(request: CreateCategoryDto, user: User): Promise<CategoryDto> {
        await this.checkIfUniqueByName(request.name, user);
        const result = await this.categoryRepository.insert(
            new CategoryEntity({
                name: request?.name,
                user: new UserEntity({ id: user?.id }),
                color: request?.color,
                emoji: request?.emoji
            })
        );
        return new CategoryDto({ id: +result?.identifiers[0]?.id, name: request.name })
    }

    async updateCategory(category: CategoryDto, user: User): Promise<CategoryDto> {
        await this.getCategoryEntity(category.id, user);
        const result = await this.categoryRepository.save(category);
        return result;
    }

    async deleteCategory(id: number, user: User): Promise<IdDto>{
        const property =  await this.getCategoryEntity(id, user);
        await this.categoryRepository.delete( property);
        return {id:id} as IdDto;
    }

    async getCategoryDto(id: number, user: User): Promise<CategoryDto>{
        return new CategoryDto(await this.getCategoryEntity(id, user));
    }

    async getCategories(offset: number, limit: number, user: User): Promise<CategoryDto[]>{
        return await this.categoryRepository
        .createQueryBuilder()
        .select()
        .where({user: {id: user?.id}})
        .orderBy("id", "DESC")
        .offset(offset)
        .limit(limit)
        .getMany();
    }

   
}