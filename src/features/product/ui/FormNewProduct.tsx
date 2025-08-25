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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-full mx-auto p-4 lg:p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
                    {/* Campos ocultos para IDs del workspace */}
                    <input type="hidden" {...register('establishmentId')} />
                    <input type="hidden" {...register('branchOfficeId')} />
                    
                    {/* Sección Principal del Producto */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 lg:px-6 py-4">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Información del Producto
                            </h2>
                        </div>
                        <div className="p-4 lg:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                                <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                                    <LabelInput value="Nombre del producto *" />
                                    <TextInput
                                        {...register('name')}
                                        error={!!errors.name}
                                        errorMessage={errors.name?.message}
                                        placeholder="Ingresa el nombre del producto"
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Código de barras universal *" />
                                    <TextInput
                                        {...register('universalBarCode')}
                                        error={!!errors.universalBarCode}
                                        errorMessage={errors.universalBarCode?.message}
                                        placeholder="Ej: 123456789012"
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Stock Mínimo Global *" />
                                    <TextInput
                                        {...register('minStockGlobal')}
                                        error={!!errors.minStockGlobal}
                                        errorMessage={errors.minStockGlobal?.message}
                                        type='number'
                                        placeholder="Ej: 10"
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Categoría *" htmlFor='category' />
                                    <SelectMenu id='category'
                                        {...register('categoryId')}
                                        error={!!errors.categoryId}
                                        errorMessage={errors.categoryId?.message}
                                        items={categoryOptions}
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Marca *" htmlFor='brand' />
                                    <SelectMenu id='brand'
                                        {...register('brandId')}
                                        error={!!errors.brandId}
                                        errorMessage={errors.brandId?.message}
                                        items={brandOptions}
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Temporada *" htmlFor='season' />
                                    <SelectMenu id='season'
                                        {...register('seasonId')}
                                        error={!!errors.seasonId}
                                        errorMessage={errors.seasonId?.message}
                                        items={seasonOptions}
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Unidad de medida para ventas *" htmlFor='unitOfMeasure' />
                                    <SelectMenu id='unitOfMeasure'
                                        {...register('unitOfMeasure')}
                                        error={!!errors.unitOfMeasure}
                                        errorMessage={errors.unitOfMeasure?.message}
                                        items={forSaleOptions}
                                    />
                                </div>
                                
                                <div className="md:col-span-2 xl:col-span-2">
                                    <LabelInput value="Descripción del producto" />
                                    <TextInput
                                        {...register('description')}
                                        error={!!errors.description}
                                        errorMessage={errors.description?.message}
                                        placeholder="Describe las características del producto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Lote del Producto */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-50 border-l border-r border-b border-gray-200">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-4 lg:px-6 py-4">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Información del Lote
                            </h2>
                        </div>
                        <div className="p-4 lg:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
                                <div>
                                    <LabelInput value="Unidad de medida *" htmlFor='purchaseUnit' />
                                    <SelectMenu id='purchaseUnit'
                                        {...register('purchaseUnit')}
                                        error={!!errors.purchaseUnit}
                                        errorMessage={errors.purchaseUnit?.message}
                                        items={forSaleOptions}
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Precio de compra *" />
                                    <TextInput
                                        {...register('purchasePrice')}
                                        error={!!errors.purchasePrice}
                                        errorMessage={errors.purchasePrice?.message}
                                        type='number'
                                        placeholder="0.00"
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Stock inicial *" />
                                    <TextInput
                                        {...register('initialQuantity')}
                                        error={!!errors.initialQuantity}
                                        errorMessage={errors.initialQuantity?.message}
                                        type='number'
                                        placeholder="Cantidad inicial"
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Fecha de ingreso al establecimiento *" />
                                    <TextInput
                                        {...register('receivedDate')}
                                        error={!!errors.receivedDate}
                                        errorMessage={errors.receivedDate?.message}
                                        type='date'
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Fecha de fabricación" />
                                    <TextInput
                                        {...register('manufacturingDate')}
                                        error={!!errors.manufacturingDate}
                                        errorMessage={errors.manufacturingDate?.message}
                                        type='date'
                                    />
                                </div>
                                
                                <div>
                                    <LabelInput value="Fecha de caducidad" />
                                    <TextInput
                                        {...register('expirationDate')}
                                        error={!!errors.expirationDate}
                                        errorMessage={errors.expirationDate?.message}
                                        type='date'
                                    />
                                </div>
                            </div>

                            {/* Sección de Costos por Unidades */}
                            <div className="mt-6 xl:col-span-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Costos por Unidades</h3>
                                    <Button
                                        type='button'
                                        color='blue'
                                        size="sm"
                                        onClick={addLotUnitPurchase}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-lg">+</span>
                                        Agregar unidad de compra
                                    </Button>
                                </div>
                                
                                {/* Mostrar error general del array si existe */}
                                {errors.lotUnitPurchases && typeof errors.lotUnitPurchases.message === 'string' && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{errors.lotUnitPurchases.message}</p>
                                    </div>
                                )}
                                
                                <div className="space-y-4">
                                    {lotUnitPurchases.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Unidad de compra #{index + 1}
                                                </span>
                                                {lotUnitPurchases.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeLotUnitPurchase(index)}
                                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                                                        title="Eliminar unidad de compra"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sección de Inventario del Producto */}
                    <div className="bg-gradient-to-r from-blue-50 to-violet-50 border-l border-r border-b border-blue-200">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 lg:px-6 py-4">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Inventario del Producto
                            </h2>
                        </div>
                        <div className="p-4 lg:p-6">
                            {/* Sección de Ubicaciones del Inventario */}
                            <div className="mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <h3 className="text-lg font-medium text-gray-900">Ubicaciones del Inventario</h3>
                                    <Button
                                        type='button'
                                        color='blue'
                                        size="sm"
                                        onClick={addInventoryItem}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-lg">+</span>
                                        Agregar ubicación
                                    </Button>
                                </div>
                                
                                {/* Mostrar error general del array si existe */}
                                {errors.inventoryItems && typeof errors.inventoryItems.message === 'string' && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{errors.inventoryItems.message}</p>
                                    </div>
                                )}
                                
                                <div className="space-y-4">
                                    {inventoryItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium text-gray-500">
                                                    Ubicación #{index + 1}
                                                </span>
                                                {inventoryItems.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeInventoryItem(index)}
                                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                                                        title="Eliminar ubicación"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                                    <div className="flex flex-col">
                                                        <div className='flex'>
                                                            <LabelInput value="Código de barras interno *  " />
                                                            <Button 
                                                                type='button' 
                                                                size="sm" 
                                                                color="yellow" 
                                                                onClick={() => handleBarCodeMatch(index)}
                                                                className="whitespace-nowrap"
                                                            >
                                                                <TbExchange className="w-4 h-4" />
                                                                User codigo universal
                                                            </Button>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <TextInput
                                                                type="text"
                                                                value={item.internalBarCode}
                                                                onChange={(e) =>
                                                                    updateInventoryItem(index, "internalBarCode", e.target.value)
                                                                }
                                                                error={!!(errors.inventoryItems?.[index]?.internalBarCode)}
                                                                errorMessage={errors.inventoryItems?.[index]?.internalBarCode?.message}
                                                                placeholder="Código interno"
                                                            />
                                                        </div>
                                                    </div>
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
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sección de Precios de Venta */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-800 mb-3">💰 Precio de Menudeo</h4>
                                    <LabelInput value="Precio de venta por menudeo *" />
                                    <TextInput
                                        {...register('salePriceOne')}
                                        error={!!errors.salePriceOne}
                                        errorMessage={errors.salePriceOne?.message}
                                        type='number'
                                        placeholder="0.00"
                                    />
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-800 mb-3">📦 Precio de Mayoreo</h4>
                                    <LabelInput value="Precio de venta por mayoreo *" />
                                    <TextInput
                                        {...register('salePriceMany')}
                                        error={!!errors.salePriceMany}
                                        errorMessage={errors.salePriceMany?.message}
                                        type='number'
                                        placeholder="0.00"
                                    />
                                    <div className="mt-3">
                                        <LabelInput value="Cantidad para mayoreo *" />
                                        <TextInput
                                            {...register('saleQuantityMany')}
                                            error={!!errors.saleQuantityMany}
                                            errorMessage={errors.saleQuantityMany?.message}
                                            type="number"
                                            placeholder="Cantidad mínima"
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-medium text-purple-800 mb-3">⭐ Precio Especial</h4>
                                    <LabelInput value="Precio especial *" />
                                    <TextInput
                                        {...register('salePriceSpecial')}
                                        error={!!errors.salePriceSpecial}
                                        errorMessage={errors.salePriceSpecial?.message}
                                        type="number"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Sección de Stocks */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                                    <h4 className="font-medium text-orange-800 mb-3">📉 Stock Mínimo en Sucursal</h4>
                                    <LabelInput value="Stock mínimo en esta sucursal *" />
                                    <TextInput
                                        {...register('minStockBranch')}
                                        error={!!errors.minStockBranch}
                                        errorMessage={errors.minStockBranch?.message}
                                        type='number'
                                        placeholder="Cantidad mínima"
                                    />
                                </div>
                                
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                                    <h4 className="font-medium text-indigo-800 mb-3">📈 Stock Máximo en Sucursal</h4>
                                    <LabelInput value="Stock máximo en la sucursal *" />
                                    <TextInput
                                        {...register('maxStockBranch')}
                                        error={!!errors.maxStockBranch}
                                        errorMessage={errors.maxStockBranch?.message}
                                        type='number'
                                        placeholder="Cantidad máxima"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="bg-gray-100 border-l border-r border-b border-gray-200 px-4 lg:px-6 py-4">
                        <div className="flex justify-end gap-4">
                            <Button 
                                type='submit' 
                                className='px-6 lg:px-8 py-3 flex justify-center items-center gap-2 text-lg font-medium'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <HiSave className="w-5 h-5" />
                                        Guardar Producto
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
                
                <FloatMessage
                    key={floatMessageState.summary}
                    description={floatMessageState.description}
                    summary={floatMessageState.summary}
                    type={floatMessageState.type}
                    isActive={floatMessageState.isActive} 
                />
            </div>
        </div>
    )
}

export { FormNewProduct };
