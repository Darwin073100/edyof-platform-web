'use server'
import { ViewAllProductsUseCase } from "../application/use-case/view-all-products.use-case";
import { ProductFetchRepositoryImpl } from "../infraestructure/repositories/product-fetch-repository.impl";

export async function viewAllProductsAction(){
    const productFetchRepositoryImpl = new ProductFetchRepositoryImpl();
    const viewAllProductsUseCase = new ViewAllProductsUseCase(productFetchRepositoryImpl);

    const result = await viewAllProductsUseCase.execute();
    return {
        ...result
    }
}