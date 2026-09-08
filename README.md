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

### 4. Shopify (Buch + Videogruß)
1. Im Shopify-Admin: *Einstellungen → Apps → Apps und Vertriebskanäle entwickeln*
   → App erstellen → **Storefront API** aktivieren → Token kopieren.
2. `domain` (`deinshop.myshopify.com`) und `storefrontAccessToken` in `config.js`.
3. Produkt-ID = die lange Zahl in der Admin-URL des Produkts
   (`…/products/**7891234567890**`).

Der Token ist ein *Storefront*-Token — er ist öffentlich gedacht, hat nur Lesezugriff
und darf im Code stehen. **Kein Admin-API-Token verwenden.**

Solange nichts eingetragen ist, kannst du unter `fallbackUrl` einfach den direkten
Produktlink hinterlegen — dann führt der Button in deinen Shop.

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
