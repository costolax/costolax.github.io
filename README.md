# Costolax — la rivista dei fumetti marci

Sito del collettivo Costolax: fumetti, artisti, fiere e negozi dove trovare la rivista, in italiano e in inglese.
Fatto con [Astro](https://astro.build), pubblicato gratis su GitHub Pages.

| Voce | Costo |
|---|---|
| Hosting (GitHub Pages) e HTTPS | 0 € |
| Dominio `.com` | ~10–15 €/anno |

---

## Lavorare sul sito

Serve [Node.js](https://nodejs.org) 22.12 o più recente.

```sh
npm install      # la prima volta
npm run dev      # anteprima su http://localhost:4321/
npm run build    # crea il sito finale in dist/
npm run check    # controlla errori nei file
```

Ogni `git push` sul ramo `main` ripubblica il sito da solo (GitHub Actions, file `.github/workflows/deploy.yml`).

## Dove si trova cosa

```
src/
├── assets/              le immagini (webp/jpg/png): il sito le ridimensiona da solo
│   ├── fumetti/         le copertine dei numeri (costolax-n1.webp)
│   ├── anteprime/       le tavole in anteprima, una cartella per numero (costolax-n1/robopork-pagina-12.webp)
│   ├── storie/          le copertine delle storie, con lo stesso nome del file della storia (robopork.webp)
│   ├── laterali/        le immagini a lato in cima alle pagine (Home, Fumetti, Autori, Storie, Fiere, Negozi)
│   ├── ritratti/        i ritratti degli autori (enrox.webp)
│   ├── illustrazioni/   altri disegni (la striscia di tavole in home)
│   └── marchio/         logo e scritta Costolax
│   Nomi: tutto minuscolo con i trattini, lo stesso nome dei file in content/ (es. pippa-calciepugni),
│   le pagine sempre a due cifre (pagina-08).
├── content/
│   ├── artisti/         un file .md per autore (pagine /autori/)
│   ├── eventi/          un file .md per fiera o evento (pagine /fiere/, modello: _esempio.md)
│   ├── fumetti/         un file .md per numero della rivista (pagine /fumetti/), con il sommario
│   └── storie/          un file .md per storia o serie (pagina /storie/)
├── i18n/ui.ts           tutte le scritte del sito, in italiano e in inglese
├── site.config.ts       nome, email, Instagram, negozi dove trovare Costolax
├── styles/global.css    colori (tema chiaro e scuro), caratteri e stile dei riquadri
├── components/pagine/   il contenuto delle pagine (uno per pagina, per entrambe le lingue)
└── pages/               gli indirizzi: italiano alla radice, inglese sotto en/
public/download/         i PDF gratuiti da scaricare, già marchiati (vedi sotto)
scripts/marchia-pdf.mjs  marchia un PDF gratuito e ne toglie i metadati nascosti
originali/               i PDF originali non marchiati (esclusa da git: resta solo sul vostro computer)
resourses/               archivio dei file di partenza (esclusa da git)
```

**PDF gratuiti.** Mettete il PDF originale in `originali/` e create la versione da pubblicare con
`npm run marchia-pdf -- originali/costolax-n0.pdf public/download/costolax-n0.pdf --qualita-ridotta`
(`--qualita-ridotta` è facoltativo). Lo script scrive l'avviso di copyright in fondo alle pagine e toglie i metadati
nascosti dei programmi di grafica (nomi utente e percorsi del computer).

## Aggiungere contenuti

Copiate un file esistente nella stessa cartella, rinominatelo (il nome del file diventa l'indirizzo, es. `costolax-n2.md` → `/fumetti/costolax-n2/`) e cambiate i campi. Il testo sotto le righe `---` è la descrizione o la biografia.

**Autore** — `src/content/artisti/nome.md`
```yaml
nome: Sangue Sarmatico
ruolo: Disegni
immagine: ../../assets/ritratti/sangue-sarmatico.webp
immagineAlt: Descrizione dell'immagine per chi non vede
instagram: https://www.instagram.com/...   # facoltativo
ordine: 2                                   # posizione nelle liste
```

**Fumetto** — `src/content/fumetti/titolo.md`
```yaml
titolo: RoboPork
sottotitolo: Capitolo 1          # facoltativo
autori:
  - artista: lo-scolo            # nome del file dell'autore, senza .md
    ruolo: Testi
copertina: ../../assets/fumetti/costolax-n2.webp
copertinaAlt: ...
tavole:                          # anteprime, facoltative
  - immagine: ../../assets/anteprime/costolax-n2/robopork-pagina-01.webp
    alt: ...
uscita: Settembre 2026
inEvidenza: true                 # compare in home
ordine: 2
pdfGratis: download/costolax-n0.pdf   # facoltativo: PDF scaricabile gratis (file in public/)
```

**Storia** — `src/content/storie/titolo.md`. In quali numeri compare lo decide il `sommario` di ogni numero.
```yaml
titolo: RoboPork
autori:
  - artista: lo-scolo
    ruolo: Testi
    ruoloEn: Story
immagine: ../../assets/storie/robopork.webp  # facoltativa: senza, compare il titolo su fondo colorato
inCorso: true                   # facoltativo: serie che continua ("In corso")
ordine: 4
```

Nel file di un numero, il **sommario** elenca le storie in ordine; `nota` è facoltativa (es. capitolo, anteprima):
```yaml
sommario:
  - storia: robopork
    nota: anteprima
    notaEn: preview
```

Negli autori, `fondatore: true` li mette tra i **Membri fondatori**; `portfolio` è l'elenco delle loro tavole (`immagine`, `alt`, `altEn`).

**Evento o fiera** — `src/content/eventi/nome.md`. Copiate `_esempio.md` (i file che iniziano con `_` non compaiono sul sito). Il testo sotto le righe `---` è il post.
```yaml
titolo: Lucca Comics & Games
inizio: 2026-10-28              # anno-mese-giorno
fine: 2026-11-01                # facoltativo, per più giorni
luogo: Padiglione Self Area
citta: Lucca
stand: Tavolo 12                # facoltativo
link: https://...               # facoltativo: sito dell'evento
immagine: ../../assets/illustrazioni/...  # facoltativa: locandina o foto
```

Gli eventi stanno in "Prossimi eventi" fino all'ultimo giorno compreso, poi passano da soli in "Dove siamo stati". La data di riferimento è quella dell'ultima pubblicazione: dopo un evento basta un push qualsiasi per spostarlo. I prossimi due eventi compaiono anche in home.

**Negozio** — in `src/site.config.ts`, nell'elenco `negozi` (pagina /negozi/). Aggiungete una riga copiando quelle che ci sono:
```ts
{ nome: 'Altrimondi', indirizzo: 'Via Sebastiano Caboto 20/B', cap: '33170', citta: 'Pordenone', provincia: 'PN' },
```
Il link alla mappa si crea da solo da nome e indirizzo.

Se un campo è sbagliato o manca, `npm run build` si ferma e dice quale.

## Tema chiaro e scuro

Il sito segue il tema del telefono o del computer; il pulsante con la luna/il sole in alto lo cambia e la scelta resta salvata nel browser. I colori del tema scuro sono in `src/styles/global.css`, nel blocco "tema scuro". `--nero` e `--panna` non cambiano mai: servono per le fasce scure e per il testo sopra il giallo e il magenta.

## Versione inglese

Il sito italiano è su `/`, quello inglese su `/en/` (indirizzi tradotti: `/en/comics/`, `/en/authors/`, `/en/events/`…). Il pulsante **IT / EN** in alto porta alla stessa pagina nell'altra lingua.

- **Scritte del sito** (menu, pulsanti, titoli, testi delle pagine): in `src/i18n/ui.ts`, prima tutte in italiano e poi tutte in inglese. Se cambiate una frase, cambiatela in entrambe.
- **Contenuti** (fumetti, artisti, storie, eventi): nello stesso file `.md`, ogni testo può avere un campo gemello con `En` in fondo. Se il campo inglese manca, la versione inglese mostra l'italiano.

```yaml
titolo: A calci nel culo          # i titoli propri si possono lasciare uguali
sottotitolo: Capitolo 2
sottotitoloEn: Chapter 2
autori:
  - artista: enrox
    ruolo: Testi e disegni
    ruoloEn: Story and art
copertinaAlt: ...
copertinaAltEn: ...
testoEn: "Descrizione in inglese (il testo sotto le righe --- è quella italiana)."
```

Campi traducibili: artisti `ruoloEn`, `immagineAltEn`, `testoEn` · fumetti `titoloEn`, `sottotitoloEn`, `ruoloEn`, `copertinaAltEn`, `altEn` (nelle tavole), `uscitaEn`, `formatoEn`, `testoEn`. Per un `testoEn` su più paragrafi usate `testoEn: |` e lasciate una riga vuota tra un paragrafo e l'altro.

---

## Pubblicare su GitHub Pages

Il repository è `costolax/costolax.github.io`: GitHub lo pubblica alla radice di **https://costolax.github.io**.

1. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (una volta sola).
2. Fate push del ramo `main`: il sito si compila e si pubblica da solo in un paio di minuti (scheda **Actions**).

## Collegare il dominio (costolax.com)

Il dominio `costolax.com` è registrato su Hostinger. Il sito ha già `SITE = 'https://costolax.com'` in `astro.config.mjs`
e il file `public/CNAME` con dentro `costolax.com`.

1. Su Hostinger: **Domini → costolax.com → DNS / Nameserver**. Cancellate i record **A** per `@` e **CNAME** per `www`
   che ci sono già (sono del parcheggio di Hostinger) e aggiungete:
   - 4 record **A** per `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 4 record **AAAA** per `@` (facoltativi, per IPv6): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - 1 record **CNAME** per `www` → `costolax.github.io`
2. Su GitHub: **Settings → Pages → Custom domain** = `costolax.com`, poi spuntate **Enforce HTTPS** quando diventa
   disponibile (il certificato arriva da solo, di solito entro un'ora).
3. Consigliato: verificate il dominio nelle impostazioni dell'organizzazione GitHub (**Settings → Pages → Add a domain**),
   così nessun altro può usarlo per un suo sito.

---

## Da completare prima di aprire

- [ ] Verifica di ruoli e crediti dei fumetti (ricavati dalle firme sulle tavole) e delle tavole in anteprima del N.0
- [ ] Descrizioni dei fumetti
- [ ] Rilettura delle traduzioni inglesi (`src/i18n/ui.ts` e campi `...En` nei contenuti)
