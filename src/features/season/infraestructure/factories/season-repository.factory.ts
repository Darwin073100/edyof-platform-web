import { DependencyFactory } from "@/shared/infrastructure/di/dependency-factory";
import { SeasonFetchRepositoryImpl } from "../repositories/season-fetch-repository.impl";

export class SeasonRepositoryFactory {
    static create(): SeasonFetchRepositoryImpl {
        const httpClient = DependencyFactory.getHttpClient();
        const apiConfig = DependencyFactory.getApiConfig();
        
        return new SeasonFetchRepositoryImpl(httpClient, apiConfig);
    }
}
