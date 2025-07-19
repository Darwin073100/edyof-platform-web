import { Button } from '@/ui/components/buttons';
import { TextInput } from '@/ui/components/inputs';
import React from 'react'
import { FaSearch } from 'react-icons/fa';

function ProductSearch() {
  return (
    <div className="flex gap-2">
        <Button className="w-10">
            <FaSearch/>
        </Button>
        <TextInput placeholder="Buscar producto" />
    </div>
  )
}

export { ProductSearch };
