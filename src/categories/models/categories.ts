import { IsNotEmpty } from "class-validator";

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
    id: number; 
    name: string;

    constructor(
        category: Partial<CategoryDto>
    ) {
        Object.assign(this, category);
    }
}