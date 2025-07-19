"use client"
import { Button } from '@/ui/components/buttons';
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import { TextInput } from '@/ui/components/inputs';
import { Modal } from '@/ui/components/modals/Modal';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { FloatMessage } from '@/ui/components/messages';
import { HiSave } from 'react-icons/hi';
import { Spinner } from '@/ui/components/loadings/Spinner';
import { BrandTable } from './BrandTable';
import { MdCleaningServices } from 'react-icons/md';
import { BrandEntity } from '../domain/entities/brand.entity';
import { useBrandModal } from '../hooks/useBrandModal';

interface Props{
    brandList: BrandEntity[]
}

const BrandModal = ({ brandList }: Props) => {
    const { 
        modalOpen, setModalOpen,
        floatMessageState, isLoading, 
        handleOpenModal, handleSubmit, register,
        onSubmit, resetForm,errors,
    } = useBrandModal({brandList});
    
    

    return (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className='w-[450px] text-gray-700 flex flex-col items-center gap-2 bg-white p-4 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full text-gray-700 flex flex-col items-center gap-2 bg-white p-4">
                    <div className="w-full flex justify-between items-center gap-2">
                        <h2 className="text-lg font-semibold">Marcas de productos</h2>
                        <RoundedButton color="red" onClick={() => handleOpenModal()}><IoClose /></RoundedButton>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <TextInput
                            {...register('name')}
                            error={!!errors.name}
                            errorMessage={errors.name?.message}
                            placeholder="Nombre de la categoría" />
                    </div>
                    <div className="w-full flex justify-end gap-2">
                        <Button className='w-32 flex justify-center items-center'>
                            {isLoading ? <Spinner /> : <>Guardar<HiSave /></>}
                        </Button>
                        <Button color="yellow" onClick={() => resetForm()}><MdCleaningServices />Limpiar campos</Button>
                        <Button color="gray" onClick={() => handleOpenModal()}><IoClose />Cerrar</Button>
                    </div>
                </form>
                <BrandTable/>
            </div>
            <FloatMessage
                key={floatMessageState.summary}
                description={floatMessageState.description}
                summary={floatMessageState.summary}
                type={floatMessageState.type}
                isActive={floatMessageState.isActive} />
        </Modal >
    )
}

export { BrandModal };
