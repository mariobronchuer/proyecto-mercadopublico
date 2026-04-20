import { NextResponse } from 'next/server';

const API_BASE = 'https://api.mercadopublico.cl/servicios/v1/publico';
const API_KEY = process.env.MERCADOPUBLICO_API_KEY;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ codigo: string }> }
) {
  const { codigo } = await params;

  try {
    const url = `${API_BASE}/licitaciones.json?codigo=${codigo}&ticket=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching licitacion' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
