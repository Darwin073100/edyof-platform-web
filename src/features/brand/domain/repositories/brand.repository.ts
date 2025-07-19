import { ErrorEntity } from "@/shared/features/error.entity"
import { Result } from "@/shared/features/result"
import { BrandEntity } from "../entities/brand.entity"
import { RegisterBrandDTO } from "../../application/dtos/register-brand.dto"

export interface BrandRepository{
    save(dto: RegisterBrandDTO): Promise<Result<BrandEntity, ErrorEntity>>
    findAll(): Promise<Result<{brands: BrandEntity[]}, ErrorEntity>>
}