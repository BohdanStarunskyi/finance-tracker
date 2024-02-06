import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, Validate } from "class-validator";
import { ContainsEmoji, IsEmoji } from "src/shared/validators/emoji.validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEmoji()
    emoji: string;

    @IsNotEmpty()
    @IsHexColor()
    color: string;

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

    @IsOptional()
    @IsEmoji()
    emoji: string;

    @IsNotEmpty()
    @IsHexColor()
    color: string;

    constructor(
        category: Partial<CategoryDto>
    ) {
        Object.assign(this, category);
    }
}