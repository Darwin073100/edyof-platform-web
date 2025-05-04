import { ErrorEntity } from "@/shared/features/error.entity";
import { EstablishmentRepository } from "../../domain/repositories/establishment.repository";
import { EstablishmentEntity } from "../../domain/entities/establishment.entity";

export class EstablishmentService{
    constructor(
        private readonly establishmentRepository: EstablishmentRepository,
    ){}

    async save(name: string): Promise<EstablishmentEntity|ErrorEntity>{
        return await this.establishmentRepository
            .save({
                name
        });
    }

}