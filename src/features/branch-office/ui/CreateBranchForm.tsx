'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LabelInput } from '../../../ui/components/labels';
import { TextInput } from '../../../ui/components/inputs';
import { Button } from '../../../ui/components/buttons';

const schema = yup.object({
    name: yup.string().required('El campo nombre es obligatorio').min(3, 'El valor minimo debe ser de 3 caracteres'),
    postalCode: yup.number().integer('Este campo debe ser un número entero').required('El campo codigo postal es obligatorio').positive('El codigo postal es un número positivo'),
    street: yup.string().required('La campo calle es requerido').min(3, 'Mínimo 3 caracteres debes escribir'),
    interiorNumber: yup.string(),
    exteriorNumber: yup.string(),
    district: yup.string().required('El campo municipio es obligatorio'),
    city: yup.string().required('El campo ciudad es obligatorio'),
    state: yup.string().required('El campo estado es obligatorio'),
}).required();

type FormData = yup.InferType< typeof schema>


export const CreateBranchForm = () => {
    const { register, handleSubmit, formState:{ errors }} = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues:{
            postalCode: 0
        }
    });

    const onSubmit = async ( data: FormData)=>{
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-[700px] rounded-2xl shadow-md p-8 flex flex-col gap-4">
            <h1 className="text-3xl mb-4">Alta de una sucursal</h1>
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
                        name="postalCode" placeholder="41700" type="number" />
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
                    <LabelInput htmlFor="district" value="Distrito o municipio" />
                    <TextInput
                        {...register('district')}
                        error={!!errors.district}
                        errorMessage={errors.district?.message}
                        name="district" placeholder="Barrio de la Guadalupe, Ometepec" />
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
            </div>
            <Button type="submit" color="blue">
                Guardar

            </Button>
        </form>
    )
}
