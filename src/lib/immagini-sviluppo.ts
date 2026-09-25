// Solo per `astro dev`: lo stesso indirizzo delle immagini di Astro, ma il browser le tiene in cache per un'ora
// invece che per un anno. Le immagini in sviluppo hanno lo stesso indirizzo anche quando sostituite il file
// (se nome e dimensioni restano uguali): con un anno di cache il browser continuerebbe a mostrare quella vecchia.
// Il sito pubblicato non passa da qui: lì ogni versione di un'immagine ha un nome diverso.
import type { APIRoute } from 'astro';
import { GET as immagineAstro } from 'astro/assets/endpoint/dev';

export const GET: APIRoute = async (contesto) => {
  const risposta = await immagineAstro(contesto);
  if (risposta.ok) risposta.headers.set('Cache-Control', 'public, max-age=3600');
  return risposta;
};
