import { Result } from "@/shared/features/result";
import { CategoryEntity } from "../entities/category.entity";
import { ErrorEntity } from "@/shared/features/error.entity";
import { RegisterCategoryDTO } from "../../application/dtos/register-category.dto";

export interface CategoryRepository{
    save(entity: RegisterCategoryDTO): Promise<Result<CategoryEntity, ErrorEntity>>
    findAll(): Promise<Result<{categories: CategoryEntity[]}, ErrorEntity>>
}