'use client'
import { ProductEntity } from '../domain/entities/product.entity';
import { formatDate } from '@/shared/lib/utils/date-formatter';
import { Breadcrumb } from '@/ui/components/navigation/Breadcrumb';
import { InfoCard } from '@/ui/components/cards/InfoCard';
import { ActionButton } from '@/ui/components/buttons/ActionButton';
import { 
    HiPlus, 
    HiPencil, 
    HiTrash,
    HiOutlineTag,
    HiOutlineQrcode,
    HiOutlineCube,
    HiOutlineCalendar,
    HiOutlineLocationMarker
} from 'react-icons/hi';
import { 
    TbPackage, 
    TbBoxMultiple, 
    TbBuildingWarehouse, 
    TbCurrencyDollar 
} from 'react-icons/tb';
import { UpdateProductModal } from './UpdateProductModal';

interface Props {
    product: ProductEntity;
}

export function ProductDetailsView({ product }: Props) {
    const handleAddLot = () => {
        // Agregar nuevo lote
    };

    const handleAddLotUnitPurchase = (lotId: string) => {
        // Agregar lot-unit-purchase para lote
    };

    const handleAddInventory = (lotId: string) => {
        // Agregar inventario para lote
    };

    const handleAddInventoryItem = (inventoryId: string) => {
        // Agregar item de inventario para inventario
    };

    const breadcrumbItems = [
        { label: 'Productos', href: '/products' },
        { label: product.name }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Header con título y acciones */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 mt-1">Detalle del producto</p>
                </div>
                <div className="flex gap-2">
                    <ActionButton variant="edit" size="md">
                        <HiPencil className="w-4 h-4" />
                        Editar
                    </ActionButton>
                    <ActionButton variant="delete" size="md">
                        <HiTrash className="w-4 h-4" />
                        Eliminar
                    </ActionButton>
                </div>
            </div>
            <UpdateProductModal/>
            {/* Información del producto */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <TbPackage className="w-5 h-5 text-blue-600" />
                        Información del producto
                    </h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InfoCard
                            label="Nombre del producto"
                            value={product.name}
                            icon={<HiOutlineTag className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Código de barra U."
                            value={product.universalBarCode}
                            icon={<HiOutlineQrcode className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="SKU"
                            value={product.sku || 'No asignado'}
                            icon={<HiOutlineTag className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Unidad de medida para ventas"
                            value={product.unitOfMeasure}
                            icon={<HiOutlineCube className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Stock mínimo global"
                            value={product.minStockGlobal.toString()}
                            icon={<TbBoxMultiple className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Categoría"
                            value={product.category?.name || 'Sin categoría'}
                            icon={<HiOutlineTag className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Marca"
                            value={product.brand?.name || 'Sin marca'}
                            icon={<HiOutlineTag className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Temporada"
                            value={product.season?.name || 'Todo el año'}
                            icon={<HiOutlineCalendar className="w-4 h-4" />}
                        />
                        <InfoCard
                            label="Última Actualización"
                            value={formatDate(product.updatedAt)}
                            icon={<HiOutlineCalendar className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>

            {/* Lote del producto */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <TbBoxMultiple className="w-5 h-5 text-blue-600" />
                        Lote del producto
                    </h2>
                    <ActionButton variant="add" onClick={handleAddLot}>
                        <HiPlus className="w-4 h-4" />
                        Agregar nuevo lote
                    </ActionButton>
                </div>
                
                {product.lots && product.lots.length > 0 ? (
                    <div className="p-6 space-y-6">
                        {product.lots.map((lot, index) => (
                            <div key={lot.lotId} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                            {index + 1}
                                        </span>
                                        Lote #{lot.lotNumber}
                                    </h3>
                                    <div className="flex gap-2">
                                        <ActionButton variant="edit">
                                            <HiPencil className="w-4 h-4" />
                                        </ActionButton>
                                        <ActionButton variant="delete">
                                            <HiTrash className="w-4 h-4" />
                                        </ActionButton>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <InfoCard
                                        label="Precio de compra"
                                        value={`$${lot.purchasePrice}`}
                                        icon={<TbCurrencyDollar className="w-4 h-4" />}
                                    />
                                    <InfoCard
                                        label="Cantidad comprada"
                                        value={lot.initialQuantity.toString()}
                                        icon={<TbBoxMultiple className="w-4 h-4" />}
                                    />
                                    <InfoCard
                                        label="Fecha de ingreso"
                                        value={formatDate(lot.receivedDate)}
                                        icon={<HiOutlineCalendar className="w-4 h-4" />}
                                    />
                                    <InfoCard
                                        label="Fecha de fabricación"
                                        value={lot.manufacturingDate ? formatDate(lot.manufacturingDate) : 'No especificada'}
                                        icon={<HiOutlineCalendar className="w-4 h-4" />}
                                    />
                                </div>

                                {/* Unidades de compra */}
                                {lot.lotUnitPurchases && lot.lotUnitPurchases.length > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-gray-700">Unidades de compra</h4>
                                            <ActionButton variant="add" onClick={() => handleAddLotUnitPurchase(lot.lotId.toString())}>
                                                <HiPlus className="w-4 h-4" />
                                            </ActionButton>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                {lot.lotUnitPurchases.map((unitPurchase) => (
                                                    <div key={unitPurchase.lotUnitPurchaseId} className="space-y-2">
                                                        <InfoCard
                                                            label="Unidad"
                                                            value={unitPurchase.unit}
                                                            className="bg-white"
                                                        />
                                                        <InfoCard
                                                            label="Cantidad comprada"
                                                            value={unitPurchase.purchaseQuantity.toString()}
                                                            className="bg-white"
                                                        />
                                                        <InfoCard
                                                            label="Costo de la unidad"
                                                            value={`$${unitPurchase.purchasePrice}`}
                                                            className="bg-white"
                                                        />
                                                        <InfoCard
                                                            label="Unidades base en esta unidad"
                                                            value={unitPurchase.unitsInPurchaseUnit.toString()}
                                                            className="bg-white"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Inventario */}
                                {lot.inventories && lot.inventories.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                                <TbBuildingWarehouse className="w-5 h-5" />
                                                Inventario
                                            </h4>
                                            <ActionButton variant="add" onClick={() => handleAddInventory(lot.lotId.toString())}>
                                                <HiPlus className="w-4 h-4" />
                                                Agregar inventario
                                            </ActionButton>
                                        </div>
                                        
                                        {lot.inventories.map((inventory) => (
                                            <div key={inventory.inventoryId} className="bg-gray-50 rounded-lg p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                    <InfoCard
                                                        label="Precio de menudeo"
                                                        value={`$${inventory.salePriceOne}`}
                                                        icon={<TbCurrencyDollar className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                    <InfoCard
                                                        label="Stock mínimo"
                                                        value={(inventory.minStockBranch ?? 0).toString()}
                                                        icon={<TbBoxMultiple className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                    <InfoCard
                                                        label="Stock máximo"
                                                        value={(inventory.maxStockBranch ?? 0).toString()}
                                                        icon={<TbBoxMultiple className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                    <InfoCard
                                                        label="Precio especial"
                                                        value={`$${inventory.salePriceSpecial}`}
                                                        icon={<TbCurrencyDollar className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                    <InfoCard
                                                        label="Unidades para mayoreo"
                                                        value={(inventory.saleQuantityMany ?? 0).toString()}
                                                        icon={<TbBoxMultiple className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                    <InfoCard
                                                        label="Precio de mayoreo"
                                                        value={`$${inventory.salePriceMany}`}
                                                        icon={<TbCurrencyDollar className="w-4 h-4" />}
                                                        className="bg-white"
                                                    />
                                                </div>

                                                {/* Ubicación: Ventas */}
                                                {inventory.inventoryItems && inventory.inventoryItems.length > 0 && (
                                                    <div>
                                                        <div className="flex justify-between items-center mb-3">
                                                            <h5 className="font-medium text-gray-700 flex items-center gap-2">
                                                                <HiOutlineLocationMarker className="w-5 h-5" />
                                                                Ubicación: Ventas
                                                            </h5>
                                                            <ActionButton variant="add" onClick={() => handleAddInventoryItem(inventory.inventoryId.toString())}>
                                                                <HiPlus className="w-4 h-4" />
                                                            </ActionButton>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {inventory.inventoryItems.map((item) => (
                                                                <div key={item.inventoryItemId} className="bg-white rounded-lg p-4 border border-gray-200">
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                                            <span className="font-medium text-gray-800">{item.location}</span>
                                                                        </div>
                                                                        <div className="flex gap-1">
                                                                            <ActionButton variant="edit">
                                                                                <HiPencil className="w-3 h-3" />
                                                                            </ActionButton>
                                                                            <ActionButton variant="delete">
                                                                                <HiTrash className="w-3 h-3" />
                                                                            </ActionButton>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-2 text-sm">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-gray-600">Stock:</span>
                                                                            <span className="font-medium">{item.quantityOnHan}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-gray-600">Precio de compra:</span>
                                                                            <span className="font-medium">${item.purchasePriceAtStock}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-gray-600">Código de barra I.:</span>
                                                                            <span className="font-mono text-xs">{item.internalBarCode}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="text-center py-12">
                            <TbBoxMultiple className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">No hay lotes registrados para este producto</p>
                            <p className="text-gray-500 text-sm mt-1">Agrega un lote para comenzar a gestionar el inventario</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}