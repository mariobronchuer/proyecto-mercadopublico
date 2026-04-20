'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFavoritos } from './FavoritosContext';

export default function Header() {
  const pathname = usePathname();
  const { favoritos } = useFavoritos();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/')
      ? 'bg-white text-blue-900'
      : 'text-white hover:bg-blue-700';

  const isActiveExact = (path: string) =>
    pathname === path
      ? 'bg-white text-blue-900'
      : 'text-white hover:bg-blue-700';

  return (
    <header className="bg-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-blue-900 font-bold text-xl">MP</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">MercadoPublico</h1>
              <p className="text-blue-200 text-xs">Portal de Licitaciones</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${isActiveExact('/')}`}
            >
              <span className="hidden sm:inline">Dashboard</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <Link
              href="/licitaciones"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${isActive('/licitaciones')}`}
            >
              <span className="hidden sm:inline">Licitaciones</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
            <Link
              href="/ordenes"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${isActive('/ordenes')}`}
            >
              <span className="hidden sm:inline">Órdenes</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            <Link
              href="/favoritos"
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base relative ${isActive('/favoritos')}`}
            >
              <span className="hidden sm:inline">Favoritos</span>
              <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {favoritos.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-blue-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {favoritos.length > 9 ? '9+' : favoritos.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
