"use server"
import { EstablishmentFetchRepositoryImpl } from "@/features/establishment/infraestructure/establishment.fetch.repository.impl";
import { EstablishmentService } from "@/features/establishment/application/service/establishment.service";
import { CreateEstablishmentUseCase } from "@/features/establishment/application/use-case/create.establishment.use-case"

export async function createEstablishmentAction(name: string){
        // Inyección de las dependencias
        const establishmentRepository = new EstablishmentFetchRepositoryImpl();
        const establishmentService = new EstablishmentService(establishmentRepository);
        const createEstablishmentUseCase = new CreateEstablishmentUseCase(establishmentService);

        const resp = await createEstablishmentUseCase.execute(name);
        return {
                ...resp
        };
}