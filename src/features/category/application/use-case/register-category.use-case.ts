import { CategoryRepository } from "../../domain/repositories/category.repository";
import { RegisterCategoryDTO } from "../dtos/register-category.dto";

export class RegisterCategoryUseCase{
    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute(dto: RegisterCategoryDTO){
        if(!dto.description && dto.description?.length === 0){
            delete dto.description;
        }

        const result = await this.categoryRepository.save(dto);
        return result;
    }
}