import { ProtectedRoute } from "@/components/ProtectedRoute"

export const metadata = {
    title: 'Nueva venta'
}

export default function NewSale(){
    return(
        <ProtectedRoute>
            <h1>New Sale</h1>
        </ProtectedRoute>
    )
}