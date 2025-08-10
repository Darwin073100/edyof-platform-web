import logo from "src/ui/assets/images/logologo.png";
import Image from "next/image"
export default function(){
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <Image src={logo} alt="Logo" className="w-16 h-16 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-gray-800">Iniciar sesión</h1>
          <p className="text-sm text-gray-500">Bienvenido de nuevo</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              autoFocus
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow transition"
          >
            Iniciar sesión →
          </button>
        </form>
      </div>
    </div>
    )
} 