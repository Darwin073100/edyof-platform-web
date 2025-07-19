import { Result } from "@/shared/features/result";
import { ProductEntity } from "../entities/product.entity";
import { ErrorEntity } from "@/shared/features/error.entity";

export interface ProductRepository{
    findAll():Promise<Result<{products: ProductEntity[]}, ErrorEntity>>
}