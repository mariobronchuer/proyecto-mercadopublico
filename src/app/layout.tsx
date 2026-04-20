import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { FavoritosProvider } from "@/components/FavoritosContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LicitaChile - Portal de Licitaciones Públicas",
  description: "Encuentra y gestiona licitaciones públicas del Estado de Chile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <FavoritosProvider>
          <Header />
          <main className="flex-1 pb-8">{children}</main>
          <footer className="bg-white border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-slate-600">
                Datos obtenidos de{' '}
                <a
                  href="https://www.chilecompra.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ChileCompra
                </a>
                {' '}- MercadoPublico
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Este sitio no es oficial. Para información oficial visite{' '}
                <a
                  href="https://www.mercadopublico.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  mercadopublico.cl
                </a>
              </p>
            </div>
          </footer>
        </FavoritosProvider>
      </body>
    </html>
  );
}
