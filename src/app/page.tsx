import Link from 'next/link';
import { getLicitaciones } from '@/lib/mercadopublico';
import LicitacionCard from '@/components/LicitacionCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let data;
  try {
    data = await getLicitaciones({ estado: 'activas' });
  } catch {
    data = { Cantidad: 0, Listado: [] };
  }

  const cantidad = data?.Cantidad ?? 0;
  const listado = data?.Listado ?? [];
  const licitacionesRecientes = listado.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 mb-8 text-white shadow-lg shadow-blue-200">
        <h1 className="text-3xl font-bold mb-2">Portal de Licitaciones</h1>
        <p className="text-blue-100 mb-6">
          Encuentra las mejores oportunidades de negocio con el Estado de Chile
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-4">
            <p className="text-3xl font-bold">{cantidad.toLocaleString('es-CL')}</p>
            <p className="text-blue-100 text-sm">Licitaciones Activas</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/licitaciones?estado=activas"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-green-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium">Activas</h3>
              <p className="text-2xl font-bold text-slate-900">{cantidad.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </Link>

        <Link
          href="/licitaciones?estado=publicada"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium">Publicadas Hoy</h3>
              <p className="text-xl font-bold text-slate-900">Ver más</p>
            </div>
          </div>
        </Link>

        <Link
          href="/licitaciones?estado=adjudicada"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-purple-300 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3 className="text-slate-500 text-sm font-medium">Adjudicadas</h3>
              <p className="text-xl font-bold text-slate-900">Ver más</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Licitaciones Recientes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Licitaciones Recientes</h2>
          <Link
            href="/licitaciones"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Ver todas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licitacionesRecientes.map((licitacion) => (
            <LicitacionCard key={licitacion.CodigoExterno} licitacion={licitacion} />
          ))}
        </div>
      </section>
    </div>
  );
}
