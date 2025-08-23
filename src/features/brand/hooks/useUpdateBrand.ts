import { useState } from 'react';
import { updateBrandAction } from '../actions/update-brand.action';
import { UpdateBrandDTO } from '../application/dtos/update-brand.dto';

export function useUpdateBrand() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBrand = async (updateBrandDTO: UpdateBrandDTO) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await updateBrandAction(updateBrandDTO);

      if (!result.success) {
        setError(result.error || 'Error updating brand');
        return false;
      }

      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateBrand,
    isLoading,
    error,
  };
}
