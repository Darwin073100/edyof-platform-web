/**
 * Formatea una fecha a string legible
 */
export function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Fecha inválida';
    }
}

/**
 * Formatea una fecha a string corto
 */
export function formatDateShort(date: Date | string | null | undefined): string {
    if (!date) return 'N/A';
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('es-ES');
    } catch (error) {
        return 'Fecha inválida';
    }
}
