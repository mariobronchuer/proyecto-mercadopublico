'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EstadoLicitacion } from '@/types';

const estados: { value: EstadoLicitacion | ''; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'activas', label: 'Activas' },
  { value: 'publicada', label: 'Publicadas' },
  { value: 'cerrada', label: 'Cerradas' },
  { value: 'adjudicada', label: 'Adjudicadas' },
  { value: 'desierta', label: 'Desiertas' },
  { value: 'revocada', label: 'Revocadas' },
  { value: 'suspendida', label: 'Suspendidas' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estado, setEstado] = useState(searchParams.get('estado') || 'activas');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (estado) params.set('estado', estado);
    router.push(`/licitaciones?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
          >
            {estados.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>
      </div>
    </div>
  );
}
