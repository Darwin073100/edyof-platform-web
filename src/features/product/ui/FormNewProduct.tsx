'use client'
import { BrandEntity } from '@/features/brand/domain/entities/brand.entity';
import { useBrandStore } from '@/features/brand/infraestructure/brand.store';
import { CategoryEntity } from '@/features/category/domain/entities/category.entity';
import { useCategoryStore } from '@/features/category/infraestructure/category.store';
import { SeasonEntity } from '@/features/season/domain/entities/season.entity';
import { useSeasonStore } from '@/features/season/infraestructure/season.store';
import { Button } from '@/ui/components/buttons';
import { SelectMenu, TextInput } from '@/ui/components/inputs';
import { LabelInput } from '@/ui/components/labels';
import React, { useEffect } from 'react'
import { TbExchange } from 'react-icons/tb';

interface Props{
    categoryList: CategoryEntity[],
    brandList: BrandEntity[],
    seasonList: SeasonEntity[],
}

const FormNewProduct = ({ categoryList, brandList, seasonList }:Props) => {
    const {categories, setCategories} = useCategoryStore();
    const {seasons, setSeasons} = useSeasonStore();
    const {brands, setBrands} = useBrandStore();
    
    useEffect(()=>{
        setCategories(categoryList);
        setBrands(brandList);
        setSeasons(seasonList);
    },[]);

    const categoryOptions = categories.map(item => ({
        value: item.categoryId.toString(), 
        text: item.name
    }));

    const brandOptions = brands.map(item => ({
        value: item.brandId.toString(), 
        text: item.name
    }));

    const seasonOptions = seasons.map(item => ({
        value: item.seasonId.toString(), 
        text: item.name
    }));
  return (
    <form action="">
                <div className="w-full flex justify-between">
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-gray-700 rounded-sm">Producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Nombre del producto" />
                            <TextInput placeholder="Nombre del producto" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Código de barras universal" />
                            <TextInput placeholder="Código de barras universal" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock Mínimo Global" />
                            <TextInput type='number' placeholder="Stock mínimo" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Categoría" />
                            <SelectMenu items={categoryOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Marca" />
                            <SelectMenu items={brandOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Temporada" />
                            <SelectMenu items={seasonOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Descripción del producto" />
                            <TextInput placeholder="Descripción" />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-gray-700 rounded-sm">Lote del producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Precio de compra" />
                            <TextInput type='number' placeholder="Precio de compra" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock inicial" />
                            <TextInput type='number' placeholder="Stock inicial" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de ingreso al establecimiento." />
                            <TextInput type='date' placeholder="Fecha de ingreso"/>
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de fabricación" />
                            <TextInput type='date' placeholder="Fecha de fabricación" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de caducidad" />
                            <TextInput type='date' placeholder="Fecha de caducidad" />
                        </div>
                    </div>
                </div>
                <div className="w-full p-2">
                    <h2 className="text-xl mb-2 text-white p-1 bg-gray-700 rounded-sm">Inventario del producto</h2>
                    <div className="mb-2">
                        <div className="flex gap-2 mb-2">
                            <LabelInput value="Código de barras interno" />
                            <Button size="sm" color="yellow"><TbExchange />User código universal</Button>
                        </div>
                        <TextInput type='text' placeholder="Código de barra interno" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio de venta por menudeo" />
                        <TextInput type='number' placeholder="Precio de menudeo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio de venta por mayoreo" />
                        <TextInput type='number' placeholder="Precio de mayoreo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock para la ubicación actual" />
                        <TextInput type='number' placeholder="Stock en ubicación" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock mínimo en esta sucursal" />
                        <TextInput type='number' placeholder="Stock min." />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock máximo en la sucursal" />
                        <TextInput type='number' placeholder="Stock max." />
                    </div>
                </div>

            </form>
  )
}

export { FormNewProduct };
