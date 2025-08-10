"use server"
import { EstablishmentFetchRepositoryImpl } from "@/features/establishment/infraestructure/establishment.fetch.repository.impl";
import { CreateEstablishmentUseCase } from "@/features/establishment/application/use-case/create.establishment.use-case"
import { CreateEstablishmentDTO } from "../application/dtos/create-establishment.dto";

export async function createEstablishmentAction(dto: CreateEstablishmentDTO){
        // Inyección de las dependencias
        const establishmentRepository = new EstablishmentFetchRepositoryImpl();
        const createEstablishmentUseCase = new CreateEstablishmentUseCase(establishmentRepository);

        const resp = await createEstablishmentUseCase.execute(dto);
        return {
                ...resp
        };
}