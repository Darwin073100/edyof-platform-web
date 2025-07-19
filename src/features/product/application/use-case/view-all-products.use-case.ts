import { ProductRepository } from "../../domain/repositories/product.repository";

export class ViewAllProductsUseCase{
    constructor(
        private readonly repository: ProductRepository
    ){}

    async execute(){
        const result = await this.repository.findAll();
        return result;
    }
}