import { Licitacion } from '@/types';
import { getEstadoColor, getEstadoNombre, formatMonto } from '@/lib/mercadopublico';

interface Props {
  licitacion: Licitacion;
}

export default function LicitacionCard({ licitacion }: Props) {
  const fechaCierre = new Date(licitacion.FechaCierre);
  const ahora = new Date();
  const diasRestantes = Math.ceil(
    (fechaCierre.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {licitacion.CodigoExterno}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getEstadoColor(
              licitacion.CodigoEstado
            )}`}
          >
            {getEstadoNombre(licitacion.CodigoEstado)}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[48px]">
          {licitacion.Nombre}
        </h3>

        {licitacion.NombreOrganismo && (
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {licitacion.NombreOrganismo}
          </p>
        )}

        {licitacion.MontoEstimado && (
          <p className="text-lg font-bold text-blue-900 mb-3">
            {formatMonto(licitacion.MontoEstimado)}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Cierre:</span>{' '}
            {fechaCierre.toLocaleDateString('es-CL', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {diasRestantes > 0 && diasRestantes <= 7 && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
              {diasRestantes} {diasRestantes === 1 ? 'día' : 'días'}
            </span>
          )}
        </div>
      </div>

      <a
        href={`https://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?qs=oJvs7cY8pcnqw4SWBDQ/VQ==&IdLicitacion=${licitacion.CodigoExterno}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-blue-900 text-white text-center py-3 font-medium hover:bg-blue-800 transition-colors"
      >
        Ver en MercadoPublico
      </a>
    </div>
  );
}
