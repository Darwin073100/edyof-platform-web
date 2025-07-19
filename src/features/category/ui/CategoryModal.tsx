"use client"
import { Button } from '@/ui/components/buttons';
import * as yup from 'yup';
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import { TextInput } from '@/ui/components/inputs';
import { Modal } from '@/ui/components/modals/Modal';
import React, { FormEvent, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useCategoryStore } from '../infraestructure/category.store';
import { FloatMessageType } from '@/shared/ui/types/FloatMessageType';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FloatMessage } from '@/ui/components/messages';
import { HiSave } from 'react-icons/hi';
import { Spinner } from '@/ui/components/loadings/Spinner';
import { RegisterCategoryDTO } from '../application/dtos/register-category.dto';
import { registerCategoryAction } from '../actions/register-category.action';
import { Result } from '@/shared/features/result';
import { ErrorEntity } from '@/shared/features/error.entity';
import { CategoryEntity } from '../domain/entities/category.entity';
import CategoriesTable from './CategoriesTable';
import { MdCleaningServices } from 'react-icons/md';

const schema = yup.object({
    name: yup.string().required('El campo es obligatorio').min(3, 'La categoría debe tener al menos 3 caracteres.'),
    description: yup.string().optional().notRequired().default('')
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props{
    categoryList: CategoryEntity[]
}
const CategoryModal = ({ categoryList }: Props) => {
    const { setCategories, addCategory} = useCategoryStore();
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        setCategories(categoryList);
    },[]);

    const { register, handleSubmit, reset,formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { modalOpen, setModalOpen } = useCategoryStore();

    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
    }

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
            
            reset();
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
        }

    }

    return (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[500px] text-gray-700 flex flex-col items-center gap-2 bg-white p-4 rounded-md">
                <div className="w-full flex justify-between items-center gap-2">
                    <h2 className="font-semibold">Agregar Nueva Categoría</h2>
                    <RoundedButton color="red" onClick={() => handleOpenModal()}><IoClose /></RoundedButton>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <TextInput
                        {...register('name')}
                        error={!!errors.name}
                        errorMessage={errors.name?.message}
                        placeholder="Nombre de la categoría" />
                    <TextInput
                        {...register('description')}
                        error={!!errors.description}
                        errorMessage={errors.description?.message}
                        placeholder="Descripción de la categoría" />
                </div>
                <div className="w-full flex justify-end gap-2">
                    <Button className='w-32 flex justify-center items-center'>
                        {isLoading ? <Spinner /> : <>Agregar<HiSave /></>}
                    </Button>
                    <Button color="yellow" onClick={() => handleOpenModal()}><MdCleaningServices />Limpiar campos</Button>
                    <Button color="gray" onClick={() => handleOpenModal()}><IoClose />Cerrar</Button>
                </div>
            <CategoriesTable/>
            </form>
            <FloatMessage
                key={floatMessageState.summary}
                description={floatMessageState.description}
                summary={floatMessageState.summary}
                type={floatMessageState.type}
                isActive={floatMessageState.isActive} />
        </Modal >
    )
}

export { CategoryModal };
