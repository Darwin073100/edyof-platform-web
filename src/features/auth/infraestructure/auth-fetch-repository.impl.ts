import { Result } from "@/shared/features/result";
import { ErrorEntity } from "@/shared/features/error.entity";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthAccesTokenDTO } from "../application/dtos/auth.access-token.dto";
import { AuthLoginDTO } from "../application/dtos/auth.login.dto";

export class AuthFetchRepositoryImpl implements AuthRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/auth`;

    async login(dto: AuthLoginDTO): Promise<Result<AuthAccesTokenDTO, ErrorEntity>> {
        try {
            const result = await fetch(`${this.URL}/login`,{
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

            const accessToken = await result.json() as AuthAccesTokenDTO;
            return Result.success(accessToken);
        } catch (error:any) {
            console.log(error);

            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/auth`,
                timestamp: new Date().toDateString(),
            } satisfies ErrorEntity);
        }
    }
    // async save(dto: RegisterBrandDTO): Promise<Result<BrandEntity, ErrorEntity>> {

    //     try {
    //         const result = await fetch(`${this.URL}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dto),
    //         });
    //         if (!result.ok) {
    //             const error = await result.json() as ErrorEntity;
    //             return Result.failure(error);
    //         }

    //         const brand = await result.json() as BrandEntity;
    //         return Result.success(brand)
    //     } catch (error: any) {
    //         console.log(error);

    //         return Result.failure({
    //             error: error?.message || error,
    //             message: 'No se pudo conectar al backend',
    //             statusCode: 500,
    //             path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/brands`,
    //             timestamp: new Date().toDateString(),
    //         } satisfies ErrorEntity);
    //     }
    // }
}