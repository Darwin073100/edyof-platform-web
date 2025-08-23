import { Result } from "@/shared/features/result";
import { ErrorEntity } from "@/shared/features/error.entity";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { UpdateCategoryDTO } from "../dtos/update-category.dto";

export class UpdateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(dto: UpdateCategoryDTO): Promise<Result<CategoryEntity, ErrorEntity>> {
        return await this.categoryRepository.update(dto);
    }
}
