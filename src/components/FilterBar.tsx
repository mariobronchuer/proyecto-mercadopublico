'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EstadoLicitacion } from '@/types';

const estados: { value: EstadoLicitacion | ''; label: string }[] = [
  { value: 'activas', label: 'Activas' },
  { value: 'publicada', label: 'Publicadas' },
  { value: 'cerrada', label: 'Cerradas' },
  { value: 'adjudicada', label: 'Adjudicadas' },
  { value: 'desierta', label: 'Desiertas' },
  { value: 'revocada', label: 'Revocadas' },
  { value: 'suspendida', label: 'Suspendidas' },
  { value: 'todos', label: 'Todas' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estado, setEstado] = useState(searchParams.get('estado') || 'activas');
  const [busqueda, setBusqueda] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setEstado(searchParams.get('estado') || 'activas');
    setBusqueda(searchParams.get('q') || '');
  }, [searchParams]);

  const handleFilter = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (estado) params.set('estado', estado);
    if (busqueda) params.set('q', busqueda);
    router.push(`/licitaciones?${params.toString()}`);
  };

  const handleEstadoChange = (nuevoEstado: string) => {
    setEstado(nuevoEstado);
    const params = new URLSearchParams();
    params.set('estado', nuevoEstado);
    if (busqueda) params.set('q', busqueda);
    router.push(`/licitaciones?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {/* Búsqueda */}
      <form onSubmit={handleFilter} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            className="w-full pl-10 pr-24 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Estados como chips */}
      <div className="flex flex-wrap gap-2">
        {estados.map((e) => (
          <button
            key={e.value}
            onClick={() => handleEstadoChange(e.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              estado === e.value
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
}
