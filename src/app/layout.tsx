import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { FavoritosProvider } from "@/components/FavoritosContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MercadoPublico - Portal de Licitaciones",
  description: "Consulta y gestiona licitaciones públicas de Chile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <FavoritosProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-blue-900 text-white py-6 text-center">
            <p className="text-sm text-blue-200">
              Datos obtenidos de{' '}
              <a href="https://www.chilecompra.cl" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                ChileCompra
              </a>
              {' '}- MercadoPublico
            </p>
            <p className="text-xs text-blue-300 mt-2">
              Este sitio no es oficial. Para información oficial visite mercadopublico.cl
            </p>
          </footer>
        </FavoritosProvider>
      </body>
    </html>
  );
}
