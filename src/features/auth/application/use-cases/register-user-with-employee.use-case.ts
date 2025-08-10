import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterUserWithEmployeeDTO } from "../dtos/register-user-with-employee.dto";

export class RegisterUserWithEmployeeUseCase{
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async execute(dto: RegisterUserWithEmployeeDTO){
        const result = await this.userRepository.saveWithEmployee(dto);
        return result;
    }
}