import { ErrorEntity } from "@/shared/features/error.entity";
import { EstablishmentEntity } from "../entities/establishment.entity";
import { Result } from "@/shared/features/result";

export interface EstablishmentRepository{
    save(data:{name: string}):Promise<Result<EstablishmentEntity,ErrorEntity>>;
}