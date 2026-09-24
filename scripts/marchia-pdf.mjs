// Marchia un PDF da scaricare: in basso al centro di ogni pagina (tranne la copertina) scrive, piccolo,
// che è una copia gratuita solo per la lettura e che stamparla o venderla è vietato. Le immagini non vengono
// ricompresse: la qualità resta identica. Mette l'avviso anche nelle proprietà del file e toglie i metadati nascosti
// (nomi utente, percorsi del computer, nomi dei file di lavoro).
//
// Uso:  npm run marchia-pdf -- originali/costolax-n0.pdf public/download/costolax-n0.pdf --qualita-ridotta
// --qualita-ridotta (facoltativo) aggiunge una riga che avvisa che la versione gratuita ha una qualità ridotta.
// Tenete sempre l'originale non marchiato in originali/ (fuori da git e dal sito) e marchiate da lì.
import { readFile, writeFile } from 'node:fs/promises';
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFRef, StandardFonts, rgb } from 'pdf-lib';

const ANNO = 2026;
const QUALITA_RIDOTTA = 'Qualità ridotta per la versione gratuita · Reduced quality for the free version';
const AVVISO = [
  `© ${ANNO} Costolax · Tutti i diritti riservati · Copia digitale gratuita solo per lettura personale: vietate la stampa e la vendita`,
  `© ${ANNO} Costolax · All rights reserved · Free digital copy for personal reading only: printing and selling are prohibited`,
];
const CORPO = 5.5; // punti tipografici: piccolo ma leggibile a schermo
const INTERLINEA = 7;
const DAL_BASSO = 4; // sotto i numeri di pagina

const argomenti = process.argv.slice(2);
const [origine, destinazione] = argomenti.filter((a) => !a.startsWith('--'));
if (!origine || !destinazione) {
  console.error('Uso: npm run marchia-pdf -- <originale.pdf> <marchiato.pdf> [--qualita-ridotta]');
  process.exit(1);
}
const RIGHE = argomenti.includes('--qualita-ridotta') ? [QUALITA_RIDOTTA, ...AVVISO] : AVVISO;

const pdf = await PDFDocument.load(await readFile(origine));

// Pulizia: i file esportati da Illustrator & co. si portano dietro metadati nascosti (XMP e dati privati del
// programma) con nomi utente, percorsi del computer e nomi dei file di lavoro. Li togliamo da ogni pagina e
// immagine, poi eliminiamo gli oggetti rimasti senza riferimenti. Disegni e testi non vengono toccati.
const DA_TOGLIERE = ['Metadata', 'PieceInfo', 'LastModified'].map((k) => PDFName.of(k));
for (const [, oggetto] of pdf.context.enumerateIndirectObjects()) {
  const diz = oggetto instanceof PDFDict ? oggetto : oggetto?.dict instanceof PDFDict ? oggetto.dict : undefined;
  DA_TOGLIERE.forEach((chiave) => diz?.delete(chiave));
}
const raggiungibili = new Set();
const visita = (valore) => {
  if (valore instanceof PDFRef) {
    if (raggiungibili.has(valore.tag)) return;
    raggiungibili.add(valore.tag);
    visita(pdf.context.lookup(valore));
  } else if (valore instanceof PDFDict) {
    for (const [, v] of valore.entries()) visita(v);
  } else if (valore instanceof PDFArray) {
    valore.asArray().forEach(visita);
  } else if (valore?.dict instanceof PDFDict) {
    visita(valore.dict);
  }
};
visita(pdf.context.trailerInfo.Root);
visita(pdf.context.trailerInfo.Info);
for (const [ref] of pdf.context.enumerateIndirectObjects()) {
  if (!raggiungibili.has(ref.tag)) pdf.context.delete(ref);
}

const font = await pdf.embedFont(StandardFonts.Helvetica);
const larghezzaTesto = Math.max(...RIGHE.map((r) => font.widthOfTextAtSize(r, CORPO)));

pdf.getPages().forEach((pagina, i) => {
  if (i === 0) return; // la copertina resta pulita
  const { width } = pagina.getSize();
  const x = (width - larghezzaTesto) / 2;
  // riquadro bianco semitrasparente: l'avviso si legge anche sulle pagine nere al vivo
  pagina.drawRectangle({
    x: x - 4,
    y: DAL_BASSO - 2.5,
    width: larghezzaTesto + 8,
    height: INTERLINEA * RIGHE.length + 1.5,
    color: rgb(1, 1, 1),
    opacity: 0.8,
  });
  RIGHE.forEach((riga, n) => {
    pagina.drawText(riga, {
      x: (width - font.widthOfTextAtSize(riga, CORPO)) / 2,
      y: DAL_BASSO + INTERLINEA * (RIGHE.length - 1 - n),
      size: CORPO,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
  });
});

pdf.setAuthor('Costolax');
pdf.setSubject(RIGHE.join(' — '));
pdf.setKeywords(['Costolax', 'copia gratuita', 'vietata la stampa', 'vietata la vendita']);

await writeFile(destinazione, await pdf.save());
console.log(`Marchiato: ${destinazione} (${pdf.getPageCount()} pagine, copertina esclusa)`);
