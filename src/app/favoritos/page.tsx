'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavoritos } from '@/components/FavoritosContext';
import LicitacionCard from '@/components/LicitacionCard';
import { Licitacion } from '@/types';

export default function FavoritosPage() {
  const { favoritos } = useFavoritos();
  const [licitaciones, setLicitaciones] = useState<Licitacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoritos() {
      if (favoritos.length === 0) {
        setLicitaciones([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const results: Licitacion[] = [];

      for (const codigo of favoritos) {
        try {
          const res = await fetch(`/api/licitacion/${codigo}`);
          if (res.ok) {
            const data = await res.json();
            if (data.Listado?.[0]) {
              results.push(data.Listado[0]);
            }
          }
        } catch {
          console.error(`Error fetching ${codigo}`);
        }
      }

      setLicitaciones(results);
      setLoading(false);
    }

    fetchFavoritos();
  }, [favoritos]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          Mis Favoritos
        </h1>
        <p className="text-slate-600">
          {favoritos.length} {favoritos.length === 1 ? 'licitación guardada' : 'licitaciones guardadas'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : favoritos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="h-8 w-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-900">No tienes favoritos</h3>
          <p className="mt-2 text-slate-500">
            Marca licitaciones como favoritas para verlas aquí
          </p>
          <Link
            href="/licitaciones"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explorar licitaciones
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licitaciones.map((licitacion) => (
            <LicitacionCard key={licitacion.CodigoExterno} licitacion={licitacion} />
          ))}
        </div>
      )}
    </div>
  );
}
