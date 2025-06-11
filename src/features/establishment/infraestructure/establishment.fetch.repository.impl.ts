import { EstablishmentEntity } from "@/features/establishment/domain/entities/establishment.entity";
import { EstablishmentRepository } from "@/features/establishment/domain/repositories/establishment.repository";
import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";

export class EstablishmentFetchRepositoryImpl implements EstablishmentRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/establishments`
    
    async save(data:{name:string}):Promise<Result<EstablishmentEntity,ErrorEntity>>{
        try {
            const response = await fetch(`${this.URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }
    
            const establishment = await response.json() as EstablishmentEntity;
            return Result.success(establishment);
    
        } catch (error:any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
            } satisfies ErrorEntity);
        }
    }
}