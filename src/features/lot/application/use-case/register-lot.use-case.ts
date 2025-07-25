import { LotRepository } from "../../domain/repositories/lot.repository";
import { RegisterLotDTO } from "../dtos/register-lot.dto";

export class RegisterLotUseCase{
    constructor(
        private readonly repository: LotRepository
    ){}

    async execute(dto: RegisterLotDTO){
        const result = await this.repository.save(dto);
        return result; 
    }
}