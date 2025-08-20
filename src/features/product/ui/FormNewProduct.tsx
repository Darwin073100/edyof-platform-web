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
import React, { useEffect, useState } from 'react'
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
        errors, floatMessageState, handleSubmit, isLoading, addLotUnitPurchase, removeLotUnitPurchase,
        onSubmit, register, handleBarCodeMatch, updateLotUnitPurchase, lotUnitPurchases,
        addInventoryItem, removeInventoryItem, updateInventoryItem, inventoryItems
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
                {/* Campos ocultos para IDs del workspace */}
                <input type="hidden" {...register('establishmentId')} />
                <input type="hidden" {...register('branchOfficeId')} />
                
                <div className="w-full flex md:flex-row sm:flex-col max-sm:flex-col min-md:justify-between">
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-blue-700 rounded-sm">Producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Nombre del producto *" />
                            <TextInput
                                {...register('name')}
                                error={!!errors.name}
                                errorMessage={errors.name?.message}
                                placeholder="Nombre del producto" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Código de barras universal *" />
                            <TextInput
                                {...register('universalBarCode')}
                                error={!!errors.universalBarCode}
                                errorMessage={errors.universalBarCode?.message}
                                placeholder="Código de barras universal *" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock Mínimo Global *" />
                            <TextInput
                                {...register('minStockGlobal')}
                                error={!!errors.minStockGlobal}
                                errorMessage={errors.minStockGlobal?.message}
                                type='number'
                                placeholder="Stock mínimo" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Categoría *" htmlFor='category' />
                            <SelectMenu id='category'
                                {...register('categoryId')}
                                error={!!errors.categoryId}
                                errorMessage={errors.categoryId?.message}
                                items={categoryOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Marca *" htmlFor='brand' />
                            <SelectMenu id='brand'
                                {...register('brandId')}
                                error={!!errors.brandId}
                                errorMessage={errors.brandId?.message}
                                items={brandOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Temporada *" htmlFor='season' />
                            <SelectMenu id='season'
                                {...register('seasonId')}
                                error={!!errors.seasonId}
                                errorMessage={errors.seasonId?.message}
                                items={seasonOptions} />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Unidad de medida *" htmlFor='unitOfMeasure' />
                            <SelectMenu id='unitOfMeasure'
                                {...register('unitOfMeasure')}
                                error={!!errors.unitOfMeasure}
                                errorMessage={errors.unitOfMeasure?.message}
                                items={forSaleOptions}
                            />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Descripción del producto" />
                            <TextInput
                                {...register('description')}
                                error={!!errors.description}
                                errorMessage={errors.description?.message}
                                placeholder="Descripción" />
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <h2 className="text-xl mb-2 text-white p-1 bg-blue-700 rounded-sm">Lote del producto</h2>
                        <div className="mb-2">
                            <LabelInput value="Unidad de medida *" htmlFor='purchaseUnit' />
                            <SelectMenu id='purchaseUnit'
                                {...register('purchaseUnit')}
                                error={!!errors.purchaseUnit}
                                errorMessage={errors.purchaseUnit?.message}
                                items={forSaleOptions}
                            />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Precio de compra *" />
                            <TextInput
                                {...register('purchasePrice')}
                                error={!!errors.purchasePrice}
                                errorMessage={errors.purchasePrice?.message}
                                type='number'
                                placeholder="Precio de compra" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Stock inicial *" />
                            <TextInput
                                {...register('initialQuantity')}
                                error={!!errors.initialQuantity}
                                errorMessage={errors.initialQuantity?.message}
                                type='number'
                                placeholder="Stock inicial" />
                        </div>
                        <div className="mb-2">
                            <LabelInput value="Fecha de ingreso al establecimiento *" />
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
                        <div className='mb-2 flex flex-col gap-2'>
                            <LabelInput value='Costo por unidades *'/>
                            {/* Mostrar error general del array si existe */}
                            {errors.lotUnitPurchases && typeof errors.lotUnitPurchases.message === 'string' && (
                                <p className="text-red-500 text-sm">{errors.lotUnitPurchases.message}</p>
                            )}
                            {lotUnitPurchases.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white relative"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <LabelInput value="Precio de compra *" />
                                            <TextInput
                                                type="number"
                                                value={item.purchasePrice}
                                                onChange={(e) =>
                                                    updateLotUnitPurchase(index, "purchasePrice", Number(e.target.value))
                                                }
                                                error={!!(errors.lotUnitPurchases?.[index]?.purchasePrice)}
                                                errorMessage={errors.lotUnitPurchases?.[index]?.purchasePrice?.message}
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <LabelInput value="Cantidad *" />
                                            <TextInput
                                                type="number"
                                                value={item.purchaseQuantity}
                                                onChange={(e) =>
                                                    updateLotUnitPurchase(index, "purchaseQuantity", Number(e.target.value))
                                                }
                                                error={!!(errors.lotUnitPurchases?.[index]?.purchaseQuantity)}
                                                errorMessage={errors.lotUnitPurchases?.[index]?.purchaseQuantity?.message}
                                                placeholder="0"
                                            />
                                        </div>

                                        <div>
                                            <LabelInput value="Unidad *" />
                                            <SelectMenu
                                                items={forSaleOptions}
                                                value={item.unit}
                                                onChange={(e) =>
                                                    updateLotUnitPurchase(index, "unit", e.target.value)
                                                }
                                                error={!!(errors.lotUnitPurchases?.[index]?.unit)}
                                                errorMessage={errors.lotUnitPurchases?.[index]?.unit?.message}
                                            />
                                        </div>

                                        <div>
                                            <LabelInput value="Unidades compradas *" />
                                            <TextInput
                                                type="number"
                                                value={item.unitsInPurchaseUnit}
                                                onChange={(e) =>
                                                    updateLotUnitPurchase(index, "unitsInPurchaseUnit", Number(e.target.value))
                                                }
                                                error={!!(errors.lotUnitPurchases?.[index]?.unitsInPurchaseUnit)}
                                                errorMessage={errors.lotUnitPurchases?.[index]?.unitsInPurchaseUnit?.message}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                        <button
                                            type="button"
                                            onClick={() => removeLotUnitPurchase(index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold w-6 h-6 flex items-center justify-center"
                                            title="Eliminar unidad de compra"
                                        >
                                            ✖
                                        </button>
                                </div>
                            ))}
                            <Button
                                type='button'
                                color='gray'
                                onClick={addLotUnitPurchase}
                            >
                                + Agregar unidad de compra
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full p-2">
                    <h2 className="text-xl mb-2 text-white p-1 bg-blue-700 rounded-sm">Inventario del producto</h2>
                    
                    <div className='mb-2 flex flex-col gap-2'>
                        <LabelInput value='Ubicaciones del inventario *'/>
                        {/* Mostrar error general del array si existe */}
                        {errors.inventoryItems && typeof errors.inventoryItems.message === 'string' && (
                            <p className="text-red-500 text-sm">{errors.inventoryItems.message}</p>
                        )}
                        {inventoryItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white relative"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <LabelInput value="Ubicación *" />
                                        <SelectMenu
                                            items={locationOptions}
                                            value={item.location}
                                            onChange={(e) =>
                                                updateInventoryItem(index, "location", e.target.value)
                                            }
                                            error={!!(errors.inventoryItems?.[index]?.location)}
                                            errorMessage={errors.inventoryItems?.[index]?.location?.message}
                                        />
                                    </div>

                                    <div>
                                        <LabelInput value="Cantidad en ubicación *" />
                                        <TextInput
                                            type="number"
                                            value={item.quantityOnHand}
                                            onChange={(e) =>
                                                updateInventoryItem(index, "quantityOnHand", Number(e.target.value))
                                            }
                                            error={!!(errors.inventoryItems?.[index]?.quantityOnHand)}
                                            errorMessage={errors.inventoryItems?.[index]?.quantityOnHand?.message}
                                            placeholder="0"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <LabelInput value="Código de barras interno *" />
                                            {index === 0 && (
                                                <Button type='button' size="sm" color="yellow" onClick={() => handleBarCodeMatch()}>
                                                    <TbExchange />Usar código universal
                                                </Button>
                                            )}
                                        </div>
                                        <TextInput
                                            type="text"
                                            value={item.internalBarCode}
                                            onChange={(e) =>
                                                updateInventoryItem(index, "internalBarCode", e.target.value)
                                            }
                                            error={!!(errors.inventoryItems?.[index]?.internalBarCode)}
                                            errorMessage={errors.inventoryItems?.[index]?.internalBarCode?.message}
                                            placeholder="Código de barra interno"
                                        />
                                    </div>

                                    <div>
                                        <LabelInput value="Precio de compra en stock *" />
                                        <TextInput
                                            type="number"
                                            value={item.purchasePriceAtStock}
                                            onChange={(e) =>
                                                updateInventoryItem(index, "purchasePriceAtStock", Number(e.target.value))
                                            }
                                            error={!!(errors.inventoryItems?.[index]?.purchasePriceAtStock)}
                                            errorMessage={errors.inventoryItems?.[index]?.purchasePriceAtStock?.message}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                
                                {inventoryItems.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeInventoryItem(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold w-6 h-6 flex items-center justify-center"
                                        title="Eliminar ubicación"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button
                            type='button'
                            color='gray'
                            onClick={addInventoryItem}
                        >
                            + Agregar ubicación
                        </Button>
                    </div>

                    <div className="mb-2">
                        <LabelInput value="Precio de venta por menudeo *" />
                        <TextInput
                            {...register('salePriceOne')}
                            error={!!errors.salePriceOne}
                            errorMessage={errors.salePriceOne?.message}
                            type='number'
                            placeholder="Precio de menudeo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio de venta por mayoreo *" />
                        <TextInput
                            {...register('salePriceMany')}
                            error={!!errors.salePriceMany}
                            errorMessage={errors.salePriceMany?.message}
                            type='number'
                            placeholder="Precio de mayoreo" />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Cantidad para mayoreo *" />
                        <TextInput
                            {...register('saleQuantityMany')}
                            error={!!errors.saleQuantityMany}
                            errorMessage={errors.saleQuantityMany?.message}
                            type="number"
                            placeholder="Cantidad para mayoreo"
                        />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Precio especial *" />
                        <TextInput
                            {...register('salePriceSpecial')}
                            error={!!errors.salePriceSpecial}
                            errorMessage={errors.salePriceSpecial?.message}
                            type="number"
                            placeholder="Precio especial"
                        />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock mínimo en esta sucursal *" />
                        <TextInput
                            {...register('minStockBranch')}
                            error={!!errors.minStockBranch}
                            errorMessage={errors.minStockBranch?.message}
                            type='number'
                            placeholder="Stock min." />
                    </div>
                    <div className="mb-2">
                        <LabelInput value="Stock máximo en la sucursal *" />
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
