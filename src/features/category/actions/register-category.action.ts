'use server'
import { revalidatePath } from 'next/cache';
import { RegisterCategoryDTO } from "../application/dtos/register-category.dto";
import { RegisterCategoryUseCase } from "../application/use-case/register-category.use-case";
import { CategoryRepositoryFactory } from '../infraestructure/factories/category-repository.factory';

export async function registerCategoryAction(dto: RegisterCategoryDTO){
    try {
        // Inyeccion de las dependencias usando Factory
        const categoryRepository = CategoryRepositoryFactory.create();
        const registerCategoryUseCase = new RegisterCategoryUseCase(categoryRepository);

        const result = await registerCategoryUseCase.execute(dto);

        // Invalidar el caché de la página de productos para que se actualicen los datos
        if (result?.ok) {
            revalidatePath('/dashboard');
        }

        return {
            ...result
        }
    } catch (error) {
        console.error('Error in registerCategoryAction:', error);
        throw error;
    }
}