import { SeasonRepository } from "../../domain/repositories/season.repository";
import { RegisterSeasonDTO } from "../dtos/register-season.dto";

export class RegisterSeasonUseCase{
    constructor(
        private readonly repository: SeasonRepository
    ){}

    async execute(dto: RegisterSeasonDTO){
        const result = await this.repository.save(dto);
        return result;
    }
}