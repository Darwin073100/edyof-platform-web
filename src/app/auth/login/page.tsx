import { Button } from "@/ui/components/buttons";
import { TextInput } from "@/ui/components/inputs";
import { LabelInput } from "@/ui/components/labels";
import { Metadata } from "next"
import Image from "next/image"
import { IoMdArrowRoundForward } from "react-icons/io";
import logo from "src/ui/assets/images/logologo.png";

export const metadata: Metadata = {
  title: "Login",
  description: "Pagina para loguearse en la App de Magic Intelligence"
}

export default function () {
  return (
    <main className="py-4 flex flex-col h-screen items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          className="rounded-full" 
          src={logo} alt="logotipo" 
          width={200} height={200}/>
        <h1 className="text-4xl text-gray-500">Inicio de sesión</h1>
      </div>
      <div className="w-96 bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl ">
        <div>
          <LabelInput value="Correo electrónico"/>
          <TextInput placeholder="Correo electrónico"/>
        </div>
        <div>
          <LabelInput value="Contraseña"/>
          <TextInput placeholder="Contraseña" type="password"/>
        </div>
        <div>
          <Button>
            Iniciar
            <IoMdArrowRoundForward />
          </Button>
        </div>
      </div>
    </main>
  )
}
