'use server'
import { CreateBranchOfficeDTO } from "../application/dtos/create-branch-office.dto";
import { CreateNewBranchOfficeUseCase } from "../application/use-case/create.new.branch-office.use-case";
import { BranchOfficeFetchRepositoryImpl } from "../infraestructure/branch-office.fetch.repository.impl"

export async function createNewBranchOfficeAction(data:CreateBranchOfficeDTO){
    let branchOfficeFetchRepositoryImpl = new BranchOfficeFetchRepositoryImpl();
    let createNewBranchOfficeUseCase = new CreateNewBranchOfficeUseCase(branchOfficeFetchRepositoryImpl);

    const result = await createNewBranchOfficeUseCase.execute(data);
    
    return {
        ...result
    }
}