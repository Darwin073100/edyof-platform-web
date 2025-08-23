import { BrandRepository } from '../domain/repositories/brand.repository';
import { Result } from '@/shared/features/result';

export class DeleteBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(brandId: string): Promise<Result<void>> {
    try {
      await this.brandRepository.delete(brandId);
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }
}
