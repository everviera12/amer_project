'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SupplierDetails() {
  const { id_supplier } = useParams();  // Obtener el id_supplier desde la URL
  const [supplier, setSupplier] = useState(null); // Estado para los datos del proveedor
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  // Simulación de datos de entradas y salidas
  const truckEntries = [
    {
      driver_name: 'Juan Pérez',
      license_plate: 'ABC-123',
      weight_in: 1200,
      weight_out: 1100,
      entry_date: '2024-12-01 08:30',
    },
    {
      driver_name: 'Ana Gómez',
      license_plate: 'XYZ-789',
      weight_in: 1500,
      weight_out: 1400,
      entry_date: '2024-12-02 09:15',
    },
    {
      driver_name: 'Carlos López',
      license_plate: 'LMN-456',
      weight_in: 1300,
      weight_out: 1250,
      entry_date: '2024-12-03 10:00',
    },
  ];

  // Función para obtener los datos del proveedor
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`/api/supplier/${id_supplier}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del proveedor");
        }
        const data = await response.json();
        setSupplier(data.supplier); // Guardar los datos del proveedor en el estado
        setLoading(false); // Finalizar estado de carga
      } catch (error: any) {
        setError(error.message); // Guardar error en el estado
        setLoading(false); // Finalizar estado de carga
      }
    };

    if (id_supplier) {
      fetchSupplier(); // Ejecutar la función para obtener los datos si existe el id_supplier
    }
  }, [id_supplier]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-green-500 rounded-full w-16 h-16"></div>
      </div>
    ); // Estilo de carga (spinner)
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <p>Error: {error}</p> {/* Mensaje de error */}
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No se encontraron datos del proveedor.</p> {/* Mensaje si no se encuentra proveedor */}
      </div>
    );
  }

  // Función para mostrar las iniciales si no hay foto
  const getInitials = (name: string) => {
    const words = name.split(' ');
    const initials = words.map(word => word[0].toUpperCase()).join('');
    return initials;
  };

  return (
      <div className="p-16 grid gap-10 bg-white text-black">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-28 h-28 bg-gray-300 flex items-center justify-center rounded-full">
            <span className="text-white text-3xl font-bold">{getInitials(supplier.supplier_name)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-700">{supplier.supplier_name}</h1>
            <p className="text-green-600 mt-2">{supplier.material_type}</p>
            <p className="text-gray-500 mt-1">Teléfono: {supplier.contact_phone}</p>
            <p className="text-gray-400 mt-1">ID: {supplier.id_supplier}</p>
            <p className="text-gray-400 mt-1">Placa: {supplier.license_plate}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-700">Detalles del Proveedor</h2>
          <p className="text-gray-600 mt-2">{supplier.description || 'No hay descripción disponible.'}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-700">Entradas y Salidas</h2>
          <table className="min-w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="px-4 py-2 text-left text-black">Nombre del Conductor</th>
                <th className="px-4 py-2 text-left text-black">Placa</th>
                <th className="px-4 py-2 text-left text-black">Peso de Entrada (kg)</th>
                <th className="px-4 py-2 text-left text-black">Peso de Salida (kg)</th>
                <th className="px-4 py-2 text-left text-black">Fecha de Entrada</th>
              </tr>
            </thead>
            <tbody>
              {truckEntries.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-black">{entry.driver_name}</td>
                  <td className="px-4 py-2 text-black">{entry.license_plate}</td>
                  <td className="px-4 py-2 text-black">{entry.weight_in}</td>
                  <td className="px-4 py-2 text-black">{entry.weight_out}</td>
                  <td className="px-4 py-2 text-black">{entry.entry_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Link href="/providers" className="text-orange-500 underline">Regresar a Proveedores</Link>
        </div>
      </div>
  );
}
