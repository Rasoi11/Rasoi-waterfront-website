RASOI WATERFRONT — NEW WEBSITE
================================

A clean, premium, static website for Rasoi Waterfront, built to replace the
current Elementor/WordPress site. Five pages, no build step, no dependencies.

HOW TO PREVIEW
--------------
Just open site/index.html in any browser (double-click is fine). For a
better experience with relative paths & fonts, run a simple local server
from this folder:

    cd "site"
    python3 -m http.server 8000

Then visit http://localhost:8000 in your browser.

FILES
-----
  site/
    index.html          — homepage
    menus.html          — menu hub (links to PDFs)
    about.html          — brothers' story + awards
    events.html         — private dining + catering + enquiry form
    contact.html        — address, hours, map, gift vouchers
    assets/
      styles.css        — all styling
      script.js         — nav, scroll effects, reveal animations
      images/           — logo + hero food shot + interior mood shots
      menus/            — PDF menus (main, lunch, brunch, cocktails)

DESIGN NOTES
------------
Palette:
  Deep Forest Green   #1e2a22 / #50694e
  Antique Gold         #b28b4a / #c39a55
  Warm Ivory / Cream   #fbf7ee / #f7f2e8

Typography:
  Headings — Cormorant Garamond (elegant serif)
  Body     — Inter (clean, legible sans-serif)

Layout principles used:
  - Full-bleed hero with moody food photography
  - Generous vertical spacing (60–140px sections)
  - Gold accent rule above every section eyebrow
  - Editorial grid: story ⟷ imagery pairs
  - Two-tone sections (light / dark green) for rhythm
  - Single primary CTA color (gold) for conversion clarity

THINGS TO SWAP WHEN YOU GO LIVE
-------------------------------
1. Replace hero-food.jpg + interior shots with higher-res branded photography.
2. Update SevenRooms reservation URL if it has changed.
3. Update Square takeaway URL if it has changed.
4. Replace the Google Map iframe with the exact embed code from Google Maps
   (Share > Embed a map) for perfectly centered map tile.
5. Add a real privacy policy, allergens page and gift voucher checkout.
6. Plug the Events enquiry form into Formspree / Basin / your mailer.
7. Add Instagram feed block (Elfsight / EmbedSocial) to reintroduce the
   live @rasoiwales feed that was on the old site.
