import { DependencyFactory } from "@/shared/infrastructure/di/dependency-factory";
import { CategoryFetchRepositoryImpl } from "../category-fetch-repository.imp";

export class CategoryRepositoryFactory {
    static create(): CategoryFetchRepositoryImpl {
        const httpClient = DependencyFactory.getHttpClient();
        const apiConfig = DependencyFactory.getApiConfig();
        
        return new CategoryFetchRepositoryImpl(httpClient, apiConfig);
    }
}
