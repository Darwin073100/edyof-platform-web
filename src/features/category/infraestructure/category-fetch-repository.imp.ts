import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { RegisterCategoryDTO } from "../application/dtos/register-category.dto";
import { CategoryEntity } from "../domain/entities/category.entity";
import { CategoryRepository } from "../domain/repositories/category.repository";

export class CategoryFetchRepositoryImpl implements CategoryRepository{
    
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/categories`;

    async save(entity: RegisterCategoryDTO): Promise<Result<CategoryEntity, ErrorEntity>> {
        
        try {
            const result = await fetch(`${this.URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity),
            });
            if(!result.ok){
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }

            const category = await result.json() as CategoryEntity;
            return Result.success(category)
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/categories`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }

    async findAll(): Promise<Result<{ categories: CategoryEntity[]; }, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}`,{
                method: 'GET'
            });

            if(!result.ok){
                const errorResponse = await result.json() as ErrorEntity;
                return Result.failure(errorResponse);
            }

            const categoriesResponse = await result.json() as { categories: CategoryEntity[]}
            return Result.success(categoriesResponse);
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/categories`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
}