import { ErrorEntity } from "@/shared/features/error.entity";
import type { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { EstablishmentService } from "../service/establishment.service";

export class CreateEstablishmentUseCase{
    constructor(
        private readonly service: EstablishmentService,
    ){}

    async execute(name: string): Promise<EstablishmentEntity|ErrorEntity>{
        return await this.service.save(name);
    }
}