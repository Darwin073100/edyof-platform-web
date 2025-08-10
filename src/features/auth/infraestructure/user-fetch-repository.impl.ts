import { Result } from "@/shared/features/result";
import { ErrorEntity } from "@/shared/features/error.entity";
import { UserRepository } from "../domain/repositories/user.repository";
import { RegisterUserWithEmployeeDTO } from "../application/dtos/register-user-with-employee.dto";

export class UserFetchRepositoryImpl implements UserRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/users`;

    async saveWithEmployee(dto: RegisterUserWithEmployeeDTO): Promise<Result<any, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}/with-employee`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto)
            });  
            if(!result.ok){
                const error = await result.json() as ErrorEntity;
                return Result.failure(error);
            }

            const response = await result.json() as any;
            return Result.success(response);
        } catch (error:any) {
            console.log(error);

            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al servidor.',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/users/with-employee`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
}