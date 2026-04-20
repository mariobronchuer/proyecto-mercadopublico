'use client';

import { useState } from 'react';
import { Licitacion } from '@/types';
import LicitacionCard from './LicitacionCard';

interface Props {
  licitaciones: Licitacion[];
}

const ITEMS_POR_PAGINA = 12;

export default function LicitacionesGrid({ licitaciones }: Props) {
  const [mostrar, setMostrar] = useState(ITEMS_POR_PAGINA);

  const licitacionesMostradas = licitaciones.slice(0, mostrar);
  const hayMas = mostrar < licitaciones.length;

  const cargarMas = () => {
    setMostrar((prev) => prev + ITEMS_POR_PAGINA);
  };

  if (licitaciones.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-md">
        <svg
          className="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No hay licitaciones</h3>
        <p className="mt-2 text-gray-500">
          No se encontraron licitaciones con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {licitacionesMostradas.map((licitacion) => (
          <LicitacionCard key={licitacion.CodigoExterno} licitacion={licitacion} />
        ))}
      </div>

      {hayMas && (
        <div className="mt-8 text-center">
          <button
            onClick={cargarMas}
            className="bg-white text-blue-900 px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300"
          >
            Cargar más ({licitaciones.length - mostrar} restantes)
          </button>
        </div>
      )}

      <p className="text-center text-gray-500 text-sm mt-4">
        Mostrando {licitacionesMostradas.length} de {licitaciones.length} licitaciones
      </p>
    </>
  );
}
