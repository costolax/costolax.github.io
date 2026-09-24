// Impostazioni generali del sito: modificate qui nome, contatti e spedizioni.
// I testi dell'interfaccia (in italiano e in inglese) sono in src/i18n/ui.ts.

export const sito = {
  nome: 'Costolax',

  // Contatti
  email: 'costolax@gmail.com',
  instagram: 'https://www.instagram.com/costolax',

  // Chi ha fatto il sito (riga in fondo al footer)
  crediti: { nome: 'lerro-lerro', github: 'https://github.com/lerro-lerro' },

  // Spese di spedizione mostrate nella pagina Info.
  // Devono corrispondere alle tariffe impostate nei Payment Link di Stripe.
  spedizioni: [
    { zona: 'Italia', zonaEn: 'Italy', prezzo: 5, tempi: '3–5 giorni lavorativi', tempiEn: '3–5 working days' },
    {
      zona: 'Unione Europea',
      zonaEn: 'European Union',
      prezzo: 12,
      tempi: '5–10 giorni lavorativi',
      tempiEn: '5–10 working days',
    },
  ],
};
