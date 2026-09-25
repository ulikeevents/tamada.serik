# tamada.serik

Homepage für **TAMADA SERIK** — Tamada, Sänger, Entertainer.
Statische Seite (HTML/CSS/JS, kein Build-Schritt), bereit für GitHub Pages.

---

## Schnellstart

Seite lokal ansehen:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Alles, was du regelmäßig änderst, steht an **einer** Stelle:
**`assets/js/config.js`**

Leere Felder werden automatisch als Platzhalter dargestellt — die Seite bleibt also
immer funktionsfähig, auch wenn noch nichts eingetragen ist.

---

## Was wo eingetragen wird

### 1. Spotify
Aus `https://open.spotify.com/playlist/**21z1aHXXPzCI5xrRwXcPJc**?si=…`
brauchst du nur den fetten Teil. Ist bereits eingetragen.

### 2. YouTube
Pro Video die ID aus der URL (`watch?v=**ID**` oder `youtu.be/**ID**`).
Vorschaubilder holt die Seite automatisch von YouTube.

### 3. Instagram / TikTok
Einfach den Link zum Reel bzw. Video eintragen. Die Seite baut daraus den Player.
**Empfehlung:** zusätzlich ein eigenes Coverbild unter `thumb` angeben (z. B.
`assets/img/reel-1.jpg`) — Instagram und TikTok liefern keine frei nutzbaren
Vorschaubilder aus.

### 4. Shop: Buch + Videogruß
Beide Produkte stehen mit Titel, Preis, Bild und Link in `config.js`.
Der Button führt in den Shopify-Checkout.

**Warum kein Warenkorb auf der Seite?** Der Shopify-**Starter**-Plan gibt die
Storefront API nicht frei (der Headless-Kanal meldet „nicht kompatibel"). Dafür
wäre mindestens der Basic-Plan nötig — rund 30 € statt 5 € im Monat. Bei zwei
Produkten lohnt das nicht: Der Unterschied für den Käufer ist ein Klick.

**Umstieg später**, ab Basic: Headless-Kanal installieren, Storefront zu erstellen,
dann in `config.js` nur `domain`, `storefrontAccessToken` und pro Produkt die `id`
eintragen. Der Code schaltet dann von selbst auf den Buy Button mit Warenkorb um —
am Rest ändert sich nichts.

Produktbilder liegen unter `assets/img/shop/` im Repo statt bei Shopify. Das ist
schneller und vermeidet einen Fremdabruf bei jedem Seitenaufruf. Ändert sich ein
Produktfoto im Shop, muss es hier ersetzt werden.

### 5. Spreadshirt (Merch)
Spreadshirt bietet keinen Warenkorb zum Einbetten wie Shopify. Deshalb: schicke
Produktkacheln auf der Seite, Klick öffnet den Spreadshirt-Shop.
Nötig sind nur `shopUrl` und pro Artikel Titel, Preis, Bild und Link.

### 6. Bilder
Alle Flächen mit gestricheltem roten Rand sind Platzhalter. Ersetzen:
Bild nach `assets/img/` legen und im HTML bzw. in `config.js` referenzieren.

Empfohlene Formate:
| Stelle | Verhältnis | Vorschlag |
|---|---|---|
| Hero (Vollbild) | 16:9 oder größer | 2400 × 1350 |
| Porträt „Person“ | 4:5 | 1200 × 1500 |
| Reel-Cover | 9:16 | 810 × 1440 |
| Buch / Videogruß | 4:3 | 1200 × 900 |
| Hochzeit (Hintergrund) | 16:9 | 2400 × 1350 |

---

## Datenschutz

Externe Player (Spotify, YouTube, Instagram, TikTok) laden **erst nach Klick**.
Das ist Absicht — so fließen keine Daten, bevor der Besucher zustimmt.
Die Zustimmung merkt sich der Browser lokal.

`impressum.html` und `datenschutz.html` sind **Entwürfe mit Platzhaltern**.
Beide müssen vor dem Livegang mit echten Daten gefüllt und geprüft werden.

Optional für maximale Sauberkeit: Google Fonts lokal einbinden statt von Google laden
(Schriften herunterladen, nach `assets/fonts/` legen, `@font-face` in `style.css`).

---

## Veröffentlichen (GitHub Pages)

1. Änderungen nach `main` bringen.
2. Repo → *Settings* → *Pages* → **Source: GitHub Actions**.
3. Der Workflow `.github/workflows/pages.yml` veröffentlicht bei jedem Push auf `main`.

Eigene Domain: in *Settings → Pages → Custom domain* eintragen und beim
Domain-Anbieter einen CNAME auf `<user>.github.io` setzen.

---

## Aufbau

```
index.html            Startseite (alle Sektionen)
impressum.html        Pflichtangaben (Entwurf)
datenschutz.html      Datenschutzerklärung (Entwurf)
assets/css/style.css  Gestaltung
assets/js/config.js   ← hier trägst du alles ein
assets/js/site.js     Logik (Player, Shop, Formular)
assets/img/           Bilder
```

## Gestaltung

| | |
|---|---|
| Schwarz | `#0a0a0a` |
| Rot | `#e10600` (Hover `#ff1a10`) |
| Überschriften | Anton, gescherter Pinselstrich-Look |
| Fließtext | Barlow |

Der Pinselstrich hinter den Überschriften ist ein SVG-Filter (`#roughen` in `index.html`) —
kein Bild. Er passt sich jeder Textlänge automatisch an. Mit `baseFrequency` und `scale`
lässt sich die Rauheit einstellen.
