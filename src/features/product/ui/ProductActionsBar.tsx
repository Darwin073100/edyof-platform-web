'use client';
import { useCategoryStore } from '@/features/category/infraestructure/category.store';
import { Button } from '@/ui/components/buttons';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoMdAdd } from 'react-icons/io';
import { MdCategory, MdOutlineViewTimeline } from 'react-icons/md';

const ProductActionsBar = () => {
    const router = useRouter();

    const {modalOpen,setModalOpen} = useCategoryStore();
    return (
        <div className="flex gap-2 w-[700px]">
            <Button color="blue" size="md" onClick={()=> router.push('products/new')}>
                <IoMdAdd />
                Nuevo Producto
            </Button>
            <Button color="yellow" size="md" onClick={() => setModalOpen(!modalOpen)}>
                <MdCategory />
                Nueva Categoria
            </Button>
            <Button color="green" size="md">
                <IoMdAdd />
                Nueva Marca
            </Button>
            <Button color="gray" size="md">
                <MdOutlineViewTimeline />
                Nueva temporada
            </Button>
        </div>
    )
}

export { ProductActionsBar };
