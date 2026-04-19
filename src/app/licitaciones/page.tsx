import { Suspense } from 'react';
import { getLicitaciones } from '@/lib/mercadopublico';
import LicitacionCard from '@/components/LicitacionCard';
import FilterBar from '@/components/FilterBar';
import { EstadoLicitacion } from '@/types';

export const revalidate = 300;

interface Props {
  searchParams: Promise<{ estado?: string }>;
}

export default async function LicitacionesPage({ searchParams }: Props) {
  const params = await searchParams;
  const estado = (params.estado as EstadoLicitacion) || 'activas';
  const data = await getLicitaciones({ estado });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Licitaciones</h1>
        <p className="text-gray-600">
          Mostrando {data.Cantidad.toLocaleString('es-CL')} licitaciones {estado}
        </p>
      </div>

      <Suspense fallback={<div>Cargando filtros...</div>}>
        <FilterBar />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.Listado.map((licitacion) => (
          <LicitacionCard key={licitacion.CodigoExterno} licitacion={licitacion} />
        ))}
      </div>

      {data.Listado.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay licitaciones</h3>
          <p className="mt-1 text-sm text-gray-500">
            No se encontraron licitaciones con los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
}
