import { SeasonRepository } from "../../domain/repositories/season.repository";
import { RegisterSeasonDTO } from "../dtos/register-season.dto";

export class RegisterSeasonUseCase{
    constructor(
        private readonly repository: SeasonRepository
    ){}

    async execute(dto: RegisterSeasonDTO){
        let dateInit = new Date().toJSON();
        let dateFinish = new Date().toJSON();

        if(dto.dateInit && dto.dateFinish ){
            dateInit = new Date(dto.dateInit).toJSON();
            dateFinish = new Date(dto.dateFinish).toJSON();
        }
        const requestData: RegisterSeasonDTO = {
            ...dto,
            dateInit: dateInit,
            dateFinish: dateFinish
        }
        
        const result = await this.repository.save(requestData);
        return result;
    }
}