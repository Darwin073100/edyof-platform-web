import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductFetchRepositoryImpl } from "../repositories/product-fetch-repository.impl";
import { DependencyFactory } from "@/shared/infrastructure/di/dependency-factory";

/**
 * Factory para crear repositorios de Product con dependencias inyectadas
 */
export class ProductRepositoryFactory {
    /**
     * Crea una instancia del repositorio de productos con todas sus dependencias
     */
    static create(): ProductRepository {
        const httpClient = DependencyFactory.getHttpClient();
        const apiConfig = DependencyFactory.getApiConfig();
        
        return new ProductFetchRepositoryImpl(httpClient, apiConfig);
    }
}
