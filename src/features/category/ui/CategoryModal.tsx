"use client"
import { Button } from '@/ui/components/buttons';
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import { TextInput } from '@/ui/components/inputs';
import { Modal } from '@/ui/components/modals/Modal';
import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useCategoryStore } from '../infraestructure/category.store';

const CategoryModal = () => {
    const { modalOpen, setModalOpen } = useCategoryStore();

    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <Modal id="1" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <form className="text-gray-700 flex flex-col items-center gap-2 bg-white p-4 rounded-md">
                <div className="w-full flex justify-between items-center gap-2">
                    <h2 className="font-semibold">Agregar Nueva Categoría</h2>
                    <RoundedButton color="red" onClick={() => handleOpenModal()}><IoClose /></RoundedButton>
                </div>
                <div className="">
                    <TextInput placeholder="Nombre de la categoría" />
                </div>
                <div className="w-full flex justify-end gap-2">
                    <Button><FaSave /> Guardar</Button>
                    <Button color="gray" onClick={() => handleOpenModal()}><IoClose />Cerrar</Button>
                </div>
            </form>
        </Modal>
    )
}

export { CategoryModal };
