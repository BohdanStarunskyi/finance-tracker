import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;
    
    constructor(
        category: Partial<CreateCategoryDto>
    ) {
        Object.assign(this, category);
    }
}

export class CategoryDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 

    @IsNotEmpty()
    name: string;

    constructor(
        category: Partial<CategoryDto>
    ) {
        Object.assign(this, category);
    }
}