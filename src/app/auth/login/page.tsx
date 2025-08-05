import { Login } from "@/features/auth/ui/Login"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Pagina para loguearse en la App de EdCode"
}

export default function () {
  return (
    <>
      <Login />
    </>
  )
}
