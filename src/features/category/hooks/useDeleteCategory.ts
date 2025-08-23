import { useState } from "react";
import { useRouter } from "next/navigation";
import { FloatMessageType } from "@/shared/ui/types/FloatMessageType";
import { deleteCategoryAction } from "../actions/delete-category.action";
import { useCategoryStore } from "../infraestructure/category.store";

const useDeleteCategory = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isConfirming, setIsConfirming] = useState<boolean>(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const { removeCategory } = useCategoryStore();
    const router = useRouter();
    
    const showConfirmation = (categoryId: string) => {
        if (isDeleting && deletingCategoryId === categoryId) {
            // Si ya está en modo de eliminación para esta categoría, cancelar
            setIsDeleting(false);
            setDeletingCategoryId(null);
        } else {
            // Mostrar confirmación para esta categoría
            setIsDeleting(true);
            setDeletingCategoryId(categoryId);
        }
    };

    const confirmDelete = async (categoryId: string) => {
        setIsConfirming(true);
        setFloatMessageState(() => ({}));

        try {
            const result = await deleteCategoryAction(categoryId);

            if (result?.ok) {
                // Remover del store local para feedback inmediato
                removeCategory(categoryId);
                
                // Refrescar datos del servidor
                router.refresh();
                
                setFloatMessageState(() => ({
                    description: 'Categoría eliminada correctamente',
                    summary: '¡Correcto!',
                    isActive: true,
                    type: 'blue'
                }));

                setTimeout(() => {
                    setFloatMessageState(() => ({}));
                }, 4000);

            } else {
                setFloatMessageState(() => ({
                    description: result?.error?.message || 'Error al eliminar la categoría',
                    summary: '¡Error!',
                    isActive: true,
                    type: 'red'
                }));

                setTimeout(() => {
                    setFloatMessageState(() => ({}));
                }, 6000);
            }
        } catch (error) {
            setFloatMessageState(() => ({
                description: 'Error inesperado al eliminar la categoría',
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));

            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 6000);
        } finally {
            setIsConfirming(false);
            setIsDeleting(false);
            setDeletingCategoryId(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleting(false);
        setDeletingCategoryId(null);
    };

    return {
        isDeleting,
        isConfirming,
        deletingCategoryId,
        floatMessageState,
        setFloatMessageState,
        showConfirmation,
        confirmDelete,
        cancelDelete,
        // Mantener el método anterior para compatibilidad
        handleDelete: showConfirmation
    }
}

export { useDeleteCategory };
