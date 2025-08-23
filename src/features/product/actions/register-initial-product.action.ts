'use server'
import { revalidatePath } from 'next/cache';
import { RegisterInitialProductDTO } from "../application/dtos/register-initial-product.dto";
import { RegisterProductUseCase } from "../application/use-case/register-product.use-case";
import { ProductFetchRepositoryImpl } from "../infraestructure/repositories/product-fetch-repository.impl";

export async function registerInitialProductAction(dto:RegisterInitialProductDTO){
    const productFetchRepositoryImpl = new ProductFetchRepositoryImpl();
    
    const registerProductUseCase = new RegisterProductUseCase(
        productFetchRepositoryImpl,
    );

    const result = await registerProductUseCase.execute(dto);

    // Invalidar el caché de la página de productos para que se actualicen los datos
    if (result?.ok) {
        revalidatePath('/products');
    }

    return {
        ...result
    }
}