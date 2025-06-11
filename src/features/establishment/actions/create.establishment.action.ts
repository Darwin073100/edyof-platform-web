"use server"
import { EstablishmentFetchRepositoryImpl } from "@/features/establishment/infraestructure/establishment.fetch.repository.impl";
import { CreateEstablishmentUseCase } from "@/features/establishment/application/use-case/create.establishment.use-case"

export async function createEstablishmentAction(name: string){
        // Inyección de las dependencias
        const establishmentRepository = new EstablishmentFetchRepositoryImpl();
        const createEstablishmentUseCase = new CreateEstablishmentUseCase(establishmentRepository);

        const resp = await createEstablishmentUseCase.execute(name);
        return {
                ...resp
        };
}