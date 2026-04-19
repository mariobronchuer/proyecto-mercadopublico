import Link from 'next/link';
import { getLicitaciones } from '@/lib/mercadopublico';
import LicitacionCard from '@/components/LicitacionCard';

export const revalidate = 300;

export default async function Home() {
  const data = await getLicitaciones({ estado: 'activas' });
  const licitacionesRecientes = data.Listado.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Portal de Licitaciones</h1>
        <p className="text-blue-100 mb-6">
          Encuentra las mejores oportunidades de negocio con el Estado de Chile
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg px-6 py-4">
            <p className="text-3xl font-bold">{data.Cantidad.toLocaleString('es-CL')}</p>
            <p className="text-blue-200 text-sm">Licitaciones Activas</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          href="/licitaciones?estado=activas"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
        >
          <h3 className="text-gray-500 text-sm font-medium">Activas</h3>
          <p className="text-2xl font-bold text-gray-900">{data.Cantidad.toLocaleString('es-CL')}</p>
        </Link>

        <Link
          href="/licitaciones?estado=publicada"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
        >
          <h3 className="text-gray-500 text-sm font-medium">Publicadas Hoy</h3>
          <p className="text-2xl font-bold text-gray-900">Ver más</p>
        </Link>

        <Link
          href="/licitaciones?estado=adjudicada"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500"
        >
          <h3 className="text-gray-500 text-sm font-medium">Adjudicadas</h3>
          <p className="text-2xl font-bold text-gray-900">Ver más</p>
        </Link>
      </section>

      {/* Licitaciones Recientes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Licitaciones Recientes</h2>
          <Link
            href="/licitaciones"
            className="text-blue-900 hover:text-blue-700 font-medium flex items-center gap-1"
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
