"use client"
import { Button } from '@/ui/components/buttons';
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import { SelectMenu, TextInput } from '@/ui/components/inputs';
import { Modal } from '@/ui/components/modals/Modal';
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { FloatMessage } from '@/ui/components/messages';
import { HiSave } from 'react-icons/hi';
import { Spinner } from '@/ui/components/loadings/Spinner';
import { MdCleaningServices } from 'react-icons/md';
import { LabelInput } from '@/ui/components/labels';

interface Props {
    product: any
}

const UpdateProductModal = () => {
    return (
        <Modal isOpen={true} onClose={() => () => true}>
            <div className='w-full max-w-2xl max-h-[90vh] mx-4 text-gray-700 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col'>
                {/* Header fijo */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Editando: Sandalia Sport de Caballero
                    </h2>
                    <RoundedButton color='red'><IoClose /></RoundedButton>
                </div>
                
                {/* Contenido con scroll */}
                <div className="flex-1 overflow-y-auto">
                    <form className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <LabelInput value="Nombre del producto *" />
                                <TextInput
                                    placeholder="Nombre del producto" />
                            </div>
                            
                            <div className="md:col-span-2">
                                <LabelInput value="Código de barras universal *" />
                                <TextInput
                                    placeholder="Código de barras universal *" />
                            </div>
                            
                            <div>
                                <LabelInput value="Stock Mínimo Global *" />
                                <TextInput
                                    type='number'
                                    placeholder="Stock mínimo" />
                            </div>
                            
                            <div>
                                <LabelInput value="Categoría *" htmlFor='category' />
                                <SelectMenu id='category'
                                    items={[]} />
                            </div>
                            
                            <div>
                                <LabelInput value="Marca *" htmlFor='brand' />
                                <SelectMenu id='brand'
                                    items={[]} />
                            </div>
                            
                            <div>
                                <LabelInput value="Temporada *" htmlFor='season' />
                                <SelectMenu id='season'
                                    items={[]} />
                            </div>
                            
                            <div className="md:col-span-2">
                                <LabelInput value="Unidad de medida para ventas *" htmlFor='unitOfMeasure' />
                                <SelectMenu id='unitOfMeasure'
                                    items={[]}
                                />
                            </div>
                            
                            <div className="md:col-span-2">
                                <LabelInput value="Descripción del producto" />
                                <TextInput
                                    placeholder="Descripción" />
                            </div>
                        </div>
                    </form>
                </div>
                
                {/* Footer fijo */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-end gap-3 flex-wrap">
                        <Button className='flex justify-center items-center min-w-[120px]'>
                            {true ? <Spinner /> : (
                                <>
                                    Actualizar
                                    <HiSave className="ml-2" />
                                </>
                            )}
                        </Button>
                        <Button color="yellow" className="flex items-center">
                            <MdCleaningServices className="mr-2" />
                            Limpiar campos
                        </Button>
                        <Button color="gray" className="flex items-center">
                            <IoClose className="mr-2" />
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
            {/* <FloatMessage
                key={floatMessageState.summary}
                description={floatMessageState.description}
                summary={floatMessageState.summary}
                type={floatMessageState.type}
                isActive={floatMessageState.isActive} /> */}
        </Modal >
    )
}

export { UpdateProductModal };
