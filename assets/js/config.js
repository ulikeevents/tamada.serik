/* ============================================================
   TAMADA SERIK — ZENTRALE KONFIGURATION
   ------------------------------------------------------------
   Hier trägst du alles ein. Sonst musst du nichts anfassen.
   Leere Felder ("") werden auf der Seite automatisch als
   Platzhalter angezeigt, es geht also nichts kaputt.
   ============================================================ */

window.SITE_CONFIG = {

  /* ---------- 1. SPOTIFY ------------------------------------
     playlistId = der Teil nach /playlist/ in deinem Link.      */
  spotify: {
    playlistId: "21z1aHXXPzCI5xrRwXcPJc",
    artistUrl: ""   // z.B. "https://open.spotify.com/artist/xxxx"
  },

  /* ---------- 2. YOUTUBE MUSIKVIDEOS ------------------------
     id = der Teil nach "watch?v=" bzw. nach "youtu.be/".       */
  youtube: {
    channelUrl: "",
    videos: [
      { id: "", title: "Musikvideo 1" },
      { id: "", title: "Musikvideo 2" },
      { id: "", title: "Musikvideo 3" }
    ]
  },

  /* ---------- 3. VIRALE CLIPS (Instagram / TikTok) ----------
     Instagram: url = https://www.instagram.com/reel/CODE/
     TikTok:    url = https://www.tiktok.com/@name/video/12345
     thumb:     optionales eigenes Coverbild (empfohlen!)       */
  reels: [
    { platform: "instagram", url: "", thumb: "", caption: "Виральный клип 1", views: "" },
    { platform: "tiktok",    url: "", thumb: "", caption: "Viraler Clip 2",  views: "" },
    { platform: "instagram", url: "", thumb: "", caption: "Viraler Clip 3",  views: "" },
    { platform: "tiktok",    url: "", thumb: "", caption: "Viraler Clip 4",  views: "" }
  ],

  /* ---------- 4. SHOPIFY (Buch + Videogruß) -----------------
     domain  = deine .myshopify.com Domain
     token   = Storefront API Access Token (ist öffentlich,
               darf im Code stehen — nur Lesezugriff)
     productId = die lange Zahl aus der Produkt-URL im Admin    */
  shopify: {
    domain: "",                    // z.B. "tamada-serik.myshopify.com"
    storefrontAccessToken: "",
    products: {
      buch:      { id: "", fallbackUrl: "" },
      videogruss:{ id: "", fallbackUrl: "" }
    }
  },

  /* ---------- 5. SPREADSHIRT MERCH --------------------------
     Kacheln verlinken direkt in deinen Spreadshirt-Shop.       */
  spreadshirt: {
    shopUrl: "",   // z.B. "https://tamada-serik.myspreadshop.de"
    items: [
      { title: "Uschanka Hoodie", price: "", image: "", url: "" },
      { title: "TAMADA Shirt",    price: "", image: "", url: "" },
      { title: "Cap",             price: "", image: "", url: "" }
    ]
  },

  /* ---------- 6. KONTAKT & SOCIAL --------------------------- */
  contact: {
    email: "booking@tamada-serik.de",
    phone: "",
    whatsapp: ""   // internationale Nummer ohne +, z.B. "4915112345678"
  },
  social: {
    instagram: "",
    tiktok: "",
    youtube: "",
    spotify: ""
  }
};
