'use server'
import { RegisterInitialProductDTO } from "../application/dtos/register-initial-product.dto";
import { RegisterProductUseCase } from "../application/use-case/register-product.use-case";
import { ProductFetchRepositoryImpl } from "../infraestructure/repositories/product-fetch-repository.impl";

export async function registerInitialProductAction(dto:RegisterInitialProductDTO){
    const productFetchRepositoryImpl = new ProductFetchRepositoryImpl();
    
    const registerProductUseCase = new RegisterProductUseCase(
        productFetchRepositoryImpl,
    );

    const result = await registerProductUseCase.execute(dto);

    return {
        ...result
    }
}