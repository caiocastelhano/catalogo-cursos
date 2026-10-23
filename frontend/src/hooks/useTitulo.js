import { useEffect } from 'react';

export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | SESI+INDÚSTRIA` : 'SESI+INDÚSTRIA';
  }, [titulo]);
}