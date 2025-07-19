import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { ProductEntity } from "../domain/entities/product.entity";
import { ProductRepository } from "../domain/repositories/product.repository";

export class ProductFetchRepositoryImpl implements ProductRepository{
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/products`;
    
    async findAll(): Promise<Result<{products: ProductEntity[]}, ErrorEntity>> {
        try {
            const response = await fetch(`${this.URL}`,{
                method: 'GET'
            });

            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }

            const inventory = await response.json() as { products: ProductEntity[] };
            return Result.success(inventory);

        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/products`,
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }
    }
}