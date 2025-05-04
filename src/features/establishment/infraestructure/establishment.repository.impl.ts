import { EstablishmentEntity } from "@/features/establishment/domain/entities/establishment.entity";
import { EstablishmentRepository } from "@/features/establishment/domain/repositories/establishment.repository";
import { ErrorEntity } from "@/shared/features/error.entity";

export class EstablishmentRepositoryImpl implements EstablishmentRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/establishments`
    
    async save(data:{name:string}):Promise<EstablishmentEntity|ErrorEntity>{
        try {
            const response = await fetch(`${this.URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return await response.json() as ErrorEntity;
            }
    
            return await response.json() as EstablishmentEntity;
    
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }
}