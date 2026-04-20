import { Suspense } from 'react';
import { getLicitaciones } from '@/lib/mercadopublico';
import FilterBar from '@/components/FilterBar';
import { EstadoLicitacion } from '@/types';
import LicitacionesGrid from '@/components/LicitacionesGrid';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ estado?: string; q?: string }>;
}

export default async function LicitacionesPage({ searchParams }: Props) {
  const params = await searchParams;
  const estado = (params.estado as EstadoLicitacion) || 'activas';
  const busqueda = params.q || '';

  let data;
  try {
    data = await getLicitaciones({ estado });
  } catch {
    data = { Cantidad: 0, Listado: [] };
  }

  const cantidad = data?.Cantidad ?? 0;
  let listado = data?.Listado ?? [];

  // Filtrar por búsqueda en el servidor
  if (busqueda) {
    const busquedaLower = busqueda.toLowerCase();
    listado = listado.filter(
      (l) =>
        l.Nombre?.toLowerCase().includes(busquedaLower) ||
        l.Descripcion?.toLowerCase().includes(busquedaLower) ||
        l.CodigoExterno?.toLowerCase().includes(busquedaLower) ||
        l.Comprador?.NombreOrganismo?.toLowerCase().includes(busquedaLower)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Licitaciones</h1>
        <p className="text-slate-600">
          {busqueda ? (
            <>Encontradas <strong>{listado.length.toLocaleString('es-CL')}</strong> licitaciones para &quot;{busqueda}&quot;</>
          ) : (
            <>Mostrando <strong>{cantidad.toLocaleString('es-CL')}</strong> licitaciones {estado}</>
          )}
        </p>
      </div>

      <Suspense fallback={<div className="bg-white rounded-xl shadow-md p-4 mb-6 animate-pulse h-32"></div>}>
        <FilterBar />
      </Suspense>

      <LicitacionesGrid licitaciones={listado} />
    </div>
  );
}
