'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? 'bg-white text-blue-900'
      : 'text-white hover:bg-blue-700';

  return (
    <header className="bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">MP</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">MercadoPublico</h1>
              <p className="text-blue-200 text-xs">Portal de Licitaciones</p>
            </div>
          </Link>

          <nav className="flex gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link
              href="/licitaciones"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/licitaciones')}`}
            >
              Licitaciones
            </Link>
            <Link
              href="/ordenes"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/ordenes')}`}
            >
              Órdenes de Compra
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
