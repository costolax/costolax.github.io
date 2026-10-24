// Testi dell'interfaccia in italiano e in inglese.
// Per cambiare una scritta del sito modificatela qui, in entrambe le lingue.

import { url } from '../lib/utils';

export const lingue = { it: 'Italiano', en: 'English' } as const;
export type Lingua = keyof typeof lingue;

// Indirizzo di ogni sezione nelle due lingue (senza la base del sito).
export const percorsi = {
  home: { it: '', en: 'en/' },
  fumetti: { it: 'fumetti/', en: 'en/comics/' },
  artisti: { it: 'autori/', en: 'en/authors/' },
  storie: { it: 'storie/', en: 'en/stories/' },
  eventi: { it: 'fiere/', en: 'en/fairs/' },
  negozi: { it: 'negozi/', en: 'en/shops/' },
} as const;
export type Sezione = keyof typeof percorsi;

// Collegamento a una sezione (ed eventualmente a una scheda) nella lingua scelta.
export function link(lingua: Lingua, sezione: Sezione, id?: string): string {
  return url(`${percorsi[sezione][lingua]}${id ? `${id}/` : ''}`);
}

const it = {
  motto: 'La rivista dei fumetti marci',
  descrizione:
    'Costolax è un collettivo di fumettisti indipendenti incazzati e la sua rivista di fumetti marci. Scarica gratis il N.0 e scopri dove trovare la rivista.',
  nastro: ['Fumetti', 'Spille', 'Tavole originali', 'Fiere ed eventi', 'Adesivi'],
  saltaAlContenuto: 'Vai al contenuto',
  tornaAllaHome: 'torna alla home',
  logo: 'Logo di Costolax',
  menuPrincipale: 'Menu principale',
  sceltaLingua: 'Lingua',
  temaScuro: 'Tema scuro',
  nuovaScheda: '(si apre in una nuova scheda)',
  ingrandisci: 'Ingrandisci',
  ingrandisciTavola: 'Ingrandisci la tavola',
  chiudi: 'Chiudi',
  menu: {
    fumetti: 'Fumetti',
    artisti: 'Autori',
    storie: 'Storie',
    eventi: 'Fiere',
    negozi: 'Negozi',
  },
  piede: {
    diritti: 'Tutti i disegni appartengono ai rispettivi autori.',
    sitoDi: 'Sito realizzato da',
  },
  home: {
    primoPiano: 'In primo piano',
    sottotitolo:
      'Collettivo di fumettisti indipendenti incazzati. Vogliamo riportare in auge il fumetto controculturale, e non lo faremo con le buone...',
    dovePrenderlo: 'Dove trovarlo',
    leggiIFumetti: 'Sfoglia i fumetti',
    nuovoNumero: 'Il nuovo numero',
    bandaAlt: 'Pippa Calciepugni, quarta di copertina',
    nuvoletta: 'Beccati sto fumetto gratis! Scarica il pdf del n.0 e diffondi il verbo.',
    scaricaNumeroZero: 'Scarica il N.0 →',
    collettivo: 'Il collettivo',
    chiSiamo: 'Chi siamo →',
    prossimiEventi: 'Dove ci trovi',
    tuttiGliEventi: 'Tutte le fiere →',
    dentroIlNumero: (titolo: string) => `Dentro ${titolo}`,
    scopriIlNumero: 'Scopri il numero →',
  },
  fumetti: {
    titolo: 'Fumetti',
    descrizione: 'Tutti i fumetti di Costolax, la rivista dei fumetti marci del collettivo.',
    intro: 'I numeri della rivista usciti finora. Il n.0 è scaricabile gratis quindi non avete scuse.',
    anteprima: 'Anteprima',
    apreImmagine: "(apre l'immagine a grandezza piena)",
    formato: 'Formato',
    pagine: 'Pagine',
    colori: 'Colori',
    sommario: "All'interno:",
    scaricaGratis: 'Scarica gratis il PDF',
    gratis: 'Gratis',
    ultimaUscita: 'Ultima uscita',
    inArrivo: 'Disponibile alle fiere e nei negozi.',
    vediFiere: 'Dove trovarci',
    vediNegozi: 'Negozi',
    descrizioneScheda: (titolo: string) => `${titolo} — un fumetto Costolax.`,
  },
  artisti: {
    titolo: 'Autori',
    titoloPagina: 'Il collettivo',
    descrizione: 'Chi disegna e scrive Costolax: gli autori del collettivo.',
    intro: 'Le contorte menti dietro alla rivista, ma il team Costolax è sempre in espansione.',
    suoiFumetti: 'I numeri a cui ha lavorato',
    sueStorie: 'Le sue storie',
    portfolio: 'Portfolio',
    fondatori: 'Membri fondatori',
    altri: 'Altri autori',
    descrizioneScheda: (nome: string, ruolo: string) => `${nome} (${ruolo.toLowerCase()}) — autore del collettivo Costolax.`,
  },
  storie: {
    titolo: 'Storie',
    descrizione: 'Le storie di Costolax: chi le scrive, chi le disegna e in quali numeri trovarle.',
    intro: 'Le storie e i personaggi della scuderia Costolax.',
    suNumeri: 'Su',
    inCorso: 'In corso',
    unaStoria: (titolo: string) => `${titolo}, una storia di Costolax`,
  },
  negozi: {
    titolo: 'Negozi',
    titoloPagina: 'Dove trovare Costolax',
    descrizione: 'Librerie, edicole e negozi dove comprare Costolax, la rivista dei fumetti marci.',
    intro: 'Librerie, edicole e fumetterie dove trovate la rivista. Oppure veniteci a trovare alle fiere.',
    mappa: 'Apri la mappa',
  },
  eventi: {
    titolo: 'Fiere',
    descrizione: 'Fiere, festival ed eventi dove trovare Costolax: date, luoghi e stand.',
    intro: 'Il collettivo Costolax è sempre in tour, scopri dove trovarci.',
    prossimi: 'Prossime fiere',
    passati: 'Dove siamo stati',
    nessuno: 'Per ora nessuna data in programma. Seguici su Instagram per sapere dove saremo.',
    stand: 'Stand',
    sitoEvento: "Sito dell'evento",
    locale: 'it-IT',
  },
};

