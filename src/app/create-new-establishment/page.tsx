import { CreateEstablishmentForm } from "@/features/establishment/ui/CreateEstablishmentForm";

export const metadata = {
  title: 'Crear Establecimeinto'
}

export default async function (){

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen py-4 pr-4">
        <CreateEstablishmentForm />
      </div>
    </>
  )
}
