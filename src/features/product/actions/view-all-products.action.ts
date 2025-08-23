'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllProductsUseCase } from "../application/use-case/view-all-products.use-case";
import { ProductFetchRepositoryImpl } from "../infraestructure/repositories/product-fetch-repository.impl";

export async function viewAllProductsAction(){
    noStore(); // Evitar que se cachée este server action
    
    const productFetchRepositoryImpl = new ProductFetchRepositoryImpl();
    const viewAllProductsUseCase = new ViewAllProductsUseCase(productFetchRepositoryImpl);

    const result = await viewAllProductsUseCase.execute();
    return {
        ...result
    }
}