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
    const { productId } = await params;
    
    // Obtener los detalles del producto
    const productResult = await viewProductByIdAction(productId);
    
    if (!productResult.ok || !productResult.value) {
        return (
            <ProtectedRoute>
                <main className="flex flex-col gap-6 w-full min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">                    
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
                <ProductDetailsView product={product} />
            </main>
        </ProtectedRoute>
    );
}
