import {
  LicitacionResponse,
  OrdenCompraResponse,
  EstadoLicitacion,
  EstadoOrden,
  Organismo
} from '@/types';

const API_BASE = 'https://api.mercadopublico.cl/servicios/v1/publico';
const API_KEY = process.env.MERCADOPUBLICO_API_KEY;

interface LicitacionParams {
  estado?: EstadoLicitacion;
  fecha?: string; // formato ddmmyyyy
  codigo?: string;
  CodigoOrganismo?: string;
  CodigoProveedor?: string;
}

interface OrdenParams {
  estado?: EstadoOrden;
  fecha?: string;
  codigo?: string;
  CodigoOrganismo?: string;
  CodigoProveedor?: string;
}

function buildUrl(endpoint: string, params: Record<string, string | undefined>): string {
  const url = new URL(`${API_BASE}/${endpoint}.json`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  url.searchParams.append('ticket', API_KEY || '');

  return url.toString();
}

export async function getLicitaciones(params: LicitacionParams = {}): Promise<LicitacionResponse> {
  const url = buildUrl('licitaciones', params as Record<string, string>);

  const response = await fetch(url, {
    next: { revalidate: 300 } // Cache por 5 minutos
  });

  if (!response.ok) {
    throw new Error(`Error fetching licitaciones: ${response.status}`);
  }

  return response.json();
}

export async function getLicitacionById(codigo: string): Promise<LicitacionResponse> {
  return getLicitaciones({ codigo });
}

export async function getOrdenesCompra(params: OrdenParams = {}): Promise<OrdenCompraResponse> {
  const url = buildUrl('ordenesdecompra', params as Record<string, string>);

  const response = await fetch(url, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Error fetching ordenes: ${response.status}`);
  }

  return response.json();
}

export async function getOrganismos(): Promise<{ Listado: Organismo[] }> {
  const url = buildUrl('Empresas/BuscarComprador', {});

  const response = await fetch(url, {
    next: { revalidate: 86400 } // Cache por 24 horas
  });

  if (!response.ok) {
    throw new Error(`Error fetching organismos: ${response.status}`);
  }

  return response.json();
}

export function formatFecha(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}

export function formatMonto(monto: number | undefined): string {
  if (!monto) return 'No especificado';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(monto);
}

export function getEstadoColor(codigoEstado: number): string {
  const colores: Record<number, string> = {
    5: 'bg-green-100 text-green-800',    // Publicada/Activa
    6: 'bg-blue-100 text-blue-800',      // Cerrada
    7: 'bg-yellow-100 text-yellow-800',  // Desierta
    8: 'bg-purple-100 text-purple-800',  // Adjudicada
    18: 'bg-red-100 text-red-800',       // Revocada
    19: 'bg-orange-100 text-orange-800', // Suspendida
  };
  return colores[codigoEstado] || 'bg-gray-100 text-gray-800';
}

export function getEstadoNombre(codigoEstado: number): string {
  const estados: Record<number, string> = {
    5: 'Publicada',
    6: 'Cerrada',
    7: 'Desierta',
    8: 'Adjudicada',
    18: 'Revocada',
    19: 'Suspendida',
  };
  return estados[codigoEstado] || 'Desconocido';
}
