'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritosContextType {
  favoritos: string[];
  toggleFavorito: (codigo: string) => void;
  isFavorito: (codigo: string) => boolean;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favoritos');
    if (stored) {
      setFavoritos(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }, [favoritos, loaded]);

  const toggleFavorito = (codigo: string) => {
    setFavoritos((prev) =>
      prev.includes(codigo)
        ? prev.filter((c) => c !== codigo)
        : [...prev, codigo]
    );
  };

  const isFavorito = (codigo: string) => favoritos.includes(codigo);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  }
  return context;
}
