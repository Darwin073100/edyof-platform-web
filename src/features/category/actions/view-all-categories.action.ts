'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { ViewAllCategoriesUseCase } from "../application/use-case/view-all-categories.use-case";
import { CategoryFetchRepositoryImpl } from "../infraestructure/category-fetch-repository.imp";

export async function ViewAllCategoriesAction(){
    noStore(); // Evitar que se cachée este server action
    
    // Inyeccion de las dependencias
    const categoryFetchRepositoryImpl = new CategoryFetchRepositoryImpl();
    const viewAllCategoriesUseCase = new ViewAllCategoriesUseCase(categoryFetchRepositoryImpl);

    const result = await viewAllCategoriesUseCase.execute();

    return {
        ...result
    }
}