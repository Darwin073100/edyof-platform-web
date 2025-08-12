import { ProtectedRoute } from "@/ui/components/routes/ProtectedRoute";
import { Metadata } from "next";
import { Button } from "@/ui/components/buttons";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { viewProductByIdAction } from "@/features/product/actions/view-product-by-id.action";
import { ProductDetailsView } from "@/features/product/ui/ProductDetailsView";

export const metadata: Metadata = {
    title: 'Detalles del Producto'
}

interface Props {
    params: {
        productId: string;
    }
}

export default async function ProductDetailsPage({ params }: Props) {
    const { productId } = params;
    
    // Obtener los detalles del producto
    const productResult = await viewProductByIdAction(productId);
    
    if (!productResult.ok || !productResult.value) {
        return (
            <ProtectedRoute>
                <main className="flex flex-col gap-6 w-full min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
                    <div className="bg-gradient-to-r from-white to-red-50 rounded-xl shadow-lg p-6 border border-red-100">
                        <div className="flex items-center gap-4 mb-4">
                            <Link href="/products">
                                <Button color="gray" size="sm" className="hover:scale-95 transition-transform duration-200">
                                    <IoArrowBack className="mr-1" /> Volver
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-600 rounded-full"></div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 to-orange-700 bg-clip-text text-transparent">
                                    ❌ Producto no encontrado
                                </h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 text-red-800 px-6 py-8 rounded-xl shadow-lg text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-xl font-bold mb-2">¡Oops! No pudimos encontrar este producto</h2>
                        <p className="text-red-700">El producto solicitado no existe en nuestra base de datos o no se pudo cargar en este momento.</p>
                        <div className="mt-6">
                            <Link href="/products">
                                <Button color="red" className="shadow-md hover:shadow-lg transition-shadow duration-200">
                                    🏠 Volver a la lista de productos
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </ProtectedRoute>
        );
    }

    const product = productResult.value;

    return (
        <ProtectedRoute>
            <main className="flex flex-col gap-6 w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
                {/* Header con gradiente y sombra */}
                <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/products">
                                <Button color="gray" size="sm" className="hover:scale-105 transition-transform duration-200 shadow-md">
                                    <IoArrowBack className="mr-1" /> Volver
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                                    📦 Detalles del Producto
                                </h1>
                            </div>
                        </div>
                        
                        {/* Badge con el nombre del producto */}
                        <div className="hidden md:block">
                            <div className="bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-300 px-4 py-2 rounded-full">
                                <p className="text-emerald-800 font-semibold text-sm">
                                    🏷️ {product.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ProductDetailsView product={product} />
            </main>
        </ProtectedRoute>
    );
}
