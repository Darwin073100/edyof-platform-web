import { ErrorEntity } from "@/shared/features/error.entity";
import { EstablishmentEntity } from "../entities/establishment.entity";

export interface EstablishmentRepository{
    save(data:{name: string}):Promise<EstablishmentEntity|ErrorEntity>;
}