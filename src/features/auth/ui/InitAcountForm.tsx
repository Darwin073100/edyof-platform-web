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
import { FloatMessageType } from '@/shared/ui/types/FloatMessageType';
import { useRouter } from 'next/navigation';
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import { RegisterUserWithEmployeeDTO } from '../application/dtos/register-user-with-employee.dto';
import { registerUserWithEmployeeAction } from '../actions/register-user-with-employee.action';
import { useBranchOfficeStore } from '@/features/branch-office/infraestructure/branch-office.store';
import { useEstablishmentStore } from '@/features/establishment/infraestructure/establishment.store';

const schema = yup.object({
    firstName: yup.string().required('El campo nombre es obligatorio.').min(3, 'El valor minimo debe ser de 3 caracteres'),
    lastName: yup.string().required('El campo apellidos es obligatorio.'),
    username: yup.string().required('La campo nombre de usuario es obligatorio.').min(3, 'Mínimo 3 caracteres debes escribir'),
    email: yup.string().required('El campo correo es obligatorio.').email('El formato para el correo es alberto@platform.com.mx'),
    password: yup.string().required('La contraseña es obligatoria.').min(8,'La contraseña debe tener al menos 8 caracteres.'),
    passwordConfirm: yup.string().required('Debes confirmar tu contraseña.').oneOf([yup.ref('password')], 'Las contraseñas no coindicen.'),
    phoneNumber: yup.string().nullable().optional().default(''),
}).required();

type FormData = yup.InferType<typeof schema>


export const InitAcountForm = () => {
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    const {clearBranchOffice, branchOffice} = useBranchOfficeStore();
    const { clearEstablishment} = useEstablishmentStore();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const cleanLocalStorage = ()=>{
        clearBranchOffice();
        clearEstablishment();
    }

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);

        let resp;
        const userWithEmployee: RegisterUserWithEmployeeDTO = {
            branchOfficeId: branchOffice?.branchOfficeId ?? BigInt(0),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            username: data.username,
            phoneNumber: data.phoneNumber
        };
        console.log(userWithEmployee);

        resp = await registerUserWithEmployeeAction(userWithEmployee);

        if (resp?.ok) {
            setFloatMessageState(() => ({
                description: 'Usuario creado correctamente, ahora solo inicia sesión',
                summary: '¡Correcto!',
                isActive: true,
                type: 'blue'
            }));

            cleanLocalStorage();

            router.push('/auth/login')
        } else {
            setIsLoading(false);
            setFloatMessageState(() => ({
                description: resp?.error?.message,
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-[800px] rounded-2xl shadow-md p-8 flex flex-col gap-4">
                <h1 className="text-3xl text-gray-700">Alta de la cuenta de usuario</h1>
                <div className='w-full flex justify-center gap-4'>
                    <div className='w-full'>
                        <div>
                            <LabelInput htmlFor="firstname" value="Nombre del usuario" />
                            <TextInput
                                {...register('firstName')}
                                type='text'
                                error={!!errors.firstName}
                                errorMessage={errors.firstName?.message}
                                name="firstName" placeholder="Alberto" />
                        </div>
                        <div>
                            <LabelInput htmlFor="lastName" value="Apellidos" />
                            <TextInput
                                {...register('lastName')}
                                type="text"
                                error={!!errors.lastName}
                                errorMessage={errors.lastName?.message}
                                name="lastName" placeholder="Morales Medel" />
                        </div>
                        <div>
                            <LabelInput htmlFor="password" value="Contraseña" />
                            <TextInput
                                {...register('password')}
                                type='password'
                                error={!!errors.password}
                                errorMessage={errors.password?.message}
                                name="password" placeholder="ContrSup3rSecr374$" />
                        </div>
                        <div>
                            <LabelInput htmlFor="passwordConfirm" value="Confirma tu contraseña" />
                            <TextInput
                                {...register('passwordConfirm')}
                                type='password'
                                error={!!errors.passwordConfirm}
                                errorMessage={errors.passwordConfirm?.message}
                                name="passwordConfirm" placeholder="ContrSup3rSecr374$" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <div>
                            <LabelInput htmlFor="username" value="Nombre de usuario" />
                            <TextInput
                                {...register('username')}
                                type="text"
                                error={!!errors.username}
                                errorMessage={errors.username?.message}
                                name="username" placeholder="beto89" />
                        </div>
                        <div>
                            <LabelInput htmlFor="email" value="Correo electrónico" />
                            <TextInput
                                {...register('email')}
                                type='email'
                                error={!!errors.email}
                                errorMessage={errors.email?.message}
                                name="email" placeholder="albert@platform.com.mx" />
                        </div>
                        <div>
                            <LabelInput htmlFor="phoneNumber" value="Número de teléfono" />
                            <TextInput
                                {...register('phoneNumber')}
                                type='text'
                                error={!!errors.phoneNumber}
                                errorMessage={errors.phoneNumber?.message}
                                name="phoneNumber" placeholder="7418970324" />
                        </div>
                    </div>
                </div>
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
                type={floatMessageState.type}
                isActive={floatMessageState.isActive} />
        </>
    )
}