const en: typeof it = {
  motto: 'The rotten comics magazine',
  descrizione:
    "Costolax is a collective of pissed-off independent cartoonists and their rotten comics magazine. Download N.0 for free and find out where to get the magazine.",
  nastro: ['Comics', 'Pins', 'Original art', 'Fairs and events', 'Stickers'],
  saltaAlContenuto: 'Skip to content',
  tornaAllaHome: 'back to the home page',
  logo: 'Costolax logo',
  menuPrincipale: 'Main menu',
  sceltaLingua: 'Language',
  temaScuro: 'Dark theme',
  nuovaScheda: '(opens in a new tab)',
  ingrandisci: 'Enlarge',
  ingrandisciTavola: 'Enlarge the artwork',
  chiudi: 'Close',
  menu: {
    fumetti: 'Comics',
    artisti: 'Authors',
    storie: 'Stories',
    eventi: 'Fairs',
    negozi: 'Shops',
  },
  piede: {
    diritti: 'All artwork belongs to its respective authors.',
    sitoDi: 'Website by',
  },
  home: {
    primoPiano: 'Featured',
    sottotitolo:
      "A collective of pissed-off independent cartoonists. We want to bring countercultural comics back, and we won't be doing it nicely...",
    dovePrenderlo: 'Where to get it',
    leggiIFumetti: 'Browse the comics',
    nuovoNumero: 'The new issue',
    bandaAlt: 'Pippa Calciepugni, back cover',
    nuvoletta: 'Grab this comic for free! Download the N.0 PDF and spread the word.',
    scaricaNumeroZero: 'Download N.0 →',
    collettivo: 'The collective',
    chiSiamo: 'Who we are →',
    prossimiEventi: 'Where to find us',
    tuttiGliEventi: 'All fairs →',
    dentroIlNumero: (titolo) => `Inside ${titolo}`,
    scopriIlNumero: 'Discover the issue →',
  },
  fumetti: {
    titolo: 'Comics',
    descrizione: "All Costolax comics, the collective's magazine of rotten comics.",
    intro: 'The issues of the magazine released so far. N.0 is a free download, so you have no excuses.',
    anteprima: 'Preview',
    apreImmagine: '(opens the full-size image)',
    formato: 'Size',
    pagine: 'Pages',
    colori: 'Colour',
    sommario: 'Inside:',
    scaricaGratis: 'Download the PDF for free',
    gratis: 'Free',
    ultimaUscita: 'Latest issue',
    inArrivo: 'Available at fairs and in shops.',
    vediFiere: 'Where to find us',
    vediNegozi: 'Shops',
    descrizioneScheda: (titolo) => `${titolo} — a Costolax comic.`,
  },
  artisti: {
    titolo: 'Authors',
    titoloPagina: 'The collective',
    descrizione: 'Who draws and writes Costolax: the authors of the collective.',
    intro: 'The twisted minds behind the magazine, but the Costolax team is always growing.',
    suoiFumetti: 'Issues they worked on',
    sueStorie: 'Their stories',
    portfolio: 'Portfolio',
    fondatori: 'Founding members',
    altri: 'Other authors',
    descrizioneScheda: (nome, ruolo) => `${nome} (${ruolo.toLowerCase()}) — author of the Costolax collective.`,
  },
  storie: {
    titolo: 'Stories',
    descrizione: 'The Costolax stories: who writes them, who draws them and which issues they are in.',
    intro: 'The stories and characters of the Costolax stable.',
    suNumeri: 'In',
    inCorso: 'Ongoing',
    unaStoria: (titolo) => `${titolo}, a Costolax story`,
  },
  negozi: {
    titolo: 'Shops',
    titoloPagina: 'Where to find Costolax',
    descrizione: 'Bookshops, newsstands and stores where you can buy Costolax, the rotten comics magazine.',
    intro: 'Bookshops, newsstands and comic shops where you can get the magazine. Or come and see us at the fairs.',
    mappa: 'Open the map',
  },
  eventi: {
    titolo: 'Fairs',
    descrizione: 'Fairs, festivals and events where you can find Costolax: dates, venues and stands.',
    intro: 'The Costolax collective is always on tour: find out where to catch us.',
    prossimi: 'Upcoming fairs',
    passati: 'Where we have been',
    nessuno: 'No dates planned yet. Follow us on Instagram to find out where we will be.',
    stand: 'Stand',
    sitoEvento: 'Event website',
    locale: 'en-GB',
  },
};

export const testi = { it, en };

export function t(lingua: Lingua) {
  return testi[lingua];
}
