'use client'
import { ProductEntity } from '../domain/entities/product.entity';
import { formatDate } from '@/shared/lib/utils/date-formatter';
import { Button } from '@/ui/components/buttons';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { TbPackage, TbBoxMultiple, TbBuildingWarehouse, TbMapPin } from 'react-icons/tb';

interface Props {
    product: ProductEntity;
}

export function ProductDetailsView({ product }: Props) {
    const handleAddLot = () => {
        console.log('Agregar nuevo lote');
    };

    const handleAddLotUnitPurchase = (lotId: string) => {
        console.log('Agregar lot-unit-purchase para lote:', lotId);
    };

    const handleAddInventory = (lotId: string) => {
        console.log('Agregar inventario para lote:', lotId);
    };

    const handleAddInventoryItem = (inventoryId: string) => {
        console.log('Agregar item de inventario para inventario:', inventoryId);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información General del Producto */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl mb-4 text-white p-2 bg-blue-700 rounded-sm flex items-center gap-2">
                    <TbPackage />
                    Información General
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Nombre:</label>
                            <p className="text-gray-900 font-semibold">{product.name}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">SKU:</label>
                            <p className="text-gray-900 font-mono text-sm">{product.sku || 'No asignado'}</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Descripción:</label>
                        <p className="text-gray-900 mt-1">{product.description || 'Sin descripción disponible'}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Código Universal:</label>
                            <p className="text-gray-900 font-mono font-semibold">{product.universalBarCode}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Unidad de Medida:</label>
                            <p className="text-gray-900 font-semibold">{product.unitOfMeasure}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Stock Mínimo Global:</label>
                            <p className="text-gray-900 font-semibold">{product.minStockGlobal}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Categoría:</label>
                            <p className="text-gray-900 font-semibold">{product.category?.name || 'Sin categoría'}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Marca:</label>
                            <p className="text-gray-900 font-semibold">{product.brand?.name || 'Sin marca'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Temporada:</label>
                            <p className="text-gray-900 font-semibold">{product.season?.name || 'Sin temporada'}</p>
                        </div>
                    </div>
                    
                    {product.imageUrl && (
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 block">Imagen del Producto:</label>
                            <div className="flex justify-center">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-40 h-40 object-cover rounded shadow-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* Información de Fechas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Fecha de Creación:</label>
                            <p className="text-gray-900 font-semibold">{formatDate(product.createdAt)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Última Actualización:</label>
                            <p className="text-gray-900 font-semibold">{formatDate(product.updatedAt)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Estado:</label>
                            <p className={`font-semibold ${product.deletedAt ? 'text-red-600' : 'text-green-600'}`}>
                                {product.deletedAt ? 'Eliminado' : 'Activo'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información de Lotes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white p-2 bg-blue-700 rounded-sm flex items-center gap-2">
                        <TbBoxMultiple />
                        Lotes del Producto
                    </h2>
                    <Button 
                        type="button" 
                        color="green" 
                        size="sm"
                        onClick={handleAddLot}
                        className="flex items-center gap-1"
                    >
                        <HiPlus /> Agregar Lote
                    </Button>
                </div>
                {product.lots && product.lots.length > 0 ? (
                    <div className="space-y-4">
                        {product.lots.map((lot, index) => (
                            <div key={lot.lotId} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                        <h3 className="font-semibold text-gray-800">Lote #{lot.lotNumber}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="button" color="blue" size="sm">
                                            <HiPencil />
                                        </Button>
                                        <Button type="button" color="red" size="sm">
                                            <HiTrash />
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Precio de Compra:</label>
                                        <p className="font-semibold text-gray-800">${lot.purchasePrice}</p>
                                    </div>
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Cantidad Inicial:</label>
                                        <p className="font-semibold text-gray-800">{lot.initialQuantity}</p>
                                    </div>
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Unidad de Compra:</label>
                                        <p className="font-semibold text-gray-800">{lot.purchaseUnit}</p>
                                    </div>
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Fecha de Recepción:</label>
                                        <p className="font-semibold text-gray-800">{formatDate(lot.receivedDate)}</p>
                                    </div>
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Fecha de Fabricación:</label>
                                        <p className="font-semibold text-gray-800">{lot.manufacturingDate ? formatDate(lot.manufacturingDate) : 'No especificada'}</p>
                                    </div>
                                    <div className="bg-white rounded p-3 shadow-sm">
                                        <label className="text-gray-600 font-semibold text-sm block">Fecha de Expiración:</label>
                                        <p className="font-semibold text-gray-800">{lot.expirationDate ? formatDate(lot.expirationDate) : 'No especificada'}</p>
                                    </div>
                                </div>

                                {/* Botón para agregar Lot Unit Purchase */}
                                <div className="mb-4">
                                    <Button 
                                        type="button" 
                                        color="yellow" 
                                        size="sm"
                                        onClick={() => handleAddLotUnitPurchase(lot.lotId.toString())}
                                        className="flex items-center gap-1"
                                    >
                                        <HiPlus /> Agregar Unidad de Compra
                                    </Button>
                                </div>

                                {/* Unidades de Compra del lote */}
                                {lot.lotUnitPurchases && lot.lotUnitPurchases.length > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                                <TbPackage />
                                                Unidades de Compra
                                            </h4>
                                        </div>
                                        <div className="space-y-3">
                                            {lot.lotUnitPurchases.map((unitPurchase) => (
                                                <div key={unitPurchase.lotUnitPurchaseId} className="bg-white rounded-lg p-4 shadow-sm">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h5 className="font-semibold text-gray-700">Unidad de Compra #{unitPurchase.lotUnitPurchaseId}</h5>
                                                        <div className="flex gap-2">
                                                            <Button type="button" color="blue" size="sm">
                                                                <HiPencil />
                                                            </Button>
                                                            <Button type="button" color="red" size="sm">
                                                                <HiTrash />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Precio de Compra:</label>
                                                            <p className="font-semibold text-gray-800">${unitPurchase.purchasePrice}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Cantidad:</label>
                                                            <p className="font-semibold text-gray-800">{unitPurchase.purchaseQuantity}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Unidad:</label>
                                                            <p className="font-semibold text-gray-800">{unitPurchase.unit}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Unidades por Unidad de Compra:</label>
                                                            <p className="font-semibold text-gray-800">{unitPurchase.unitsInPurchaseUnit}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Inventarios del lote */}
                                {lot.inventories && lot.inventories.length > 0 && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                                <TbBuildingWarehouse />
                                                Inventarios
                                            </h4>
                                            <Button 
                                                type="button" 
                                                color="blue" 
                                                size="sm"
                                                onClick={() => handleAddInventory(lot.lotId.toString())}
                                                className="flex items-center gap-1"
                                            >
                                                <HiPlus /> Agregar Inventario
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            {lot.inventories.map((inventory) => (
                                                <div key={inventory.inventoryId} className="bg-white rounded-lg p-4 shadow-sm">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h5 className="font-semibold text-gray-700">Inventario #{inventory.inventoryId}</h5>
                                                        <div className="flex gap-2">
                                                            <Button type="button" color="blue" size="sm">
                                                                <HiPencil />
                                                            </Button>
                                                            <Button type="button" color="red" size="sm">
                                                                <HiTrash />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Vendible:</label>
                                                            <p className={`font-semibold ${inventory.isSellable ? 'text-green-600' : 'text-red-600'}`}>
                                                                {inventory.isSellable ? 'Sí' : 'No'}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Precio Menudeo:</label>
                                                            <p className="font-semibold text-gray-800">${inventory.salePriceOne}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Precio Mayoreo:</label>
                                                            <p className="font-semibold text-gray-800">${inventory.salePriceMany}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Cant. Mayoreo:</label>
                                                            <p className="font-semibold text-gray-800">{inventory.saleQuantityMany}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Precio Especial:</label>
                                                            <p className="font-semibold text-gray-800">${inventory.salePriceSpecial}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Stock Mín.:</label>
                                                            <p className="font-semibold text-gray-800">{inventory.minStockBranch}</p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded p-2 shadow-sm">
                                                            <label className="text-gray-600 font-semibold text-xs uppercase">Stock Máx.:</label>
                                                            <p className="font-semibold text-gray-800">{inventory.maxStockBranch}</p>
                                                        </div>
                                                    </div>

                                                    {/* Items de inventario */}
                                                    {inventory.inventoryItems && inventory.inventoryItems.length > 0 && (
                                                        <div className="mt-3">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <h6 className="font-semibold text-gray-600 flex items-center gap-1">
                                                                    <TbMapPin />
                                                                    Items de Inventario
                                                                </h6>
                                                                <Button 
                                                                    type="button" 
                                                                    color="gray" 
                                                                    size="sm"
                                                                    onClick={() => handleAddInventoryItem(inventory.inventoryId.toString())}
                                                                    className="flex items-center gap-1"
                                                                >
                                                                    <HiPlus /> Agregar Item
                                                                </Button>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {inventory.inventoryItems.map((item) => (
                                                                    <div key={item.inventoryItemId} className="bg-gray-50 rounded p-3 shadow-sm flex justify-between items-center">
                                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
                                                                            <div>
                                                                                <label className="text-gray-600 font-semibold text-xs uppercase">Ubicación:</label>
                                                                                <p className="font-semibold text-gray-800">{item.location}</p>
                                                                            </div>
                                                                            <div>
                                                                                <label className="text-gray-600 font-semibold text-xs uppercase">Stock:</label>
                                                                                <p className="font-semibold text-gray-800">{item.quantityOnHan}</p>
                                                                            </div>
                                                                            <div>
                                                                                <label className="text-gray-600 font-semibold text-xs uppercase">Precio Compra:</label>
                                                                                <p className="font-semibold text-gray-800">${item.purchasePriceAtStock}</p>
                                                                            </div>
                                                                            <div>
                                                                                <label className="text-gray-600 font-semibold text-xs uppercase">Código Interno:</label>
                                                                                <p className="font-semibold text-gray-800 font-mono text-sm">{item.internalBarCode}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-1 ml-2">
                                                                            <Button type="button" color="blue" size="sm">
                                                                                <HiPencil />
                                                                            </Button>
                                                                            <Button type="button" color="red" size="sm">
                                                                                <HiTrash />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm">
                        <p className="text-gray-600 font-medium">No hay lotes registrados para este producto.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
