import { RegisterSeasonDTO } from "../../application/dtos/register-season.dto";
import { RegisterSeasonHttpDTO } from "../dtos/register-season-http.dto";

export class SeasonMapper{
    static toHttpDto(dto: RegisterSeasonDTO): RegisterSeasonHttpDTO {
        return {
            name: dto.name,
            description: dto.description? dto.description: undefined,
            dateInit: dto.dateInit ? dto.dateInit.toISOString() : undefined,
            dateFinish: dto.dateFinish ? dto.dateFinish.toISOString() : undefined
        };

    }
}