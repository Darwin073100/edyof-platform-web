import { BrandRepository } from "../../domain/repositories/brand.repository";
import { RegisterBrandDTO } from "../dtos/register-brand.dto";

export class RegisterBrandUseCase{
    constructor(
        private readonly repository: BrandRepository
    ){}

    async execute (dto: RegisterBrandDTO){
        const result = await this.repository.save(dto); 
        return result;
    }
}