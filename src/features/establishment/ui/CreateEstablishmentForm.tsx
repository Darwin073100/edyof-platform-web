'use client'
import React, { useState } from 'react'
import { TextInput } from '../../../ui/components/inputs'
import { Button } from '../../../ui/components/buttons'
import { HiMiniArrowLongRight } from 'react-icons/hi2'
import { createEstablishmentAction } from '@/features/establishment/actions/create.establishment.action'
import { useRouter } from 'next/navigation'
import { Spinner } from '../../../ui/components/loadings/Spinner'
import { FloatMessage } from '../../../ui/components/messages'
import { FloatMessageType } from '@/shared/ui/types/FloatMessageType'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorEntity } from '@/shared/features/error.entity'
import { Result } from '@/shared/features/result'

const schema = yup.object({
    name: yup.string().required('El campo nombre es requerido').min(3, 'El valor debe ser mayor a 3 caracteres')
}).required();

type FormData = yup.InferType< typeof schema>

export const CreateEstablishmentForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    // const { setEstablishment, establishment } = useEstablishmentStore();
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(()=>({}));
        setIsLoading(true);

        let resp;
        if( !errors.name){
            resp = await createEstablishmentAction(data.name);
        } else {
            resp = Result.failure({
                error: 'Hay un error',
                message: 'Hay un error',
                statusCode: 500,
                path: '/this',
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }

        if (resp?.ok) {
            setIsLoading(false);
            setFloatMessageState(()=>({
                description: 'Establecimiento creado correctamente',
                summary: '¡Correcto!',
                isActive: true,
                type: 'blue'
            }));
            router.push('/create-first-branch-office')
        } else {
            setIsLoading(false);
            setFloatMessageState(()=>({
                description: resp?.error?.message,
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));            
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 max-w-[450px]">
                <h1 className="text-lg text-center">
                    ¡Estas a un simple paso para tener todo listo,
                    solo debes ingresar el nombre de tu establecimiento!
                </h1>
                <TextInput
                    {...register("name")}
                    name='name'
                    error={ !!errors.name }
                    type="text"
                    placeholder="Introduce el nombre"
                    errorMessage={errors.name?.message} />
                <Button
                    type='submit'
                    color="blue">
                    {isLoading ? <Spinner /> : <>Siguiente<HiMiniArrowLongRight /></>}
                </Button>
            </form>
            <FloatMessage 
                key={floatMessageState.summary}
                description={floatMessageState.description}
                summary={floatMessageState.summary}
                type={ floatMessageState.type}
                isActive={ floatMessageState.isActive}/>
        </>
    )
}
