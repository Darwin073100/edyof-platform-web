'use cient'
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { FloatMessageType } from "@/shared/ui/types/FloatMessageType";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Result } from '@/shared/features/result';
import { ErrorEntity } from '@/shared/features/error.entity';
import { BrandEntity } from '../domain/entities/brand.entity';
import { useBrandStore } from '../infraestructure/brand.store';
import { RegisterBrandDTO } from '../application/dtos/register-brand.dto';
import { registerBrandAction } from '../actions/register-brand.action';

const schema = yup.object({
    name: yup.string().required('El campo es obligatorio').min(3, 'La marca debe tener al menos 3 caracteres.'),
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props{
    brandList: BrandEntity[]
}

const useBrandModal = ({ brandList }: Props) => {
    const { setBrands, addBrand, brand, setBrand, modalOpen, setModalOpen } = useBrandStore();
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
        resetForm();
    }

    useEffect(()=>{
        setBrands(brandList);
    },[]);

    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const resetForm = ()=>{
        setBrand(null)
        reset({});
        clearErrors(['name'])
    }

    useEffect(()=>{
        if(!!brand){
            reset({
                name: brand.name
            })
        } else {
            resetForm()
        }
    },[brand, reset]);

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);
        let result:any;
        if (!errors.name) {
            const newCategory: RegisterBrandDTO = {
                name: data.name
            }
            result = await registerBrandAction(newCategory);
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
                addBrand(result.value)
            }

            resetForm();
            setFloatMessageState(()=>({
                description: 'Marca creada correctamente',
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
        setBrands,
        addBrand,
        brand, 
        setBrand,
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

export { useBrandModal };
