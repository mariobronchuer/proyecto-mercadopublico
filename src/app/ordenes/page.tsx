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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Órdenes de Compra</h1>
        <p className="text-gray-600">
          Mostrando {cantidad.toLocaleString('es-CL')} órdenes de compra
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listado.slice(0, 50).map((orden) => (
              <tr key={orden.Codigo} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-700">
                  {orden.Codigo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                  {orden.Nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {orden.Estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatMonto(orden.Total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {listado.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500">No se encontraron órdenes de compra.</p>
        </div>
      )}
    </div>
  );
}
