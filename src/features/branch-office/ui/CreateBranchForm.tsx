'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LabelInput } from '../../../ui/components/labels';
import { TextInput } from '../../../ui/components/inputs';
import { Button } from '../../../ui/components/buttons';
import { FloatMessage } from '@/ui/components/messages';
import { Spinner } from '@/ui/components/loadings/Spinner';
import { HiSave } from 'react-icons/hi';
import { FloatMessageType } from '@/shared/ui/types/FloatMessageType';
import { createNewBranchOfficeAction } from '../actions/create.new.branch-office.action';
import { Result } from '@/shared/features/result';
import { ErrorEntity } from '@/shared/features/error.entity';
import { BranchOfficeInterface } from '../domain/entities/branch-office.interface';
import { useRouter } from 'next/navigation';

const schema = yup.object({
    name: yup.string().required('El campo nombre es obligatorio').min(3, 'El valor minimo debe ser de 3 caracteres'),
    postalCode: yup.string().required('El campo codigo postal es obligatorio'),
    street: yup.string().required('La campo calle es requerido').min(3, 'Mínimo 3 caracteres debes escribir'),
    interiorNumber: yup.string().default('S/N'),
    exteriorNumber: yup.string().default('S/N'),
    municipality: yup.string().required('El campo municipio es obligatorio'),
    city: yup.string().required('El campo ciudad es obligatorio'),
    state: yup.string().required('El campo estado es obligatorio'),
    neighborhood: yup.string().required('El campo colonia es obligatorio'),
    country: yup.string().required('El campo ciudad es obligatorio'),
    reference: yup.string().optional().notRequired().default(''),
}).required();

type FormData = yup.InferType< typeof schema>


export const CreateBranchForm = () => {
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState:{ errors }} = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(()=>({}));
        setIsLoading(true);

        let resp;
        if( !errors.name){
            const branch:BranchOfficeInterface = {
                name: data.name,
                establishmentId: BigInt(14),
                street: data.street,
                internalNumber: data.interiorNumber,
                externalNumber: data.exteriorNumber,
                postalCode: data.postalCode,
                neighborhood: data.neighborhood,
                municipality: data.municipality,
                country: data.country,
                city: data.city,
                state: data.state,
                reference: data.reference?.toString()
            };
            console.log(branch);
            
            resp = await createNewBranchOfficeAction(branch);
        } else {
            resp = Result.failure({
                error: 'Hay un error',
                message: 'Hay un error',
                statusCode: 500,
                path:'',
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }

        if (resp?.ok) {
            setFloatMessageState(()=>({
                description: 'Sucursal creada correctamente',
                summary: '¡Correcto!',
                isActive: true,
                type: 'blue'
            }));
            router.push('/')
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-[700px] rounded-2xl shadow-md p-8 flex flex-col gap-4">
            <h1 className="text-3xl mb-4 text-gray-700">Alta de una sucursal</h1>
            <div>
                <div>
                    <LabelInput htmlFor="name" value="Nombre de la sucursal" />
                    <TextInput
                        {...register('name')}
                        error={!!errors.name}
                        errorMessage={errors.name?.message}
                        name="name" placeholder="Los Tamarindos S.A. de C.V." />
                </div>
                <div>
                    <LabelInput htmlFor="postalCode" value="Codigo postal" />
                    <TextInput 
                        {...register('postalCode')}
                        error={!!errors.postalCode}
                        errorMessage={errors.postalCode?.message}
                        name="postalCode" placeholder="41700" type="text" />
                </div>
                <div>
                    <LabelInput htmlFor="street" value="Nombre de la calle" />
                    <TextInput
                        {...register('street')} 
                        error={!!errors.street}
                        errorMessage={errors.street?.message}
                        name="street" placeholder="Juan Ruiz de Alarcón" />
                </div>
                <div>
                    <LabelInput htmlFor="interiorNumber" value="Numero interior" />
                    <TextInput 
                        {...register('interiorNumber')}
                        error={!!errors.interiorNumber}
                        errorMessage={errors.interiorNumber?.message}
                        name="interiorNumber" placeholder="14" />
                </div>
            </div>
            <div>
                <div>
                    <LabelInput htmlFor="exteriorNumber" value="Numero exterior" />
                    <TextInput 
                        {...register('exteriorNumber')}
                        error={!!errors.exteriorNumber}
                        errorMessage={errors.exteriorNumber?.message}
                        name="exteriorNumber" placeholder="S/N" />
                </div>
                <div>
                    <LabelInput htmlFor="neighborhood" value="Colonia" />
                    <TextInput
                        {...register('neighborhood')}
                        error={!!errors.neighborhood}
                        errorMessage={errors.neighborhood?.message}
                        name="neighborhood" placeholder="Barrio de la Guadalupe" />
                </div>
                <div>
                    <LabelInput htmlFor="country" value="País" />
                    <TextInput 
                        {...register('country')}
                        error={!!errors.country}
                        errorMessage={errors.country?.message}
                        name="country" placeholder="México" />
                </div>
                <div>
                    <LabelInput htmlFor="municipality" value="Municipio" />
                    <TextInput
                        {...register('municipality')}
                        error={!!errors.municipality}
                        errorMessage={errors.municipality?.message}
                        name="municipality" placeholder="Ometepec" />
                </div>
                <div>
                    <LabelInput htmlFor="city" value="Ciudad" />
                    <TextInput 
                        {...register('city')}
                        error={!!errors.city}
                        errorMessage={errors.city?.message}
                        name="city" placeholder="Ometepec" />
                </div>
                <div>
                    <LabelInput htmlFor="state" value="Estado" />
                    <TextInput 
                        {...register('state')}
                        error={!!errors.state}
                        errorMessage={errors.state?.message}
                        name="state" placeholder="Guerrero" />
                </div>
                <div>
                    <LabelInput htmlFor="reference" value="Referencia adicional" />
                    <TextInput 
                        {...register('reference')}
                        error={!!errors.reference}
                        errorMessage={errors.reference?.message}
                        name="reference" placeholder="Guerrero" />
                </div>
            </div>
            <Button
                    type='submit'
                    color="blue">
                    {isLoading ? <Spinner /> : <>Guardar<HiSave /></>}
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
