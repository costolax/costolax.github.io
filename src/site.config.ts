// Impostazioni generali del sito: modificate qui nome, contatti e negozi.
// I testi dell'interfaccia (in italiano e in inglese) sono in src/i18n/ui.ts.

export const sito = {
  nome: 'Costolax',

  // Contatti
  email: 'costolax@gmail.com',
  instagram: 'https://www.instagram.com/costolax',

  // Chi ha fatto il sito (riga in fondo al footer)
  crediti: { nome: 'lerro-lerro', github: 'https://github.com/lerro-lerro' },

  // Negozi dove trovare Costolax (pagina Negozi), nell'ordine in cui compaiono.
  // Il link alla mappa si crea da solo da nome e indirizzo.
  negozi: [
    { nome: 'Atom Plastic', indirizzo: 'Via del Museo 13', cap: '36061', citta: 'Bassano del Grappa', provincia: 'VI' },
    { nome: 'Edicola alla stazione', indirizzo: 'Via de Blasi 17', cap: '36061', citta: 'Bassano del Grappa', provincia: 'VI' },
    { nome: 'Libreria La Bassanese', indirizzo: "Piazza Largo Corona d'Italia 41", cap: '36061', citta: 'Bassano del Grappa', provincia: 'VI' },
    { nome: 'Super Zazà', indirizzo: 'Santa Croce 270, Campiello dei Lavadori de Lana', cap: '30135', citta: 'Venezia', provincia: 'VE' },
    { nome: 'Edicola Quaglia Maurizio', indirizzo: 'Piazzale Mazzini 82', cap: '35137', citta: 'Padova', provincia: 'PD' },
    { nome: 'Altrimondi', indirizzo: 'Via Sebastiano Caboto 20/B', cap: '33170', citta: 'Pordenone', provincia: 'PN' },
  ],
};
