'use server'
import { BranchOfficeService } from "../application/service/branch-office.service";
import { CreateNewBranchOfficeUseCase } from "../application/use-case/create.new.branch-office.use-case";
import { BranchOfficeInterface } from "../domain/entities/branch-office.interface";
import { BranchOfficeFetchRepositoryImpl } from "../infraestructure/branch-office.fetch.repository.impl"

export async function createNewBranchOfficeAction(data:BranchOfficeInterface){
    let branchOfficeFetchRepositoryImpl = new BranchOfficeFetchRepositoryImpl();
    let branchOfficeService = new BranchOfficeService(branchOfficeFetchRepositoryImpl);
    let createNewBranchOfficeUseCase = new CreateNewBranchOfficeUseCase(branchOfficeService);

    const result = await createNewBranchOfficeUseCase.execute(data);
    
    return {
        ...result
    }
}