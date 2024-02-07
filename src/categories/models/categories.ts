import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsEmoji } from "src/shared/validators/emoji.validator";
import { IsHexString6 } from "src/shared/validators/hex.validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEmoji()
    emoji: string;

    @IsNotEmpty()
    @IsHexString6()
    @IsString()
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
    @IsHexString6()
    @IsString()
    color: string;

    constructor(
        category: Partial<CategoryDto>
    ) {
        Object.assign(this, category);
    }
}