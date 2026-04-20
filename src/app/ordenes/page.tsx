import { getOrdenesCompra, formatMonto } from '@/lib/mercadopublico';

export const dynamic = 'force-dynamic';

export default async function OrdenesPage() {
  let data;
  try {
    data = await getOrdenesCompra({ estado: 'aceptada' });
  } catch {
    data = { Cantidad: 0, Listado: [] };
  }

  const cantidad = data?.Cantidad ?? 0;
  const listado = data?.Listado ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Órdenes de Compra</h1>
        <p className="text-slate-600">
          Mostrando {cantidad.toLocaleString('es-CL')} órdenes de compra
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {listado.slice(0, 50).map((orden) => (
              <tr key={orden.Codigo} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                  {orden.Codigo}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 max-w-md truncate">
                  {orden.Nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {orden.Estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {formatMonto(orden.Total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {listado.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500">No se encontraron órdenes de compra.</p>
        </div>
      )}
    </div>
  );
}
