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
import { useSaveProduct } from '../hooks/useSaveProduct';
import { FloatMessage } from '@/ui/components/messages';
import { HiSave } from 'react-icons/hi';
import { Spinner } from '@/ui/components/loadings/Spinner';
import { LocationEnum } from '@/features/inventory/domain/enums/location.enum';
import { ForSaleEnum } from '../domain/enums/for-sale.enum';

interface Props {
    categoryList: CategoryEntity[],
    brandList: BrandEntity[],
    seasonList: SeasonEntity[],
}

const FormNewProduct = ({ categoryList, brandList, seasonList }: Props) => {
    const {
        errors, floatMessageState, handleSubmit, isLoading,
        onSubmit, register
    } = useSaveProduct();

    const { categories, setCategories } = useCategoryStore();
    const { seasons, setSeasons } = useSeasonStore();
    const { brands, setBrands } = useBrandStore();

    useEffect(() => {
        setCategories(categoryList);
        setBrands(brandList);
        setSeasons(seasonList);
    }, []);

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

    const locationOptions = Object.values(LocationEnum).map(item => ({
        value: item.toString(),
        text: item.toString()
    }));

    const forSaleOptions = Object.values(ForSaleEnum).map(item => ({
        value: item.toString(),
        text: item.toString()
    }));


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex md:flex-row sm:flex-col max-sm:flex-col min-md:justify-between">
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-gray-700 rounded-sm">Producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Nombre del producto" />
                            <TextInput
                                {...register('name')}
                                error={!!errors.name}
                                errorMessage={errors.name?.message}
                                placeholder="Nombre del producto" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Código de barras universal" />
                            <TextInput
                                {...register('universalBarCode')}
                                error={!!errors.universalBarCode}
                                errorMessage={errors.universalBarCode?.message}
                                placeholder="Código de barras universal" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock Mínimo Global" />
                            <TextInput
                                {...register('minStockGlobal')}
                                error={!!errors.minStockGlobal}
                                errorMessage={errors.minStockGlobal?.message}
                                type='number'
                                placeholder="Stock mínimo" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Categoría" htmlFor='category' />
                            <SelectMenu id='category'
                                {...register('categoryId')}
                                error={!!errors.categoryId}
                                errorMessage={errors.categoryId?.message}
                                items={categoryOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Marca" htmlFor='brand'/>
                            <SelectMenu id='brand'
                                {...register('brandId')}
                                error={!!errors.brandId}
                                errorMessage={errors.brandId?.message}
                                items={brandOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Temporada" htmlFor='season' />
                            <SelectMenu id='season'
                                {...register('seasonId')}
                                error={!!errors.seasonId}
                                errorMessage={errors.seasonId?.message}
                                items={seasonOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Descripción del producto" />
                            <TextInput
                                {...register('description')}
                                error={!!errors.description}
                                errorMessage={errors.description?.message}
                                placeholder="Descripción" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Unidad de medida" htmlFor='unitOfMeasure' />
                            <SelectMenu id='unitOfMeasure'
                                {...register('unitOfMeasure')}
                                error={!!errors.unitOfMeasure}
                                errorMessage={errors.unitOfMeasure?.message}
                                items={forSaleOptions}
                            />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-gray-700 rounded-sm">Lote del producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Precio de compra" />
                            <TextInput
                                {...register('purchasePrice')}
                                error={!!errors.purchasePrice}
                                errorMessage={errors.purchasePrice?.message}
                                type='number'
                                placeholder="Precio de compra" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock inicial" />
                            <TextInput
                                {...register('initialQuantity')}
                                error={!!errors.initialQuantity}
                                errorMessage={errors.initialQuantity?.message}
                                type='number'
                                placeholder="Stock inicial" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de ingreso al establecimiento." />
                            <TextInput
                                {...register('receivedDate')}
                                error={!!errors.receivedDate}
                                errorMessage={errors.receivedDate?.message}
                                type='date'
                                placeholder="Fecha de ingreso" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de fabricación" />
                            <TextInput
                                {...register('manufacturingDate')}
                                error={!!errors.manufacturingDate}
                                errorMessage={errors.manufacturingDate?.message}
                                type='date'
                                placeholder="Fecha de fabricación" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de caducidad" />
                            <TextInput
                                {...register('expirationDate')}
                                error={!!errors.expirationDate}
                                errorMessage={errors.expirationDate?.message}
                                type='date'
                                placeholder="Fecha de caducidad" />
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
                        <TextInput
                            {...register('internalBarCode')}
                            error={!!errors.internalBarCode}
                            errorMessage={errors.internalBarCode?.message}
                            type='text'
                            placeholder="Código de barra interno" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio de venta por menudeo" />
                        <TextInput
                            {...register('salePriceOne')}
                            error={!!errors.salePriceOne}
                            errorMessage={errors.salePriceOne?.message}
                            type='number'
                            placeholder="Precio de menudeo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio de venta por mayoreo" />
                        <TextInput
                            {...register('salePriceMany')}
                            error={!!errors.salePriceMany}
                            errorMessage={errors.salePriceMany?.message}
                            type='number'
                            placeholder="Precio de mayoreo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Cantidad para mayoreo" />
                        <TextInput
                            {...register('saleQuantityMany')}
                            error={!!errors.saleQuantityMany}
                            errorMessage={errors.saleQuantityMany?.message}
                            type="number"
                            placeholder="Cantidad para mayoreo"
                        />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio especial" />
                        <TextInput
                            {...register('salePriceSpecial')}
                            error={!!errors.salePriceSpecial}
                            errorMessage={errors.salePriceSpecial?.message}
                            type="number"
                            placeholder="Precio especial"
                        />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Ubicación" htmlFor='location'/>
                        <SelectMenu id='location'
                            {...register('location')}
                            error={!!errors.location}
                            errorMessage={errors.location?.message}
                            items={locationOptions}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="flex gap-2 mb-2">
                            <LabelInput value="Stock para la ubicacion actual." />
                            <Button size="sm" color="yellow"><TbExchange />Todo el stock para esta ubicacion.</Button>
                        </div>
                        <TextInput
                            {...register('quantityOnHan')}
                            error={!!errors.quantityOnHan}
                            errorMessage={errors.quantityOnHan?.message}
                            type='number'
                            placeholder="Stock en ubicación" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock mínimo en esta sucursal" />
                        <TextInput
                            {...register('minStockBranch')}
                            error={!!errors.minStockBranch}
                            errorMessage={errors.minStockBranch?.message}
                            type='number'
                            placeholder="Stock min." />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock máximo en la sucursal" />
                        <TextInput
                            {...register('maxStockBranch')}
                            error={!!errors.maxStockBranch}
                            errorMessage={errors.maxStockBranch?.message}
                            type='number'
                            placeholder="Stock max." />
                    </div>
                </div>
                <div className="w-full flex justify-end gap-2">
                    <Button type='submit' className='w-32 flex justify-center items-center'>
                        {isLoading ? <Spinner /> : <>Guardar<HiSave /></>}
                    </Button>
                </div>
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

export { FormNewProduct };
