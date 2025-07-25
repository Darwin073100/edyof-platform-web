import { ProductRepository } from "../../domain/repositories/product.repository";
import { RegisterInitialProductDTO } from "../dtos/register-initial-product.dto";

export class RegisterProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(dto: RegisterInitialProductDTO) {
        const result = await this.productRepository.saveProductWithLotAndInventory(dto);
        return result;
    }
}