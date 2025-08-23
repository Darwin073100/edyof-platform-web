import { DependencyFactory } from '@/shared/infrastructure/di/dependency-factory';
import { BrandRepository } from '@/features/brand/domain/repositories/brand.repository';
import { BrandFetchRepositoryImpl } from '@/features/brand/infraestructure/brand-fetch-repository.impl';

export class BrandRepositoryFactory {
  static create(): BrandRepository {
    const httpClient = DependencyFactory.getHttpClient();
    const apiConfig = DependencyFactory.getApiConfig();
    
    return new BrandFetchRepositoryImpl(httpClient, apiConfig);
  }
}
