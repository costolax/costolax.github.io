# Costolax — la rivista dei fumetti marci

Sito del collettivo Costolax: fumetti, artisti, eventi e shop, in italiano e in inglese.
Fatto con [Astro](https://astro.build), pubblicato gratis su GitHub Pages; i pagamenti passano da **Stripe Payment Links**.

| Voce | Costo |
|---|---|
| Hosting (GitHub Pages) e HTTPS | 0 € |
| Dominio `.it` | ~10–15 €/anno |
| Stripe | 0 € fissi, ~1,5% + 0,25 € a vendita con carta europea |

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
│   ├── laterali/        le immagini a lato in cima alle pagine (Home, Fumetti, Autori, Storie, Fiere, Shop)
│   ├── ritratti/        i ritratti degli autori (enrox.webp)
│   ├── illustrazioni/   altri disegni (la striscia di tavole in home)
│   └── marchio/         logo e scritta Costolax
│   Nomi: tutto minuscolo con i trattini, lo stesso nome dei file in content/ (es. pippa-calciepugni),
│   le pagine sempre a due cifre (pagina-08).
├── content/
│   ├── artisti/         un file .md per autore (pagine /autori/)
│   ├── eventi/          un file .md per fiera o evento (pagine /fiere/, modello: _esempio.md)
│   ├── fumetti/         un file .md per numero della rivista (pagine /fumetti/), con il sommario
│   ├── storie/          un file .md per storia o serie (pagina /storie/)
│   └── prodotti/        un file .md per prodotto in vendita
├── i18n/ui.ts           tutte le scritte del sito, in italiano e in inglese
├── site.config.ts       nome, email, Instagram, spese di spedizione
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

**Prodotto** — `src/content/prodotti/nome.md`
```yaml
nome: Stampa «Costolax Pink»
tipo: stampa                     # albo | stampa | gadget | pdf | originale
prezzo: 15
immagine: ../../assets/illustrazioni/costolax-pink.webp
immagineAlt: ...
stripeLink: https://buy.stripe.com/...   # senza link il pulsante dice "In arrivo"
disponibile: true                         # false → "Esaurito" / "Venduto"
fumetto: costolax-n1                      # facoltativo: lo mostra nella pagina del fumetto
dettagli: [Formato A3, Tiratura limitata]
ordine: 3
```

Se un campo è sbagliato o manca, `npm run build` si ferma e dice quale.

## Tema chiaro e scuro

Il sito segue il tema del telefono o del computer; il pulsante con la luna/il sole in alto lo cambia e la scelta resta salvata nel browser. I colori del tema scuro sono in `src/styles/global.css`, nel blocco "tema scuro". `--nero` e `--panna` non cambiano mai: servono per le fasce scure e per il testo sopra il giallo e il magenta.

## Versione inglese

Il sito italiano è su `/`, quello inglese su `/en/` (indirizzi tradotti: `/en/comics/`, `/en/authors/`, `/en/events/`…). Il pulsante **IT / EN** in alto porta alla stessa pagina nell'altra lingua.

- **Scritte del sito** (menu, pulsanti, titoli, testi delle pagine): in `src/i18n/ui.ts`, prima tutte in italiano e poi tutte in inglese. Se cambiate una frase, cambiatela in entrambe. I testi di spedizioni, resi e privacy sono in `src/components/InfoSezioni.astro` (compaiono nella pagina Shop).
- **Contenuti** (fumetti, artisti, prodotti): nello stesso file `.md`, ogni testo può avere un campo gemello con `En` in fondo. Se il campo inglese manca, la versione inglese mostra l'italiano.

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

Campi traducibili: artisti `ruoloEn`, `immagineAltEn`, `testoEn` · fumetti `titoloEn`, `sottotitoloEn`, `ruoloEn`, `copertinaAltEn`, `altEn` (nelle tavole), `uscitaEn`, `formatoEn`, `testoEn` · prodotti `nomeEn`, `immagineAltEn`, `dettagliEn`. Per un `testoEn` su più paragrafi usate `testoEn: |` e lasciate una riga vuota tra un paragrafo e l'altro.

Prezzi, immagini e link Stripe sono in comune tra le due lingue. La pagina di pagamento Stripe si apre da sola nella lingua del sito, e la pagina `/grazie/` (dove Stripe rimanda dopo il pagamento) è bilingue.

---

## Vendere con Stripe

1. Create un account su [stripe.com](https://stripe.com) (Italia) e completate i dati per ricevere i pagamenti.
2. Lavorate prima in **modalità test** (interruttore in alto nella dashboard).
3. **Impostazioni → Branding**: caricate il logo e scegliete i colori (es. magenta `#a8238a`).
4. **Impostazioni → Checkout e Payment Links**: aggiungete email di assistenza e link a resi e privacy (`/shop/#resi`, `/shop/#privacy`).
5. Per ogni prodotto: **Payment Links → Crea**, aggiungete il prodotto con prezzo in EUR e poi:
   - **Prodotti fisici** (albi, stampe, gadget): *Raccogli indirizzi dei clienti → fatturazione e spedizione*, scegliete i paesi e aggiungete le tariffe di spedizione (le stesse scritte in `site.config.ts`). Attivate *Consenti ai clienti di modificare la quantità*.
   - **Tavole originali**: *Limita il numero di pagamenti* = 1. Dopo la vendita il link si disattiva da solo; mettete `disponibile: false` nel file del prodotto.
   - **Dopo il pagamento**: *Non mostrare la pagina di conferma → reindirizza al sito* con l'indirizzo `https://costolax.it/grazie/` (il vostro dominio).
6. Copiate il link (`https://buy.stripe.com/...`) nel campo `stripeLink` del prodotto e fate push.
7. Provate un acquisto in modalità test con la carta `4242 4242 4242 4242` (qualsiasi data futura e CVC). Quando funziona, rifate i link in modalità live e sostituiteli.

Per comprare più cose insieme senza carrello potete creare **pacchetti** (es. "Albo + stampa") come prodotti a sé, oppure aggiungere un *cross-sell* nel Payment Link.

Gli ordini arrivano via email e si vedono in **Pagamenti** nella dashboard di Stripe, con indirizzo di spedizione.

### Vendere i PDF

Questo repository è **pubblico** (GitHub Pages gratuito lo richiede): **non mettete i PDF a pagamento qui dentro**, chiunque potrebbe scaricarli. Fanno eccezione i numeri gratuiti come il N.0, che stanno in `public/download/`.

1. Caricate il PDF su Google Drive o Dropbox e create un link di condivisione ("chiunque abbia il link").
2. Nel Payment Link del PDF, alla voce **Dopo il pagamento**, scegliete *Mostra pagina di conferma* e scrivete un messaggio personalizzato con il link al file (oppure reindirizzate direttamente al link del file).

Il link resta nelle impostazioni di Stripe, non nel sito. Limite: chi compra può girarlo ad altri. Per partire va bene; se diventerà un problema si potrà passare a un servizio dedicato.

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
4. Aggiornate l'indirizzo di ritorno (`/grazie/`) nei Payment Link di Stripe.

---

## Da completare prima di aprire

- [ ] Verifica di ruoli e crediti dei fumetti (ricavati dalle firme sulle tavole) e delle tavole in anteprima del N.0
- [ ] Descrizioni dei fumetti
- [ ] Prezzi, dettagli dei prodotti e spese di spedizione (quelli attuali sono di esempio)
- [ ] Testi di resi e privacy in `src/components/InfoSezioni.astro` (di esempio: fateli verificare)
- [ ] Rilettura delle traduzioni inglesi (`src/i18n/ui.ts` e campi `...En` nei contenuti)
- [ ] Aspetto fiscale delle vendite (partita IVA, vendite occasionali): chiedete a un commercialista
