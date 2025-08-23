import { BrandRepository } from '../domain/repositories/brand.repository';
import { UpdateBrandDTO } from './dtos/update-brand.dto';
import { Result } from '@/shared/features/result';

export class UpdateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(updateBrandDTO: UpdateBrandDTO): Promise<Result<void>> {
    try {
      await this.brandRepository.update(updateBrandDTO);
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }
}
