import { SeasonRepository } from "../../domain/repositories/season.repository";

export class DeleteSeasonUseCase{
    constructor(
        private readonly repository: SeasonRepository
    ){}

    async execute(seasonId: bigint){
        const result = await this.repository.delete(seasonId);
        return result;
    }
}