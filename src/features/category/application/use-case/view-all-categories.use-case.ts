import { CategoryRepository } from "../../domain/repositories/category.repository";

export class ViewAllCategoriesUseCase{
    constructor(
        private readonly repository: CategoryRepository
    ){}

    async execute(){
        const result = await this.repository.findAll();
        return result;
    }
}