'use server'
import { RegisterUserWithEmployeeDTO } from "../application/dtos/register-user-with-employee.dto";
import { RegisterUserWithEmployeeUseCase } from "../application/use-cases/register-user-with-employee.use-case";
import { UserFetchRepositoryImpl } from "../infraestructure/user-fetch-repository.impl";

export async function registerUserWithEmployeeAction(dto: RegisterUserWithEmployeeDTO){
    const userFetchRepositoryImpl = new UserFetchRepositoryImpl();
    const registerUserWithEmployeeUseCase = new RegisterUserWithEmployeeUseCase(userFetchRepositoryImpl);

    const result = await registerUserWithEmployeeUseCase.execute(dto);
    
    return {
        ...result
    }
}