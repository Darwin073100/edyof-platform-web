import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
    title: 'Ventas'
}
export default function(){
    return (
        <ProtectedRoute>
            <h1>Ventas</h1>
        </ProtectedRoute>
    );
}