'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllProductsUseCase } from "../application/use-case/view-all-products.use-case";
import { ProductRepositoryFactory } from "../infraestructure/factories/product-repository.factory";

export async function viewAllProductsAction(){
    noStore(); // Evitar que se cachée este server action
    
    try {
        // ✅ Usando DI - Las dependencias se inyectan automáticamente
        const productRepository = ProductRepositoryFactory.create();
        const viewAllProductsUseCase = new ViewAllProductsUseCase(productRepository);

        const result = await viewAllProductsUseCase.execute();
        
        return {
            ...result
        }
    } catch (error) {
        console.error('❌ Error en viewAllProductsAction:', error);
        throw error;
    }
}