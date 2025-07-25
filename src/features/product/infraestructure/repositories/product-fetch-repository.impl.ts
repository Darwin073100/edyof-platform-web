import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { RegisterProductDTO } from "../../application/dtos/register-product.dto";
import { RegisterInitialProductDTO } from "../../application/dtos/register-initial-product.dto";
import { ProductMapper } from "../mappers/product.mapper";

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
                message: 'No se pudo conectar al servidor: Product',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/products`,
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }
    }

    async save(dto: RegisterProductDTO): Promise<Result<ProductEntity, ErrorEntity>> {
        try {
            const response = await fetch(`${this.URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }

            const inventory = await response.json() as ProductEntity;
            return Result.success(inventory);

        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor: Product',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/products`,
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }
    }
    
    async saveProductWithLotAndInventory(dto: RegisterInitialProductDTO): Promise<Result<ProductEntity, ErrorEntity>> {
        try {
            const dtoHttp = ProductMapper.toHttpMany(dto);
            const response = await fetch(`${this.URL}/with-lot-and-inventory-item`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtoHttp),
            });
    
            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }
    
            const inventory = await response.json() as ProductEntity;
            return Result.success(inventory);
    
        } catch (error: any) {
            console.log(error)
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor: Product',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/products/with-lot-and-inventory-item`,
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }  
    }
}