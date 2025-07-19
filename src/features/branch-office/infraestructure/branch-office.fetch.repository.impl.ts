"use server"
import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { BranchOfficeInterface } from "../domain/entities/branch-office.interface";
import { BranchOfficeRepository } from "../domain/repositories/branch-office.repository";

export class BranchOfficeFetchRepositoryImpl implements BranchOfficeRepository{
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/branch-offices`;
    
    async save(data: BranchOfficeInterface): Promise<Result<BranchOfficeInterface, ErrorEntity>> {
        let dataBody = {
            name: data.name,
            establishmentId: data.establishmentId.toString(),
            street: data.street,
            country: data.country,
            internalNumber: data.internalNumber,
            externalNumber: data.externalNumber,
            postalCode: data.postalCode,
            neighborhood: data.neighborhood,
            municipality: data.municipality,
            city: data.city,
            state: data.state,
            reference: data.reference
        }
        
        if(!dataBody.reference)delete dataBody.reference;
    

        try {
            console.log(JSON.stringify(dataBody))
            const response = await fetch(`${this.URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataBody),
            });

            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }

            const branchOffice = await response.json() as BranchOfficeInterface;
            return Result.success(branchOffice);

        } catch (error: any) {

            console.log(error);
            
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/branch-offices`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }

}