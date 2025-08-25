import { ProductRepository } from "../../domain/repositories/product.repository";
import { UpdateProductDTO } from "../dtos/update-product.dto";

export class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(dto: UpdateProductDTO) {
        const result = await this.productRepository.update(dto);
        return result;
    }
}