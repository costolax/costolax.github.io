// @ts-check
import { defineConfig } from 'astro/config';

// Indirizzo del sito: il repository costolax/costolax.github.io viene pubblicato alla radice di https://costolax.github.io.
// Serve per i link canonici e le anteprime nei link condivisi. Se collegate un dominio proprio (vedi README,
// "Collegare il dominio") impostate SITE = 'https://costolax.it' e create public/CNAME.
const SITE = 'https://costolax.github.io';
const BASE = '/';

// Con `astro dev` le immagini vengono compresse al momento, a ogni richiesta (non restano salvate):
// lì si usa la compressione più rapida (effort 0, circa 5 volte più veloce), che dà file un po' più pesanti
// ma della stessa qualità. `astro build` (il sito pubblicato) usa sempre la compressione completa.
const SVILUPPO = /** @type {any} */ (globalThis).process.argv.includes('dev');

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      // WebP a qualità 95 con colori a piena risoluzione (smartSubsample): a occhio è identico all'originale
      // (PSNR 43–52 dB sulle tavole) ma pesa 3–4 volte meno del WebP senza perdita, quindi le pagine si caricano in fretta.
      // Le versioni più piccole di ogni immagine sono almeno il doppio del riquadro: il browser rifinisce da solo.
      // Il JPEG (solo per l'anteprima nei link condivisi) a qualità 100 senza sottocampionamento dei colori.
      // AVIF (quello che scaricano quasi tutti i browser; il WebP resta per quelli vecchi): qualità 75 con colori a piena
      // risoluzione pesa il 30–45% in meno del WebP a 95 con la stessa resa sulle tavole (SSIM 0,996–0,9995).
      // effort 3: a 4 e oltre la compilazione diventa molto più lenta per pochi KB in meno.
      config: {
        avif: { quality: 75, effort: SVILUPPO ? 0 : 3, chromaSubsampling: '4:4:4' },
        webp: { quality: 95, smartSubsample: true, effort: SVILUPPO ? 0 : 6 },
        jpeg: { quality: 100, chromaSubsampling: '4:4:4', mozjpeg: true },
      },
    },
  },
  server: {
    // Permette ai tunnel Cloudflare (cloudflared) di raggiungere `astro dev` / `astro preview`.
    // Il punto iniziale accetta tutti i sottodomini casuali *.trycloudflare.com.
    allowedHosts: ['.trycloudflare.com'],
  },
});
