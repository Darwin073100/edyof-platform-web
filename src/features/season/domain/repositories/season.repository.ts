import { Result } from "@/shared/features/result"
import { SeasonEntity } from "../entities/season.entity"
import { ErrorEntity } from "@/shared/features/error.entity"
import { RegisterSeasonDTO } from "../../application/dtos/register-season.dto"

export interface SeasonRepository{
    save(dto: RegisterSeasonDTO): Promise<Result<SeasonEntity, ErrorEntity>>
    findAll(): Promise<Result<{seasons: SeasonEntity[]}, ErrorEntity>>
}