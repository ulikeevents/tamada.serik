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
    channelUrl: "https://www.youtube.com/@tamadaserik",
    videos: [
      { id: "NdftQ9KyrHk", title: "Der Tamada (feat. Dusha)" },
      { id: "jjkyNF7P40A", title: "Deutsche Russen (feat. Onkel Russia)" },
      { id: "Re45rw4tdQ0", title: "Saufen oder nicht" },
      { id: "CnlIAGpCfuA", title: "Казахстан" }
    ]
  },

  /* ---------- 3. VIRALE CLIPS (Instagram / TikTok) ----------
     Instagram: url = https://www.instagram.com/reel/CODE/
     TikTok:    url = https://www.tiktok.com/@name/video/12345
     thumb:     optionales eigenes Coverbild (empfohlen!)       */
  reels: [
    { platform: "instagram", url: "", thumb: "", caption: "", views: "" },
    { platform: "tiktok",    url: "", thumb: "", caption: "", views: "" },
    { platform: "instagram", url: "", thumb: "", caption: "", views: "" },
    { platform: "tiktok",    url: "", thumb: "", caption: "", views: "" }
  ],

  /* ---------- 4. SHOP: BUCH + VIDEOGRUSS --------------------
     Aktuell führen die Buttons direkt in den Shopify-Checkout.
     Der Starter-Plan erlaubt keinen Warenkorb auf dieser Seite.

     Später, ab Shopify Basic: domain + storefrontAccessToken
     ausfüllen und pro Produkt die id eintragen — dann läuft der
     Kauf ohne Absprung. Sonst ändert sich nichts.              */
  shopify: {
    domain: "",
    storefrontAccessToken: "",
    products: {
      buch: {
        id: "",
        title: "Die Bucket List für Aussiedler",
        desc: "57 krasse Aufgaben, um ein wahrer Aussiedler zu werden — und zu bleiben.",
        tag: "BUCH",
        price: "14,90 €",
        image: "assets/img/shop/buch.png",
        fit: "contain",
        label: "BUCH KAUFEN",
        fallbackUrl: "https://msxnyc-ad.myshopify.com/products/die-bucket-list-fur-aussiedler-57-krasse-aufgaben-um-ein-wahrer-aussiedler-zu-werden-und-zu-bleiben-ideal-als-geschenk"
      },
      videogruss: {
        id: "",
        title: "Personalisiertes Gruß-Video",
        desc: "Geburtstag, Hochzeit, Rache — ich sag's deinen Leuten persönlich. Mit Namen.",
        tag: "PERSÖNLICH",
        price: "50,00 €",
        image: "assets/img/shop/videogruss.jpg",
        fit: "cover",
        label: "VIDEOGRUSS BESTELLEN",
        fallbackUrl: "https://msxnyc-ad.myshopify.com/products/personalisierter-namens-song-video"
      }
    }
  },

  /* ---------- 5. SPREADSHIRT MERCH --------------------------
     Kacheln verlinken direkt in deinen Spreadshirt-Shop.       */
  spreadshirt: {
    shopUrl: "https://tamada-serik-shop.myspreadshop.de/",
    items: [
      { title: "Uschanka Hoodie", price: "", image: "", url: "" },
      { title: "TAMADA Shirt",    price: "", image: "", url: "" },
      { title: "Cap",             price: "", image: "", url: "" }
    ]
  },

  /* ---------- 6. KONTAKT & SOCIAL --------------------------- */
  contact: {
    email: "tamada.serik@proton.me",
    phone: "",
    whatsapp: ""   // internationale Nummer ohne +, z.B. "4915112345678"
  },
  social: {
    instagram: "",
    tiktok: "",
    youtube: "https://www.youtube.com/@tamadaserik",
    spotify: ""
  }
};
