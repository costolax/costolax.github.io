import { getCollection } from 'astro:content';
import type { Lingua } from '../i18n/ui';

// Restituisce una collezione ordinata per il campo "ordine" del frontmatter.
export async function ordinati<C extends 'artisti' | 'storie' | 'fumetti' | 'prodotti'>(collezione: C) {
  const voci = await getCollection(collezione);
  return voci.sort((a, b) => a.data.ordine - b.data.ordine);
}

// Eventi divisi in prossimi (dal più vicino) e passati (dal più recente).
// Un evento resta tra i prossimi fino all'ultimo giorno compreso; la data è quella della build del sito.
export async function eventiDivisi() {
  const eventi = await getCollection('eventi');
  const oggi = new Date().toISOString().slice(0, 10);
  const ultimoGiorno = (e: (typeof eventi)[number]) => (e.data.fine ?? e.data.inizio).toISOString().slice(0, 10);
  const prossimi = eventi
    .filter((e) => ultimoGiorno(e) >= oggi)
    .sort((a, b) => a.data.inizio.getTime() - b.data.inizio.getTime());
  const passati = eventi
    .filter((e) => ultimoGiorno(e) < oggi)
    .sort((a, b) => b.data.inizio.getTime() - a.data.inizio.getTime());
  return { prossimi, passati };
}

// Numeri in cui compare una storia, dal più vecchio (N.0, N.1, …), con la nota del sommario (es. "capitolo 1").
export async function apparizioni(storiaId: string) {
  const numeri = (await getCollection('fumetti')).sort((a, b) =>
    a.data.titolo.localeCompare(b.data.titolo, 'it', { numeric: true }),
  );
  return numeri.flatMap((fumetto) =>
    fumetto.data.sommario
      .filter((voce) => voce.storia.id === storiaId)
      .map((voce) => ({ fumetto, nota: voce.nota, notaEn: voce.notaEn })),
  );
}

// Leggera inclinazione alternata dei riquadri nelle griglie.
export const inclinazioni = ['s', 'd', undefined] as const;
export const inclina = (i: number) => inclinazioni[i % inclinazioni.length];

// Testo di un campo nella lingua scelta: in inglese usa il campo con "En" in fondo
// (es. titoloEn) se c'è, altrimenti ripiega sull'italiano.
export function tr<T extends object, K extends keyof T & string>(dati: T, campo: K, lingua: Lingua): T[K] {
  if (lingua === 'en') {
    const tradotto = (dati as Record<string, unknown>)[`${campo}En`];
    if (tradotto !== undefined && tradotto !== '' && !(Array.isArray(tradotto) && tradotto.length === 0)) {
      return tradotto as T[K];
    }
  }
  return dati[campo];
}
