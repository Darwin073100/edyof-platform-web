'use client'
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useCategoryStore } from "../infraestructure/category.store";
import { FloatMessageType } from "@/shared/ui/types/FloatMessageType";
import { CategoryEntity } from "../domain/entities/category.entity";
import { RegisterCategoryDTO } from "../application/dtos/register-category.dto";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerCategoryAction } from '../actions/register-category.action';
import { Result } from '@/shared/features/result';
import { ErrorEntity } from '@/shared/features/error.entity';

const schema = yup.object({
    name: yup.string().required('El campo es obligatorio').min(3, 'La categoría debe tener al menos 3 caracteres.'),
    description: yup.string().optional().notRequired().default('')
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props{
    categoryList: CategoryEntity[]
}

const useCategoryModal = ({ categoryList }: Props) => {
    const { setCategories, addCategory, category, setCategory, modalOpen, setModalOpen } = useCategoryStore();
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
        resetForm();
    }

    useEffect(()=>{
        if (categoryList && Array.isArray(categoryList)) {
            setCategories(categoryList);
        }
    },[categoryList, setCategories]);

    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const resetForm = ()=>{
        setCategory(null)
        reset({});
        clearErrors(['description', 'name'])
    }

    useEffect(()=>{
        if(!!category){
            reset({
                name: category.name,
                description: category.description
            })
        } else {
            resetForm()
        }
    },[category, reset]);

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);
        let result;
        if (!errors.name) {
            const newCategory: RegisterCategoryDTO = {
                name: data.name,
                description: data.description,
            }
            result = await registerCategoryAction(newCategory);
        } else {
            result = Result.failure({
                error: 'Hay un error',
                message: 'Hay un error',
                statusCode: 500,
                path: '',
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }

        if (result?.ok) {
            setIsLoading(false);
            if(result.value){
                addCategory(result.value)
            }

            // Refrescar datos del servidor
            router.refresh();

            resetForm();
            setFloatMessageState(()=>({
                description: 'Categoría creada correctamente',
                summary: '¡Correcto!',
                isActive: true,
                type: 'blue'
            }));

            setTimeout(()=>{
                setFloatMessageState(() => ({}));
            }, 4000);

        } else {
            setIsLoading(false);
            setFloatMessageState(()=>({
                description: result?.error?.message,
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));
            setTimeout(()=>{
                setFloatMessageState(() => ({}));
            }, 4000);          
        }

    }
    
    return {
        setCategories,
        addCategory,
        category, 
        setCategory,
        floatMessageState,
        setFloatMessageState,
        isLoading,
        setIsLoading,
        modalOpen, 
        setModalOpen,
        handleOpenModal,
        resetForm,
        onSubmit,
        handleSubmit,
        register,
        errors,
    }
}

export { useCategoryModal };
