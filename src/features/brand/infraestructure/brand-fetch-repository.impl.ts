import { Result } from "@/shared/features/result";
import { BrandEntity } from "../domain/entities/brand.entity";
import { BrandRepository } from "../domain/repositories/brand.repository";
import { ErrorEntity } from "@/shared/features/error.entity";
import { RegisterBrandDTO } from "../application/dtos/register-brand.dto";

export class BrandFetchRepositoryImpl implements BrandRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/brands`;

    async save(dto: RegisterBrandDTO): Promise<Result<BrandEntity, ErrorEntity>> {

        try {
            const result = await fetch(`${this.URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });
            if (!result.ok) {
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }

            const brand = await result.json() as BrandEntity;
            return Result.success(brand)
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/brands`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }

    async findAll(): Promise<Result<{ brands: BrandEntity[]; }, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}`, {
                method: 'GET'
            });

            if (!result.ok) {
                const errorResponse = await result.json() as ErrorEntity;
                return Result.failure(errorResponse);
            }

            const brandsResponse = await result.json() as { brands: BrandEntity[] }
            return Result.success(brandsResponse);
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/brands`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
}