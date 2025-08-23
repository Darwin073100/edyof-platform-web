'use server'
import { revalidatePath } from 'next/cache';
import { RegisterCategoryDTO } from "../application/dtos/register-category.dto";
import { RegisterCategoryUseCase } from "../application/use-case/register-category.use-case";
import { CategoryFetchRepositoryImpl } from "../infraestructure/category-fetch-repository.imp";

export async function registerCategoryAction(dto: RegisterCategoryDTO){
    // Inyeccion de las dependencias
    const categoryFetchRepositoryImpl = new CategoryFetchRepositoryImpl();
    const registerCategoryUseCase = new RegisterCategoryUseCase(categoryFetchRepositoryImpl);

    const result = await registerCategoryUseCase.execute(dto);

    // Invalidar el caché de la página de productos para que se actualicen los datos
    if (result?.ok) {
        revalidatePath('/products');
    }

    return {
        ...result
    }
}