/* ============================================================
   TAMADA SERIK — Seitenlogik
   Alles wird aus assets/js/config.js gespeist.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var has = function (v) { return typeof v === "string" && v.trim() !== ""; };

  /* ---------- Einwilligung für externe Inhalte (DSGVO) ------
     Externe Player (Spotify/YouTube/Instagram/TikTok) werden
     erst geladen, wenn der Besucher klickt. Die Entscheidung
     wird lokal gemerkt.                                        */
  var CONSENT_KEY = "ts_ext_consent";
  function hasConsent() {
    try { return localStorage.getItem(CONSENT_KEY) === "1"; } catch (e) { return false; }
  }
  function grantConsent() {
    try { localStorage.setItem(CONSENT_KEY, "1"); } catch (e) {}
  }

  function facade(title, note, label, onLoad) {
    var box = document.createElement("div");
    box.className = "facade";
    var h = document.createElement("p");
    h.className = "facade__title";
    h.textContent = title;
    var p = document.createElement("p");
    p.className = "facade__note";
    p.textContent = note;
    var b = document.createElement("button");
    b.className = "btn btn--red";
    b.type = "button";
    b.appendChild(document.createTextNode(label));
    b.addEventListener("click", function () { grantConsent(); onLoad(); });
    box.appendChild(h); box.appendChild(p); box.appendChild(b);
    return box;
  }

  function placeholder(mount, text) {
    var box = document.createElement("div");
    box.className = "facade";
    box.setAttribute("data-ph", text);
    box.style.minHeight = "220px";
    mount.appendChild(box);
  }

  function iframe(src, attrs) {
    var f = document.createElement("iframe");
    f.src = src;
    f.loading = "lazy";
    f.setAttribute("allowfullscreen", "");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    Object.keys(attrs || {}).forEach(function (k) { f.setAttribute(k, attrs[k]); });
    return f;
  }

  function linkBtn(href, text, ghost) {
    var a = document.createElement("a");
    a.className = "btn " + (ghost ? "btn--ghost" : "btn--red");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(document.createTextNode(text));
    return a;
  }

  /* ================= NAVIGATION ============================ */
  function initNav() {
    var nav = $("#nav");
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $(".nav__burger");
    var menu = $("#nav-mobile");
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }

  /* ================= HERO / BILDER ========================= */
  function setImage(el, url) {
    if (!el || !has(url)) return;
    el.style.backgroundImage = "url('" + url + "')";
    el.classList.add("has-img");
  }

  /* ================= SPOTIFY =============================== */
  function initSpotify() {
    var mount = $("#spotify-mount");
    var links = $("#spotify-links");
    var sp = CFG.spotify || {};

    if (!has(sp.playlistId)) {
      placeholder(mount, "SPOTIFY · Playlist-ID in config.js eintragen");
      return;
    }

    var load = function () {
      mount.innerHTML = "";
      mount.appendChild(iframe(
        "https://open.spotify.com/embed/playlist/" + encodeURIComponent(sp.playlistId) + "?utm_source=generator&theme=0",
        { height: "420", allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", title: "Spotify Playlist von Tamada Serik" }
      ));
    };

    if (hasConsent()) load();
    else mount.appendChild(facade(
      "Playlist abspielen",
      "Beim Laden wird eine Verbindung zu Spotify hergestellt und deine IP-Adresse übertragen.",
      "PLAYLIST LADEN", load
    ));

    if (has(sp.artistUrl)) links.appendChild(linkBtn(sp.artistUrl, "ALLE SONGS AUF SPOTIFY", true));
  }

  /* ================= YOUTUBE =============================== */
  function initYouTube() {
    var grid = $("#youtube-grid");
    var links = $("#youtube-links");
    var yt = CFG.youtube || {};
    var vids = (yt.videos || []).filter(function (v) { return has(v.id); });

    if (!vids.length) {
      (yt.videos || [{}, {}, {}]).forEach(function (v) {
        var card = document.createElement("div");
        card.className = "yt";
        card.setAttribute("data-ph", "YOUTUBE · Video-ID eintragen");
        grid.appendChild(card);
      });
      return;
    }

    vids.forEach(function (v) {
      var card = document.createElement("div");
      card.className = "yt";

      var img = document.createElement("img");
      // maxres ist 1280x720 und echtes 16:9; existiert aber nicht zu
      // jedem Video — dann auf hq zurückfallen (dort mit Balken, die
      // object-fit: cover wegschneidet).
      img.src = "https://i.ytimg.com/vi/" + v.id + "/maxresdefault.jpg";
      img.alt = v.title || "Musikvideo";
      img.loading = "lazy";
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        img.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
      });

      var btn = document.createElement("button");
      btn.className = "yt__play";
      btn.type = "button";
      btn.setAttribute("aria-label", "Video abspielen: " + (v.title || ""));

      var cap = document.createElement("span");
      cap.className = "yt__title";
      cap.textContent = v.title || "";
      btn.appendChild(cap);

      btn.addEventListener("click", function () {
        grantConsent();
        card.innerHTML = "";
        card.appendChild(iframe(
          "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0",
          { allow: "accelerometer; autoplay; encrypted-media; picture-in-picture", title: v.title || "Musikvideo" }
        ));
      });

      card.appendChild(img);
      card.appendChild(btn);
      grid.appendChild(card);
    });

    if (has(yt.channelUrl)) links.appendChild(linkBtn(yt.channelUrl, "KANAL ABONNIEREN", true));
  }

  /* ================= REELS (Instagram / TikTok) ============ */
  function embedUrlFor(item) {
    var u = item.url || "";
    if (item.platform === "instagram") {
      var m = u.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
      return m ? "https://www.instagram.com/reel/" + m[1] + "/embed/" : null;
    }
    if (item.platform === "tiktok") {
      var t = u.match(/\/video\/(\d+)/);
      return t ? "https://www.tiktok.com/embed/v2/" + t[1] : null;
    }
    return null;
  }

  function initReels() {
    var grid = $("#reels-grid");
    var items = CFG.reels || [];

    items.forEach(function (item) {
      var embed = embedUrlFor(item);
      var card = document.createElement(embed ? "button" : "div");
      card.className = "reel";
      if (embed) card.type = "button";

      if (has(item.thumb)) {
        var img = document.createElement("img");
        img.src = item.thumb;
        img.alt = item.caption || "Viraler Clip";
        img.loading = "lazy";
        card.appendChild(img);
      } else {
        card.setAttribute("data-ph", embed ? "COVER-BILD ERGÄNZEN" : "REEL · Link in config.js eintragen");
      }

      var badge = document.createElement("span");
      badge.className = "reel__badge";
      badge.textContent = item.platform === "tiktok" ? "TIKTOK" : "INSTAGRAM";
      card.appendChild(badge);

      var ov = document.createElement("span");
      ov.className = "reel__overlay";
      if (has(item.caption)) {
        var c = document.createElement("span");
        c.className = "reel__cap";
        c.textContent = item.caption;
        ov.appendChild(c);
      }
      if (has(item.views)) {
        var vw = document.createElement("span");
        vw.className = "reel__views";
        vw.textContent = item.views + " Views";
        ov.appendChild(vw);
      }
      card.appendChild(ov);

      if (embed) {
        card.addEventListener("click", function () { openLightbox(embed, item.caption || "Clip"); });
      }
      grid.appendChild(card);
    });
  }

  /* ================= LIGHTBOX ============================== */
  var lb, lbFrame, lastFocus;
  function openLightbox(src, title) {
    grantConsent();
    lbFrame.innerHTML = "";
    lbFrame.appendChild(iframe(src, { title: title, allow: "autoplay; encrypted-media; fullscreen" }));
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    lastFocus = document.activeElement;
    $(".lightbox__close").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    lbFrame.innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function initLightbox() {
    lb = $("#lightbox");
    lbFrame = $("#lightbox-frame");
    $(".lightbox__close").addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) closeLightbox();
    });
  }

  /* ================= SHOPIFY =============================== */
  function initShopify() {
    var sh = CFG.shopify || {};
    var slots = [
      { key: "buch", el: $("#buy-buch"), label: "BUCH KAUFEN" },
      { key: "videogruss", el: $("#buy-videogruss"), label: "VIDEOGRUSS BESTELLEN" }
    ];

    var ready = has(sh.domain) && has(sh.storefrontAccessToken);

    if (!ready) {
      slots.forEach(function (s) {
        var p = (sh.products || {})[s.key] || {};
        if (has(p.fallbackUrl)) {
          s.el.appendChild(linkBtn(p.fallbackUrl, s.label));
        } else {
          var b = document.createElement("span");
          b.className = "btn btn--ghost";
          b.appendChild(document.createTextNode("SHOPIFY VERBINDEN"));
          b.setAttribute("aria-disabled", "true");
          s.el.appendChild(b);
        }
      });
      return;
    }

    var script = document.createElement("script");
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.onload = function () {
      var ui = window.ShopifyBuy.UI.init(window.ShopifyBuy.buildClient({
        domain: sh.domain,
        storefrontAccessToken: sh.storefrontAccessToken
      }));
      slots.forEach(function (s) {
        var p = (sh.products || {})[s.key] || {};
        if (!has(p.id)) return;
        ui.createComponent("product", {
          id: p.id,
          node: s.el,
          options: {
            product: {
              contents: { img: false, title: false, price: true },
              text: { button: s.label },
              styles: {
                button: {
                  "background-color": "#e10600", "border-radius": "4px",
                  "font-family": "Anton, sans-serif", "text-transform": "uppercase",
                  "letter-spacing": "0.06em", ":hover": { "background-color": "#ff1a10" }
                },
                price: { color: "#ffffff", "font-size": "20px" },
                compareAt: { color: "#a5a5aa" }
              }
            },
            cart: { styles: { button: { "background-color": "#e10600" } } },
            toggle: { styles: { toggle: { "background-color": "#e10600" } } }
          }
        });
      });
    };
    script.onerror = function () {
      slots.forEach(function (s) {
        var p = (sh.products || {})[s.key] || {};
        if (has(p.fallbackUrl)) s.el.appendChild(linkBtn(p.fallbackUrl, s.label));
      });
    };
    document.head.appendChild(script);
  }

  /* ================= SPREADSHIRT MERCH ===================== */
  function initMerch() {
    var grid = $("#merch-grid");
    var foot = $("#merch-link");
    var sp = CFG.spreadshirt || {};
    var items = sp.items || [];

    // Ohne Produktbilder wirken leere Kacheln wie ein Fehler —
    // dann lieber ein klarer Aufruf in den Shop.
    var anyImage = items.some(function (it) { return has(it.image); });
    if (has(sp.shopUrl) && !anyImage) {
      var cta = document.createElement("div");
      cta.className = "merch-cta";
      var txt = document.createElement("div");
      txt.className = "merch-cta__txt";
      var h = document.createElement("h4");
      h.textContent = "Shirts, Hoodies, Caps";
      var pp = document.createElement("p");
      pp.textContent = "Alles im Shop — Druck und Versand laufen über Spreadshirt.";
      txt.appendChild(h); txt.appendChild(pp);
      cta.appendChild(txt);
      cta.appendChild(linkBtn(sp.shopUrl, "SHOP ÖFFNEN"));
      grid.appendChild(cta);
      return;
    }

    items.forEach(function (it) {
      var card = document.createElement(has(it.url) || has(sp.shopUrl) ? "a" : "div");
      card.className = "mcard";
      if (card.tagName === "A") {
        card.href = has(it.url) ? it.url : sp.shopUrl;
        card.target = "_blank";
        card.rel = "noopener";
      }

      var im = document.createElement("div");
      im.className = "mcard__img";
      if (has(it.image)) { setImage(im, it.image); }
      else { im.setAttribute("data-ph", "MERCH-BILD"); }

      var body = document.createElement("div");
      body.className = "mcard__body";
      var h = document.createElement("h4");
      h.textContent = it.title || "Merch";
      body.appendChild(h);
      if (has(it.price)) {
        var pr = document.createElement("p");
        pr.textContent = it.price;
        body.appendChild(pr);
      }

      card.appendChild(im);
      card.appendChild(body);
      grid.appendChild(card);
    });

    if (has(sp.shopUrl)) foot.appendChild(linkBtn(sp.shopUrl, "ZUM MERCH-SHOP", true));
  }

  /* ================= KONTAKT / SOCIAL ====================== */
  function initContact() {
    var c = CFG.contact || {};
    var box = $("#direct-contact");

    if (has(c.email)) {
      var a = document.createElement("a");
      a.href = "mailto:" + c.email;
      a.textContent = "✉  " + c.email;
      box.appendChild(a);
    }
    if (has(c.phone)) {
      var t = document.createElement("a");
      t.href = "tel:" + c.phone.replace(/\s/g, "");
      t.textContent = "☎  " + c.phone;
      box.appendChild(t);
    }
    if (has(c.whatsapp)) {
      var w = document.createElement("a");
      w.href = "https://wa.me/" + c.whatsapp;
      w.target = "_blank"; w.rel = "noopener";
      w.textContent = "✆  WhatsApp";
      box.appendChild(w);
    }

    var social = CFG.social || {};
    var foot = $("#footer-social");
    [["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube", "YouTube"], ["spotify", "Spotify"]]
      .forEach(function (pair) {
        if (!has(social[pair[0]])) return;
        var s = document.createElement("a");
        s.href = social[pair[0]];
        s.target = "_blank"; s.rel = "noopener";
        s.textContent = pair[1];
        foot.appendChild(s);
      });
  }

  /* ================= BUCHUNGSFORMULAR ====================== */
  function initForm() {
    var form = $("#booking-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var body = [
        "Name: " + (d.get("name") || ""),
        "E-Mail: " + (d.get("email") || ""),
        "Datum: " + (d.get("datum") || ""),
        "Ort: " + (d.get("ort") || ""),
        "Anlass: " + (d.get("anlass") || ""),
        "",
        d.get("nachricht") || ""
      ].join("\n");
      var to = (CFG.contact && CFG.contact.email) || "";
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent("Anfrage: " + (d.get("anlass") || "Buchung") + " am " + (d.get("datum") || "")) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ================= SCROLL-REVEAL =========================
     Wichtig: Inhalte dürfen NIE dauerhaft unsichtbar bleiben.
     Deshalb wird nur animiert, was beim Laden unterhalb des
     sichtbaren Bereichs liegt — plus ein Sicherheitsnetz.      */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var targets = $$(".sec__head, .person__txt, .person__img, .pcard, .yt, .reel, .form, .hochzeit__inner")
      .filter(function (el) { return el.getBoundingClientRect().top > window.innerHeight * 0.9; });
    if (!targets.length) return;

    var show = function (el) {
      el.classList.add("is-in");
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: "200px 0px 0px 0px", threshold: 0 });

    targets.forEach(function (t, i) {
      t.classList.add("reveal");
      t.style.transitionDelay = (Math.min(i % 4, 3) * 70) + "ms";
      io.observe(t);
    });

    // Sicherheitsnetz: was nach 6 s noch versteckt ist, wird gezeigt.
    setTimeout(function () {
      targets.forEach(function (t) {
        if (!t.classList.contains("is-in")) { show(t); io.unobserve(t); }
      });
    }, 2500);
  }

  /* ================= START ================================= */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initSpotify();
    initYouTube();
    initReels();
    initLightbox();
    initShopify();
    initMerch();
    initContact();
    initForm();
    initReveal();
  });
})();
