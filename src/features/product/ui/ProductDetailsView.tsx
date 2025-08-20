'use client'
import { ProductEntity } from '../domain/entities/product.entity';
import { formatDate } from '@/shared/lib/utils/date-formatter';

interface Props {
    product: ProductEntity;
}

export function ProductDetailsView({ product }: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información General del Producto */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                    <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-r-md mr-3"></div>
                    <h2 className="text-xl font-bold text-blue-800">
                        📦 Información General
                    </h2>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-400 shadow-sm">
                            <label className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">🏷️ Nombre:</label>
                            <p className="text-gray-900 font-bold text-lg">{product.name}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400 shadow-sm">
                            <label className="text-sm font-semibold text-purple-600 uppercase tracking-wide">🔢 SKU:</label>
                            <p className="text-gray-900 font-mono">{product.sku || 'No asignado'}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-l-4 border-amber-400 shadow-sm">
                        <label className="text-sm font-semibold text-amber-600 uppercase tracking-wide">📝 Descripción:</label>
                        <p className="text-gray-900 mt-1">{product.description || 'Sin descripción disponible'}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-rose-400 shadow-sm">
                            <label className="text-sm font-semibold text-rose-600 uppercase tracking-wide">📊 Código Universal:</label>
                            <p className="text-gray-900 font-mono text-lg font-bold">{product.universalBarCode}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-400 shadow-sm">
                            <label className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">📏 Unidad de Medida:</label>
                            <p className="text-gray-900 font-semibold">{product.unitOfMeasure}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                            <label className="text-sm font-semibold text-red-600 uppercase tracking-wide">⚠️ Stock Mínimo Global:</label>
                            <p className="text-red-800 font-bold text-xl">{product.minStockGlobal}</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                            <label className="text-sm font-semibold text-green-600 uppercase tracking-wide">🏪 Categoría:</label>
                            <p className="text-green-800 font-bold">{product.category?.name || 'Sin categoría'}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                            <label className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">🏷️ Marca:</label>
                            <p className="text-indigo-800 font-bold">{product.brand?.name || 'Sin marca'}</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                            <label className="text-sm font-semibold text-orange-600 uppercase tracking-wide">🌟 Temporada:</label>
                            <p className="text-orange-800 font-bold">{product.season?.name || 'Sin temporada'}</p>
                        </div>
                    </div>
                    
                    {product.imageUrl && (
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                            <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3 block">🖼️ Imagen del Producto:</label>
                            <div className="flex justify-center">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Información de Lotes */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl shadow-lg p-6 border border-emerald-200">
                <div className="flex items-center mb-4">
                    <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-700 rounded-r-md mr-3"></div>
                    <h2 className="text-xl font-bold text-emerald-800">
                        📦 Lotes del Producto
                    </h2>
                </div>
                {product.lots && product.lots.length > 0 ? (
                    <div className="space-y-4">
                        {product.lots.map((lot, index) => (
                            <div key={lot.lotId} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-5 border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-bold text-emerald-800 text-lg">Lote #{index + 1}</h3>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-300">
                                        ID: {lot.lotNumber}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                                        <label className="text-blue-600 font-semibold text-sm block">💰 Precio de Compra:</label>
                                        <p className="font-bold text-blue-800 text-xl">${lot.purchasePrice}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                                        <label className="text-purple-600 font-semibold text-sm block">📊 Cantidad Inicial:</label>
                                        <p className="font-bold text-purple-800 text-xl">{lot.initialQuantity}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
                                        <label className="text-amber-600 font-semibold text-sm block">📅 Fecha de Recepción:</label>
                                        <p className="font-semibold text-amber-800">{formatDate(lot.receivedDate)}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                                        <label className="text-green-600 font-semibold text-sm block">🏭 Fecha de Fabricación:</label>
                                        <p className="font-semibold text-green-800">{lot.manufacturingDate ? formatDate(lot.manufacturingDate) : 'No especificada'}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3 border border-red-200 md:col-span-2">
                                        <label className="text-red-600 font-semibold text-sm block">⏰ Fecha de Expiración:</label>
                                        <p className="font-semibold text-red-800">{lot.expirationDate ? formatDate(lot.expirationDate) : 'No especificada'}</p>
                                    </div>
                                </div>

                                {/* Información de Inventario para este lote */}
                                {lot.inventories && lot.inventories.length > 0 && (
                                    <div className="mt-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-sm"></div>
                                            <h4 className="font-bold text-indigo-700 text-lg">📋 Inventario</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {lot.inventories.map((inventory) => (
                                                <div key={inventory.inventoryItemId} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200 shadow-sm">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-blue-400">
                                                            <label className="text-blue-600 font-semibold text-xs uppercase tracking-wide">📍 Ubicación:</label>
                                                            <p className="font-bold text-blue-800">{inventory.location}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-green-400">
                                                            <label className="text-green-600 font-semibold text-xs uppercase tracking-wide">📦 Stock:</label>
                                                            <p className="font-bold text-green-800 text-lg">{inventory.quantityOnHand}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-purple-400">
                                                            <label className="text-purple-600 font-semibold text-xs uppercase tracking-wide">🔢 Código Interno:</label>
                                                            <p className="font-bold text-purple-800 font-mono text-sm">{inventory.internalBarCode}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-emerald-400">
                                                            <label className="text-emerald-600 font-semibold text-xs uppercase tracking-wide">✅ Vendible:</label>
                                                            <p className={`font-bold ${inventory.isSellable ? 'text-emerald-800' : 'text-red-600'}`}>
                                                                {inventory.isSellable ? '✅ Sí' : '❌ No'}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-md p-2 border border-yellow-300">
                                                            <label className="text-yellow-700 font-semibold text-xs uppercase tracking-wide">🏷️ Precio Menudeo:</label>
                                                            <p className="font-bold text-yellow-800 text-lg">${inventory.salePriceOne}</p>
                                                        </div>
                                                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-md p-2 border border-orange-300">
                                                            <label className="text-orange-700 font-semibold text-xs uppercase tracking-wide">🏪 Precio Mayoreo:</label>
                                                            <p className="font-bold text-orange-800 text-lg">${inventory.salePriceMany}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-cyan-400">
                                                            <label className="text-cyan-600 font-semibold text-xs uppercase tracking-wide">📊 Cant. Mayoreo:</label>
                                                            <p className="font-bold text-cyan-800">{inventory.saleQuantityMany}</p>
                                                        </div>
                                                        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-md p-2 border border-pink-300">
                                                            <label className="text-pink-700 font-semibold text-xs uppercase tracking-wide">⭐ Precio Especial:</label>
                                                            <p className="font-bold text-pink-800 text-lg">${inventory.salePriceSpecial}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-red-400">
                                                            <label className="text-red-600 font-semibold text-xs uppercase tracking-wide">⚠️ Stock Mín.:</label>
                                                            <p className="font-bold text-red-800">{inventory.minStockBranch}</p>
                                                        </div>
                                                        <div className="bg-white rounded-md p-2 border-l-3 border-green-400">
                                                            <label className="text-green-600 font-semibold text-xs uppercase tracking-wide">✅ Stock Máx.:</label>
                                                            <p className="font-bold text-green-800">{inventory.maxStockBranch}</p>
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
                ) : (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                        <div className="text-4xl mb-3">📭</div>
                        <p className="text-gray-600 font-medium">No hay lotes registrados para este producto.</p>
                    </div>
                )}
            </div>

            {/* Información de Fechas */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl shadow-lg p-6 lg:col-span-2 border border-slate-200">
                <div className="flex items-center mb-4">
                    <div className="w-3 h-8 bg-gradient-to-b from-slate-500 to-gray-700 rounded-r-md mr-3"></div>
                    <h2 className="text-xl font-bold text-slate-800">
                        🕒 Información de Auditoría
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <label className="text-green-700 font-bold text-sm uppercase tracking-wide">📅 Fecha de Creación:</label>
                        </div>
                        <p className="text-green-800 font-semibold">{formatDate(product.createdAt)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <label className="text-blue-700 font-bold text-sm uppercase tracking-wide">🔄 Última Actualización:</label>
                        </div>
                        <p className="text-blue-800 font-semibold">{formatDate(product.updatedAt)}</p>
                    </div>
                    <div className={`rounded-lg p-4 border hover:shadow-md transition-shadow duration-300 ${
                        product.deletedAt 
                            ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200' 
                            : 'bg-gradient-to-r from-emerald-50 to-green-100 border-green-200'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${product.deletedAt ? 'bg-red-500' : 'bg-green-500'}`}></div>
                            <label className={`font-bold text-sm uppercase tracking-wide ${
                                product.deletedAt ? 'text-red-700' : 'text-green-700'
                            }`}>🏷️ Estado:</label>
                        </div>
                        <p className={`font-bold text-lg ${
                            product.deletedAt ? 'text-red-800' : 'text-green-800'
                        }`}>
                            {product.deletedAt ? '❌ Eliminado' : '✅ Activo'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
