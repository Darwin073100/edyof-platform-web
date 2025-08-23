import { Result } from "@/shared/features/result";
import { SeasonEntity } from "../../domain/entities/season.entity";
import { SeasonRepository } from "../../domain/repositories/season.repository";
import { ErrorEntity } from "@/shared/features/error.entity";
import { RegisterSeasonDTO } from "../../application/dtos/register-season.dto";
import { SeasonMapper } from "../mappers/season.mapper";
import { UpdateSeasonDTO } from "../../application/dtos/update-season.dto";

export class SeasonFetchRepositoryImpl implements SeasonRepository{
    
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/seasons`;

    async save(dto: RegisterSeasonDTO): Promise<Result<SeasonEntity, ErrorEntity>> {
        try {
            const dtoHttp = SeasonMapper.toHttpDto(dto);
            const result = await fetch(`${this.URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtoHttp),
            });
            if(!result.ok){
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }

            const season = await result.json() as SeasonEntity;
            return Result.success(season)
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/seasons`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
    async update(dto: UpdateSeasonDTO): Promise<Result<SeasonEntity, ErrorEntity>> {
        try {
            const dtoHttp = SeasonMapper.toHttpUpdateDto(dto);
            const result = await fetch(`${this.URL}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtoHttp),
            });
            if(!result.ok){
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }

            const season = await result.json() as SeasonEntity;
            return Result.success(season)
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor.',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/seasons`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }

    async delete(seasonId: bigint): Promise<Result<boolean, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}/${seasonId}`, {
                method: 'DELETE',
            });
            if (!result.ok) {
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }
            return Result.success(true);
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor.',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/seasons`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }

    async findAll(): Promise<Result<{ seasons: SeasonEntity[]; }, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}`,{
                method: 'GET'
            });

            if(!result.ok){
                const errorResponse = await result.json() as ErrorEntity;
                return Result.failure(errorResponse);
            }

            const seasonsResponse = await result.json() as { seasons: SeasonEntity[]}
            return Result.success(seasonsResponse);
        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/seasons`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
}