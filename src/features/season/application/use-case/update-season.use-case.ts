import { SeasonRepository } from "../../domain/repositories/season.repository";
import { UpdateSeasonDTO } from "../dtos/update-season.dto";

export class UpdateSeasonUseCase{
    constructor(
        private readonly repository: SeasonRepository
    ){}

    async execute(dto: UpdateSeasonDTO){
        const result = await this.repository.update(dto);
        return result;
    }
}