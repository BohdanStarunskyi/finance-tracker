import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { JwtAuthService } from "src/shared/jwt/jwt.service";
import { CategoriesService } from "./categories.service";
import { CategoryDto, CreateCategoryDto } from "./models/categories";

@Controller("/api")
export class CategoriesController {
   
    constructor(
        private readonly jwtAuthService: JwtAuthService,
        private readonly categoriesService: CategoriesService,
    ) { }
    
    @Get('/category/:id')
    @UseGuards(AuthGuard)
    async getCategory(
        @Headers('authorization') token: string,
        @Param("id") id: number
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.categoriesService.getCategoryDto(id, user);
    }

    @Get('/categories')
    @UseGuards(AuthGuard)
    async getCategories(
        @Headers('authorization') token: string,
        @Query('offset') offset: number = 0,
        @Query('limit') limit: number = 10
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.categoriesService.getCategories(offset, limit, user);
    }

    @Post('/category/add')
    @UseGuards(AuthGuard)
    async addCategory(
        @Headers('authorization') token: string,
        @Body() category: CreateCategoryDto
    ) {
        const user = await this.jwtAuthService.decode(token);
        return await this.categoriesService.createCategory(category, user);
    }

    @Put('/category/update')
    @UseGuards(AuthGuard)
    async editCategory(
        @Headers('authorization') token: string,
        @Body() category: CategoryDto
    ){
        const user = await this.jwtAuthService.decode(token);
        return await this.categoriesService.updateCategory(category, user);
    }

    @Delete('category/delete/:id')
    @UseGuards(AuthGuard)
    async deleteCategory(
        @Headers('authorization') token: string,
        @Param("id") id: number
    ){
        const user = await this.jwtAuthService.decode(token);
        return await this.categoriesService.deleteCategory(id, user);
    }

}