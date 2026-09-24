import type { Lingua } from '../i18n/ui';

// Collegamento interno che tiene conto della base del sito (BASE in astro.config.mjs).
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

const localeNumeri: Record<Lingua, string> = { it: 'it-IT', en: 'en-IE' };

// 15 → "15 €" (it) / "€15" (en); 4.5 → "4,50 €" / "€4.50"
export function euro(prezzo: number, lingua: Lingua = 'it'): string {
  return new Intl.NumberFormat(localeNumeri[lingua], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: Number.isInteger(prezzo) ? 0 : 2,
  }).format(prezzo);
}
