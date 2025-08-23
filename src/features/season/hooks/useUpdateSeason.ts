import { useState } from "react";
import { useRouter } from "next/navigation";
import { FloatMessageType } from "@/shared/ui/types/FloatMessageType";
import { updateSeasonAction } from "../actions/update-season.action";
import { useSeasonStore } from "../infraestructure/season.store";
import { UpdateSeasonDTO } from "../application/dtos/update-season.dto";

const useUpdateSeason = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const { updateSeason, setSeason } = useSeasonStore();
    const router = useRouter();
    
    const handleUpdate = async (updateData: UpdateSeasonDTO) => {
        setIsUpdating(true);
        setFloatMessageState(() => ({}));

        try {
            const result = await updateSeasonAction(updateData);

            if (result?.ok && result.value) {
                // Actualizar en el store local para feedback inmediato
                updateSeason(result.value);
                
                // Limpiar la temporada seleccionada
                setSeason(null);
                
                // Refrescar datos del servidor
                router.refresh();
                
                setFloatMessageState(() => ({
                    description: 'Temporada actualizada correctamente',
                    summary: '¡Correcto!',
                    isActive: true,
                    type: 'blue'
                }));

                setTimeout(() => {
                    setFloatMessageState(() => ({}));
                }, 4000);

                return { success: true };
            } else {
                setFloatMessageState(() => ({
                    description: result?.error?.message || 'Error al actualizar la temporada',
                    summary: '¡Error!',
                    isActive: true,
                    type: 'red'
                }));

                setTimeout(() => {
                    setFloatMessageState(() => ({}));
                }, 6000);

                return { success: false, error: result?.error?.message };
            }
        } catch (error) {
            setFloatMessageState(() => ({
                description: 'Error inesperado al actualizar la temporada',
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));

            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 6000);

            return { success: false, error: 'Error inesperado' };
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdate = () => {
        setSeason(null);
        setFloatMessageState(() => ({}));
    };

    return {
        isUpdating,
        floatMessageState,
        setFloatMessageState,
        handleUpdate,
        cancelUpdate
    }
}

export { useUpdateSeason };
