import { Result } from "@/shared/features/result";
import { ErrorEntity } from "@/shared/features/error.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class DeleteCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(categoryId: string): Promise<Result<boolean, ErrorEntity>> {
        return await this.categoryRepository.delete(categoryId);
    }
}
