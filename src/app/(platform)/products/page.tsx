import { Button } from "@/ui/components/buttons";
import { TextInput } from "@/ui/components/inputs";
import { Metadata } from "next";
import { IoMdAdd } from "react-icons/io";
import { MdCategory, MdEditSquare, MdOutlineViewTimeline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RoundedButton } from "@/ui/components/buttons/RoundedButton";

export const metadata:Metadata = {
    title: 'Productos'
}

export default function(){
    return (
        <main className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 w-[700px]">
                <Button color="blue" 
                    size="md">
                    <IoMdAdd />
                    Nuevo Producto
                </Button>
                <Button color="yellow"
                    size="md">
                    <MdCategory />
                    Nueva Categoria
                </Button>
                <Button color="green"
                    size="md">
                    <IoMdAdd />
                    Nueva Marca
                </Button>
                <Button color="gray"
                    size="md">
                    <MdOutlineViewTimeline />
                    Nueva temporada
                </Button>
            </div>
            <div className="flex gap-2">
                <Button className="w-10">
                    <FaSearch/>
                </Button>
                <TextInput placeholder="Buscar producto" />
            </div>
            <h1 className="text-xl">Lista de productos</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                <thead className="text-sm text-gray-700 uppercase bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">C. Barra</th>
                        <th scope="col" className="px-6 py-3">Producto</th>
                        <th scope="col" className="px-6 py-3">Stock</th>
                        <th scope="col" className="px-6 py-3">Ubicación</th>
                        <th scope="col" className="px-6 py-3">P. Comp</th>
                        <th scope="col" className="px-6 py-3">P. Menu.</th>
                        <th scope="col" className="px-6 py-3">P. May.</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody className="border-y border-gray-300">
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4">1314263557</td>
                        <td className="px-6 py-4">Sombrilla Infantil</td>
                        <td className="px-6 py-4">30</td>
                        <td className="px-6 py-4">Venta</td>
                        <td className="px-6 py-4">$29</td>
                        <td className="px-6 py-4">$50</td>
                        <td className="px-6 py-4">$48</td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                            <RoundedButton color="yellow">
                                <MdEditSquare />
                            </RoundedButton>
                            <RoundedButton color="red">
                                <AiFillDelete />
                            </RoundedButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}