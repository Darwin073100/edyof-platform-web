'use cient'
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { FloatMessageType } from "@/shared/ui/types/FloatMessageType";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Result } from '@/shared/features/result';
import { ErrorEntity } from '@/shared/features/error.entity';
import { SeasonEntity } from '../domain/entities/season.entity';
import { useSeasonStore } from '../infraestructure/season.store';
import { RegisterSeasonDTO } from '../application/dtos/register-season.dto';
import { registerSeasonAction } from '../actions/register-season.action';

const schema = yup.object({
    name: yup.string().required('El campo es obligatorio').min(3, 'La categoría debe tener al menos 3 caracteres.'),
    description: yup.string().optional().notRequired().default(''),
    dateInit: yup.date().optional().notRequired(),
    dateFinish: yup.date().optional().notRequired()
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props{
    seasonList: SeasonEntity[]
}

const useSeasonModal = ({ seasonList }: Props) => {
    const { setSeasons, addSeason, season, setSeason, modalOpen, setModalOpen } = useSeasonStore();
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
        resetForm();
    }

    useEffect(()=>{
        setSeasons(seasonList);
    },[]);

    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const resetForm = ()=>{
        setSeason(null)
        reset({});
        clearErrors(['description', 'name', 'dateInit', 'dateFinish'])
    }

    useEffect(()=>{
        if(!!season){
            reset({
                name: season.name,
                description: season.description,
                dateInit: season.dateInit ? new Date(season.dateInit) : undefined,
                dateFinish: season.dateFinish ? new Date(season.dateFinish) : undefined
            })
        } else {
            resetForm()
        }
    },[season, reset]);

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);
        let result;
        if (!errors.name) {
            const newSeason: RegisterSeasonDTO = {
                name: data.name,
                description: data.description,
                dateInit: data.dateInit ?? null,
                dateFinish: data.dateFinish ?? null
            }
            result = await registerSeasonAction(newSeason);
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
                addSeason(result.value)
            }

            resetForm();
            setFloatMessageState(()=>({
                description: 'Temporada creada correctamente',
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
        setSeasons,
        addSeason,
        season, 
        setSeason,
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

export { useSeasonModal };
