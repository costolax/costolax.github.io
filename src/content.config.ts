import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { tipiProdotto } from './i18n/ui';

// Traduzioni in inglese: ogni testo può avere un campo gemello con "En" in fondo
// (es. titolo → titoloEn). Se manca, la versione inglese del sito mostra l'italiano.
// testoEn è la descrizione/biografia in inglese (il testo sotto il frontmatter è quella italiana).
const testoEn = z.string().optional();

// Ogni artista è un file in src/content/artisti/. Il testo sotto il frontmatter è la biografia.
const artisti = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/artisti' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      ruolo: z.string(),
      ruoloEn: z.string().optional(),
      immagine: image(),
      immagineAlt: z.string(),
      immagineAltEn: z.string().optional(),
      instagram: z.url().optional(),
      link: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      // Membro fondatore del collettivo: compare nella sezione "Membri fondatori" della pagina Autori.
      fondatore: z.boolean().default(false),
      // Tavole del portfolio, mostrate nella scheda dell'autore.
      portfolio: z
        .array(z.object({ immagine: image(), alt: z.string(), altEn: z.string().optional() }))
        .default([]),
      testoEn,
      ordine: z.number().default(0),
    }),
});

// Ogni storia (o serie) è un file in src/content/storie/. Il testo sotto il frontmatter è la descrizione.
// In quali numeri compare lo dice il "sommario" di ogni numero, in src/content/fumetti/.
const storie = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/storie' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      titoloEn: z.string().optional(),
      autori: z.array(
        z.object({ artista: reference('artisti'), ruolo: z.string(), ruoloEn: z.string().optional() }),
      ),
      immagine: image().optional(),
      immagineAlt: z.string().optional(),
      immagineAltEn: z.string().optional(),
      // Serie che continua nei prossimi numeri.
      inCorso: z.boolean().default(false),
      testoEn,
      ordine: z.number().default(0),
    }),
});

// Ogni fumetto (albo, storia o numero della rivista) è un file in src/content/fumetti/.
const fumetti = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/fumetti' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      titoloEn: z.string().optional(),
      sottotitolo: z.string().optional(),
      sottotitoloEn: z.string().optional(),
      autori: z.array(
        z.object({ artista: reference('artisti'), ruolo: z.string(), ruoloEn: z.string().optional() }),
      ),
      copertina: image(),
      copertinaAlt: z.string(),
      copertinaAltEn: z.string().optional(),
      tavole: z
        .array(z.object({ immagine: image(), alt: z.string(), altEn: z.string().optional() }))
        .default([]),
      uscita: z.string().optional(),
      uscitaEn: z.string().optional(),
      // Specifiche tecniche, mostrate insieme agli autori (es. 64 pagine, bianco e nero, 21×28 cm).
      formato: z.string().optional(),
      formatoEn: z.string().optional(),
      pagine: z.number().int().positive().optional(),
      colori: z.string().optional(),
      coloriEn: z.string().optional(),
      // Testo di lancio per la home ("Dentro il N.1"); se manca, la home usa la descrizione del numero.
      lancio: z.string().optional(),
      lancioEn: z.string().optional(),
      // Sommario ("All'interno"): le storie contenute nel numero, in ordine.
      // titolo: il titolo della storia in questo numero, se diverso da quello della serie. nota: es. "capitolo 1", "preview".
      sommario: z
        .array(
          z.object({
            storia: reference('storie'),
            titolo: z.string().optional(),
            titoloEn: z.string().optional(),
            nota: z.string().optional(),
            notaEn: z.string().optional(),
          }),
        )
        .default([]),
      // PDF scaricabile gratis: percorso del file dentro public/ (es. download/costolax-n0.pdf).
      pdfGratis: z.string().optional(),
      // Numero annunciato ma non ancora uscito: mostra "Presto!" e rimanda a fiere e shop.
      inArrivo: z.boolean().default(false),
      testoEn,
      inEvidenza: z.boolean().default(false),
      ordine: z.number().default(0),
    }),
});

// Ogni prodotto in vendita è un file in src/content/prodotti/.
// stripeLink: il Payment Link creato nella dashboard di Stripe (https://buy.stripe.com/...).
const prodotti = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/prodotti' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      nomeEn: z.string().optional(),
      tipo: z.enum(tipiProdotto),
      prezzo: z.number().positive(),
      immagine: image(),
      immagineAlt: z.string(),
      immagineAltEn: z.string().optional(),
      stripeLink: z.url().optional(),
      disponibile: z.boolean().default(true),
      fumetto: reference('fumetti').optional(),
      dettagli: z.array(z.string()).default([]),
      dettagliEn: z.array(z.string()).optional(),
      ordine: z.number().default(0),
    }),
});

// Ogni evento o fiera è un file in src/content/eventi/. Il testo sotto il frontmatter è il post.
// Gli eventi finiti restano in pagina, sotto "Dove siamo stati".
const eventi = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/eventi' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      titoloEn: z.string().optional(),
      inizio: z.coerce.date(),
      fine: z.coerce.date().optional(),
      luogo: z.string(),
      luogoEn: z.string().optional(),
      citta: z.string(),
      cittaEn: z.string().optional(),
      stand: z.string().optional(),
      standEn: z.string().optional(),
      link: z.url().optional(),
      immagine: image().optional(),
      immagineAlt: z.string().optional(),
      immagineAltEn: z.string().optional(),
      testoEn,
    }),
});

export const collections = { artisti, storie, fumetti, prodotti, eventi };
