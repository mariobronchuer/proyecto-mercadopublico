'use client';

import Link from 'next/link';
import { Licitacion } from '@/types';
import { getEstadoColor, getEstadoNombre, formatMonto } from '@/lib/mercadopublico';
import { useFavoritos } from './FavoritosContext';

interface Props {
  licitacion: Licitacion;
}

export default function LicitacionCard({ licitacion }: Props) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const esFavorito = isFavorito(licitacion.CodigoExterno);

  const fechaCierre = licitacion.Fechas?.FechaCierre || licitacion.FechaCierre;
  const fechaCierreDate = fechaCierre ? new Date(fechaCierre) : null;
  const ahora = new Date();
  const diasRestantes = fechaCierreDate
    ? Math.ceil((fechaCierreDate.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const region = licitacion.Comprador?.RegionUnidad || '';
  const organismo = licitacion.Comprador?.NombreOrganismo || '';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
      <div className="p-5">
        {/* Header con código, estado y favorito */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {licitacion.CodigoExterno}
            </span>
            {licitacion.Tipo && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {licitacion.Tipo}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getEstadoColor(
                licitacion.CodigoEstado
              )}`}
            >
              {getEstadoNombre(licitacion.CodigoEstado)}
            </span>
            <button
              onClick={() => toggleFavorito(licitacion.CodigoExterno)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <svg
                className={`w-5 h-5 ${esFavorito ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                fill={esFavorito ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Título */}
        <Link href={`/licitaciones/${licitacion.CodigoExterno}`}>
          <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 min-h-[48px] group-hover:text-blue-600 transition-colors cursor-pointer">
            {licitacion.Nombre}
          </h3>
        </Link>

        {/* Descripción corta */}
        {licitacion.Descripcion && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {licitacion.Descripcion}
          </p>
        )}

        {/* Organismo */}
        {organismo && (
          <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="line-clamp-1">{organismo}</span>
          </div>
        )}

        {/* Región */}
        {region && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{region}</span>
          </div>
        )}

        {/* Monto */}
        {licitacion.MontoEstimado && (
          <p className="text-lg font-bold text-blue-600 mb-3">
            {formatMonto(licitacion.MontoEstimado)}
          </p>
        )}

        {/* Footer con fecha */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {fechaCierreDate ? (
              <>
                <span className="font-medium">Cierre:</span>{' '}
                {fechaCierreDate.toLocaleDateString('es-CL', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </>
            ) : (
              <span>Sin fecha de cierre</span>
            )}
          </div>

          {diasRestantes !== null && diasRestantes > 0 && diasRestantes <= 7 && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              diasRestantes <= 2 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {diasRestantes} {diasRestantes === 1 ? 'día' : 'días'}
            </span>
          )}

          {diasRestantes !== null && diasRestantes <= 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
              Cerrada
            </span>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex border-t border-slate-100">
        <Link
          href={`/licitaciones/${licitacion.CodigoExterno}`}
          className="flex-1 bg-slate-50 text-slate-700 text-center py-3 font-medium hover:bg-slate-100 transition-colors text-sm"
        >
          Ver detalle
        </Link>
        <a
          href={`https://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?qs=oJvs7cY8pcnqw4SWBDQ/VQ==&IdLicitacion=${licitacion.CodigoExterno}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white text-center py-3 font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Ver oficial
        </a>
      </div>
    </div>
  );
}
