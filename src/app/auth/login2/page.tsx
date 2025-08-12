'use client'
import { useState } from "react";

export default function () {
  const [lotUnitPurchases, setLotUnitPurchases] = useState([
    { purchasePrice: "", purchaseQuantity: "", unit: "" },
  ]);

  const addLotUnitPurchase = () => {
    setLotUnitPurchases([
      ...lotUnitPurchases,
      { purchasePrice: "", purchaseQuantity: "", unit: "" },
    ]);
  };

  const removeLotUnitPurchase = (index: number) => {
    setLotUnitPurchases(lotUnitPurchases.filter((_, i) => i !== index));
  };

  const updateLotUnitPurchase = (index: number, field: string, value: string) => {
    const updated = [...lotUnitPurchases];
    updated[index] = { ...updated[index], [field]: value };
    setLotUnitPurchases(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Costo por unidad</h3>

      {lotUnitPurchases.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio de compra
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={item.purchasePrice}
                onChange={(e) =>
                  updateLotUnitPurchase(index, "purchasePrice", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={item.purchaseQuantity}
                onChange={(e) =>
                  updateLotUnitPurchase(index, "purchaseQuantity", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={item.unit}
                onChange={(e) =>
                  updateLotUnitPurchase(index, "unit", e.target.value)
                }
              >
                <option value="">Selecciona</option>
                <option value="pc">Pieza</option>
                <option value="paquete">Paquete</option>
                <option value="kg">Kilogramo</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeLotUnitPurchase(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addLotUnitPurchase}
        className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded-lg shadow"
      >
        + Agregar unidad de compra
      </button>
    </div>
  );
}
