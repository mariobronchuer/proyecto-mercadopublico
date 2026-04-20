import Link from 'next/link';
import { getLicitaciones, getEstadoColor, getEstadoNombre, formatMonto } from '@/lib/mercadopublico';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ codigo: string }>;
}

export default async function LicitacionDetallePage({ params }: Props) {
  const { codigo } = await params;

  let data;
  try {
    data = await getLicitaciones({ codigo });
  } catch {
    notFound();
  }

  if (!data?.Listado?.length) {
    notFound();
  }

  const licitacion = data.Listado[0];
  const fechaCierre = licitacion.Fechas?.FechaCierre;
  const fechaCierreDate = fechaCierre ? new Date(fechaCierre) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-blue-900">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/licitaciones" className="hover:text-blue-900">Licitaciones</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{codigo}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
              {licitacion.CodigoExterno}
            </span>
            {licitacion.Tipo && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
                Tipo: {licitacion.Tipo}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(licitacion.CodigoEstado)}`}>
              {getEstadoNombre(licitacion.CodigoEstado)}
            </span>
          </div>
          <a
            href={`https://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?qs=oJvs7cY8pcnqw4SWBDQ/VQ==&IdLicitacion=${licitacion.CodigoExterno}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Ver en MercadoPublico
          </a>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {licitacion.Nombre}
        </h1>

        {licitacion.Descripcion && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {licitacion.Descripcion}
          </p>
        )}

        {/* Monto */}
        {licitacion.MontoEstimado && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-600 mb-1">Monto Estimado</p>
            <p className="text-3xl font-bold text-blue-900">
              {formatMonto(licitacion.MontoEstimado)}
            </p>
          </div>
        )}

        {/* Grid de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organismo */}
          {licitacion.Comprador && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Organismo Comprador
              </h3>
              <p className="font-medium text-gray-900">{licitacion.Comprador.NombreOrganismo}</p>
              {licitacion.Comprador.NombreUnidad && (
                <p className="text-sm text-gray-600 mt-1">{licitacion.Comprador.NombreUnidad}</p>
              )}
              {licitacion.Comprador.RegionUnidad && (
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {licitacion.Comprador.RegionUnidad}
                </p>
              )}
              {licitacion.Comprador.DireccionUnidad && (
                <p className="text-sm text-gray-500 mt-1">{licitacion.Comprador.DireccionUnidad}</p>
              )}
            </div>
          )}

          {/* Fechas */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Fechas Importantes
            </h3>
            <div className="space-y-2 text-sm">
              {licitacion.Fechas?.FechaPublicacion && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Publicación:</span>
                  <span className="font-medium">{new Date(licitacion.Fechas.FechaPublicacion).toLocaleDateString('es-CL')}</span>
                </div>
              )}
              {fechaCierreDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Cierre:</span>
                  <span className="font-medium text-red-600">
                    {fechaCierreDate.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
              {licitacion.Fechas?.FechaAdjudicacion && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Adjudicación estimada:</span>
                  <span className="font-medium">{new Date(licitacion.Fechas.FechaAdjudicacion).toLocaleDateString('es-CL')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      {licitacion.Items && licitacion.Items.Listado.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Items de la Licitación ({licitacion.Items.Cantidad})
          </h2>

          <div className="space-y-4">
            {licitacion.Items.Listado.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                        Item {item.Correlativo}
                      </span>
                      <span className="text-xs text-gray-500">{item.CodigoProducto}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.NombreProducto}</h3>
                    <p className="text-sm text-gray-600">{item.Descripcion}</p>
                    <p className="text-xs text-gray-400 mt-2">{item.Categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{item.Cantidad}</p>
                    <p className="text-sm text-gray-500">{item.UnidadMedida}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volver */}
      <div className="mt-8 text-center">
        <Link
          href="/licitaciones"
          className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a licitaciones
        </Link>
      </div>
    </div>
  );
}
