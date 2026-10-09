# 01 — Luxury Jewelry House Website Teardowns

**For:** American Jewelry (Brentwood + Mt. Juliet, TN) — new site on Next.js/Vercel + Shopify + iJewel3D
**Date captured:** 2026-10-08 (US locale pages unless noted)
**Sites torn down:** Cartier, Van Cleef & Arpels, Harry Winston, Tiffany & Co., Graff, Boucheron, Bulgari, David Yurman, Ralph Lauren (style reference), VRAI, Catbird, Mejuri

---

## 0. Method and caveats

- Every page below was read live on 2026-10-08, either as fetched HTML or as a headless-browser text dump of the rendered page. Navigation and footer items were pulled from the rendered DOM (`header a`, `nav a`, `footer a`), so the lists are what the site actually links, not what a menu screenshot suggests.
- Van Cleef & Arpels, Tiffany, Bulgari and Graff block plain HTTP fetches (403 / redirect loops); they were read in the browser.
- Ralph Lauren sits behind a PerimeterX "Press & Hold" bot wall on `ralphlauren.com` and an Akamai block on `ralphlauren.co.uk`. I did not attempt to bypass either. One page (`/rl-heritage-timeline-feature`) rendered because it was reached via a redirect from `corporate.ralphlauren.com`, and the full header/footer DOM was captured from it. RL Mag itself stayed blocked, so RL is treated as a **style reference only**, supplemented by its corporate site and Wikipedia's label ladder.
- Harry Winston renders its collection product grids client-side; the fetched Sunflower page literally says "No results were found," so HW product-level facts come from individual PDPs found via search.
- Where a site did not show something (reviews, financing, 3D), it is recorded as absent **on the page checked**, not as a site-wide fact.
- The browser pane was shared with another session that was previewing a local "Build a ring · American Jewelry" prototype at `localhost:3020`; one Tiffany capture was hijacked by it and re-run on a dedicated tab. Nothing from that prototype is used here.

---

## 1. House-by-house teardowns

Each house follows the same template: **Nav → Homepage order → Collection pages → PDP anatomy → High jewelry → Bridal → Appointments → Services → House/heritage → Boutiques → Footer → Account/wishlist → Personalization → Tone → Sources.**

---

### 1.1 Cartier — cartier.com/en-us

**Primary navigation (8 items):** High Jewelry · Jewelry · Watches · Bags and accessories · Fragrances · Home & Stationery · News · La Maison.
Sub-nav: *High Jewelry* → All creations, Latest collections, Markers of Style, Iconic panthère, Living legacy, Exceptional Stones, Know-how. *Jewelry* → All Collections, Bracelets, Rings, Necklaces, Earrings, Engagement rings, Wedding bands, Cartier Jewelry, Advice and services. Collections vs categories are both inside "Jewelry"; services get their own sub-item ("Advice and services"). Utility bar: Search, Wish List, My Cartier, Cart, Find a Boutique, Contact Us, Services, country selector.
Source: https://www.cartier.com/en-us/

**Homepage order (8 sections):** (1) Hero "Endless love" — LOVE Unlimited; (2) featured NEW products with prices; (3) collection carousel (Tank, Roadster, Clash bags, eyewear); (4) eyewear grid; (5) brand story "Dive into Cartier's fauna" (panther); (6) services trio — jewelry services, watchmaking services, appointment booking; (7) shipping / returns / gift-wrap banners; (8) newsletter.
Source: https://www.cartier.com/en-us/

**Collection page (LOVE):** opens with the origin story (New York, 1969, Aldo Cipullo; "freedom to love without limits"), then two "shop the look" modules for new variations ("Endless Love", "An eternal light"), then a grid by piece type (Rings, Bracelets, Necklaces, Earrings) with prices ($2,670–$23,600), size dropdowns, Add to Bag / Discover / Get Notified. A four-column comparison explains the lines (LOVE Unlimited Paved / LOVE Unlimited / LOVE Classic / LOVE Medium). Secondary CTAs: Personalization, jewelry care, related collections (Clash, Juste un Clou, Trinity). Quote: "From the gadroons to the roundness of the screws, each element is spaced differently."
Source: https://www.cartier.com/en-us/love-cartier.html

**PDP anatomy (LOVE Unlimited bracelet, ref. B6094117):** 8 static images (no video, 3D or try-on) → NEW badge → name + reference → price ($21,600 YG / $23,100 WG / $21,600 PG) → metal selector (yellow / white / pink) → closure dropdown (original / single-screw) → size dropdown 14–23 cm + size guide + "Notify when available" → Add to Bag → Add to Wish List → "Contact an ambassador" → "Book an Appointment" → description with specs (18K 750/1000, 7 brilliant-cut diamonds 0.80 ct for size 17, width 7 mm, "specifications vary by size") → complimentary shipping & returns, 30-day exchange → free gift wrapping with greeting card → care/services links → "Related Creations" (same bracelet without diamonds, $9,400). No engraving option on this PDP, no reviews, no financing. Quote: "An expression of Cartier's design vision, this oval bracelet dares to show its screws."
Source: https://www.cartier.com/en-us/jewelry/bracelets/love/love-unlimited-bracelet-flexible-diamonds-CRB6094117.html

**High jewelry:** `/high-jewelry/` is a filterable "All creations" grid of 155 models (24 shown, Load More). Prices are real — fixed ("$42,800", "$234,000") or ranges ("$90,000 – $103,000") — with Discover / Add to Bag; no "price on request" language on the listing. Quote: "Each year, Cartier creates a High Jewelry collection composed of unique pieces." A piece page (Faune et Flore necklace, CRN3109100) shows 6 images, $154,000, 456 diamonds 5.99 ct, and because it is not sold online the CTAs become **"Request Price", "Notify Me", "Contact an ambassador", "Book an Appointment", order by phone 1-800-227-8437**. The Know-how page names the métiers (sculptors, gem-setters, lapidaries, glypticians, polishers, casters), covers movement/suppleness/front-and-back design, glyptics (led by Émilie Marques), transmission, and ends with a "Special orders experience."
Sources: https://www.cartier.com/en-us/high-jewelry/ · https://www.cartier.com/en-us/jewelry/necklaces/cartier-fauna-%26-flora/faune-et-flore-de-cartier-necklace-paved--CRN3109100.html · https://www.cartier.com/en-us/high-jewelry/know-how/

**Bridal:** engagement rings are organized **by collection** (Etincelle, Destinée, 1895 Solitaire, LOVE, Trinity Ruban, Vendôme Louis Cartier) with a stone-shape filter; visible prices $3,350–$3,600 for Etincelle, premium pieces show "Discover" only. "Set For You" is a semi-custom service on a separate site (diamonds.cartier.com): choose diamond + one of ~15 settings + gold; ~3 weeks; GIA report on center stones ≥0.18 ct; from about £2,500 (per trade press). Quote: "All Cartier engagement rings are set by hand in the ateliers." Wedding bands are by collection with filters Her/Him, metal (incl. 3-gold, platinum), paving, **Engraving: Yes**, availability; prices from ~$940; a stacking guide is featured. Quote: "They can also be combined, stacked, and worn on any finger."
Sources: https://www.cartier.com/en-us/jewelry/engagement-rings/ · https://www.cartier.com/en-us/jewelry/wedding-bands/ · https://diamonds.cartier.com/en-us · https://openers.jp/en/watch-and-jewelry/watch-and-jewelry_jewelry-news/QBRU8 · https://thejewelleryeditor.com/jewellery/article/cartier-diamond-engagement-rings-and-set-for-you-engagement-service

**Appointments:** `/rdv-bookings` is an informational landing: "For a prompt and personalized experience, we recommend booking an appointment" and "same-day reservations are not available." Boutique pages carry the same walk-in warning.
Source: https://www.cartier.com/en-us/rdv-bookings

**Services:** `/services.html` groups by product category (Jewelry: day-to-day care, repairs/maintenance, resizing; Watches: care, personalization, refurbishment, warranty; etc.), plus engraving, appointments, Cartier Care 8-year warranty extension, order tracking, complimentary delivery, returns, gift wrapping. Layout per category: banner → intro → three service cards. The jewelry "Advice and services" hub lists day-to-day advice, services, size guide. Personalization page: initials or a date engraved on jewelry/watches; hot stamping on leather; no online configurator — call or visit. Quote: "The Maison will work with you through time to preserve the beauty of your creation."
Sources: https://www.cartier.com/en-us/services.html · https://www.cartier.com/en-us/jewelry/advice-and-services/ · https://www.cartier.com/en-us/personalization-services.html

**La Maison:** three pillars — *The Story* (Living Heritage, L'Odyssée de Cartier), *Savoir-Faire & Transmission* (Métiers d'Art, Savoir-Faire, Cartier Institutes), *Commitments* (Art and Culture, Society & Communities).
Source: https://www.cartier.com/en-us/la-maison/

**Boutiques:** locator on `stores.cartier.com` with radius, store type (boutique / authorized dealer / pre-owned / cruise ships), product & service filters, list/map. Boutique page (Atlanta, Phipps Plaza): name → address → hours → phone → **Book an Appointment with walk-in wait warning** → services (Care Service & Watchmaking, Embossing, Set For You) → categories available (Jewelry, Leather Goods, Fragrance, Bridal, Eyewear…) → photo → "About" Maison blurb → what3words + Uber integration.
Sources: https://stores.cartier.com/en_us/search?category=storeLocatorSearch · https://stores.cartier.com/united-states/ga/atlanta/3500-peachtree-road

**Footer:** Customer Care (Contact, phone, FAQ, order tracking, Appointments, Accessibility, Sitemap) · Our Company (Store locator, Careers, CSR, Credits) · Legal (8 items incl. Human Rights Statement) · Social + Women's Initiative, Philanthropy, Fondation Cartier.
Source: https://www.cartier.com/en-us/

**Account/wishlist:** Wish List and "My Cartier" in the utility bar; PDP has Add to Wish List.

---

### 1.2 Van Cleef & Arpels — vancleefarpels.com/us/en

**Primary navigation (rendered DOM):** the header exposes piece-type categories (Necklaces and pendants, Bracelets, Rings, Earrings) and named collections (Alhambra®, Perlée®, Frivole®, Fauna) plus a "Find your luck" feature link. The footer site-map gives the full tree: High Jewelry (Classic High Jewelry) · Jewelry (Alhambra, Perlée, Frivole) · Engagement · Watches (Poetic Complication) · Fragrances · The Maison (Our Know How, Timeline) · All Stores. Utility: phone (+1-888-795-2533), My Account, "Contact the Maison's Client Advisors", Cart, Search, location/currency.
Source: https://www.vancleefarpels.com/us/en/home.html (DOM dump)

**Homepage order (≈11 sections):** (1) "The curtain rises on Ballet Précieux" — High Jewelry + dance hero, CTA "ADMIRE THEIR GRACE"; (2) product carousel with prices ($149,000 watch … $1,460 wedding band); (3) Dance Reflections initiative; (4) "A long-standing inspiration" (dance) — CTA "MAKE A PAS DE DEUX"; (5) Perlée "In the air with Perlée"; (6) boutiques "Paris, Tokyo, New York… Open the doors of our boutiques — AFTER YOU"; (7) "Enchanting gifts"; (8) "Our creations" category tiles (Necklaces… Clips, Cufflinks); (9) Newsroom; (10) complimentary delivery/returns + "Contact a client advisor" phone; (11) "Our services offered — Personalize, adjust or revive your creations."
Source: https://www.vancleefarpels.com/us/en/home.html

**Collection page (Alhambra):** an **editorial story page, not a grid** — the new translucent-pink enamel pieces, the "gold-ruby" 17th-century technique, "several years of research" in the enamel workshops, press-and-hold media, repeated "Discover creations" links, then sibling collections (Perlée, Flora, Fauna, Zodiaque, Bouton d'or, Between the Finger Rings). Products live in a separate e-boutique category tree (`/e-boutique/category/necklaces-and-pendants.html`) with a short editorial intro ("the iconic Alhambra® model created in 1968").
Sources: https://www.vancleefarpels.com/us/en/collections/jewelry/alhambra.html · https://www.vancleefarpels.com/us/en/e-boutique/category/necklaces-and-pendants.html

**PDP anatomy (Vintage Alhambra bracelet, 5 motifs, VCARA41500):** breadcrumb "Alhambra · Bracelets" → name → "18K white gold, Diamond" → Wishlist → reference → Product details → **$35,900 "Excluding taxes"** → story paragraph (1968, four-leaf clover, "symbol of luck") → "Discover the stone: Diamond" → All variations / "Discover more stones" / 18K yellow gold variant → "What is the size of the motif?" → Add to Bag → **Order by phone** → "Complimentary returns for online orders within 30 days" → Contact the Maison's Client Advisors → Book an appointment → accordions: Delivery and payments / Care & services / Gift wrapping → swipe gallery (75 images incl. 2 videos) → "The Maison's icon of luck…" → **"COMPLETE SET"** (necklace $68,500, long necklace $133,000, earrings $15,600, pendant $9,100, ring $8,150, each "+N stone variations") → "Explore other creations". No engraving on PDP, no reviews, no financing, no 3D.
Source: https://www.vancleefarpels.com/us/en/collections/jewelry/alhambra/vcara41500---vintage-alhambra-bracelet-5-motifs.html

**High jewelry:** four strata on one hub — *Classic High Jewelry* (Snowflake, Flowerlace®, Folie des Prés™, À Cheval, Palmyre, Olympia), *Thematic collections* ("a retrospective": Fascinating Egypt, Treasure Island, Le Grand Tour, Legend of diamonds, Sous les étoiles, Romeo & Juliet…), *Signature collections* (Zip, Flowers, Ludo, Liane, Butterflies…), *Pierres de Caractère™*, and a **Heritage collection** of archive-certified vintage pieces by decade, "available for sale… contact our client advisors or follow @vcaheritage on Instagram." No prices anywhere in HJ. Quote: "Each meticulously selected stone is chosen for its exceptional quality and the emotion it carries."
Sources: https://www.vancleefarpels.com/us/en/collections/high-jewelry.html · https://www.vancleefarpels.com/us/en/collections/high-jewelry/the-heritage-collection.html

**Bridal:** "Solitaires and Wedding bands" hub rooted in the founders' 1895 marriage; tiles: Solitaires and Engagement rings · Wedding bands · High Jewelry Solitaires · **Your Poetic Setting® — Personalize your ring** · Diamond sets · Watches. Poetic Setting = pick a diamond onto one of six house settings (Icône, Romance, Bonheur, Couture, Estelle, Perlée); the Maison only accepts D–F color, IF–VVS clarity, Excellent/Very Good cut; center stones 0.3–3 ct; pavé checked under 10x loupe. Quote: "The jewelry creations lend themselves to the celebration of special occasions."
Sources: https://www.vancleefarpels.com/us/en/collections/engagement.html · https://www.vancleefarpels.com/us/en/collection/your-poetic-setting.html

**Appointments:** a four-step on-site form — (1) Select a boutique (country → state → city; 27 US results incl. Neiman Marcus shop-in-shops) → (2) Purpose of your visit → (3) Date, available time, preferred language, comments → (4) Title, name, notify by email/mobile, place of residence.
Source: https://www.vancleefarpels.com/us/en/in-store-appointment.html

**Services ("Care & Services"):** quick actions *Engrave my ring · Adjust my bracelet · Request a repair · Browse care advice*; service cards: Size adjustment, Customization (engraving; strap change), Maintenance and repair, **Authentication and Valuation**; "Do you have an ongoing service? CHECK ITS STATUS"; care advice (Daily wear, Creation care, Storage, Cleaning); request a service online/phone/boutique; FAQ (sizes, can my piece be engraved, adjustment cost/time).
Source: https://www.vancleefarpels.com/us/en/care-and-services.html

**The Maison:** "A Maison born of a marriage" (1906, Place Vendôme) → *The inspirations* (8 themes: Nature, Couture, Dance, Luck, Stories and legends, Astronomy, The Elsewhere, Love) → *The stone expertise* → *The savoir-faire* (Mystery Set, patented 1933; "STEP INTO THE WORKSHOPS") → *The collections* → *Initiatives* (L'ÉCOLE School of Jewelry Arts, de Mains en mains, Dance Reflections) → Collection / Heritage Gallery / Exhibitions / Newsroom / Articles / Timeline / Join us. Timeline is by decade from "Origins."
Sources: https://www.vancleefarpels.com/us/en/the-maison.html · https://www.vancleefarpels.com/us/en/the-maison/timeline.html

**Boutiques:** world list by country; boutique page (Atlanta – Neiman Marcus): open/closed status → 5-photo slider → Book an appointment → "Open the doors of our boutique…" → address + directions → phone → hours by day → **"Services are including: Engraving, Adjustment, Shining"** → "This boutique speaks: English."
Sources: https://www.vancleefarpels.com/us/en/store-boutique-list.html · https://www.vancleefarpels.com/us/en/boutique-detailed-page/atlanta-neiman-marcus.html

**Footer:** Contact us · Join us · Services · FAQ · Dance Reflections · L'ÉCOLE · social (5) · Legal, Privacy, California, Do-not-sell, Human Rights Statement (Richemont PDF), Conditions of Sale, CSR policy · full collection/Maison/stores site map.
Source: DOM dump of https://www.vancleefarpels.com/us/en/home.html

---

### 1.3 Harry Winston — harrywinston.com/en

**Primary navigation (7 items):** The House · High Jewelry · Fine Jewelry · Engagement and Bridal · Watches · Accessories · Services. Note *The House* is first. Sub-nav: *The House* → King of Diamonds, The History of the House, Rare Jewels of the World, Archives, Jeweler to the Stars, News & Events, Our Stones, Our Craftsmanship, Our Design, Watchmaking and Métiers d'Art. *High Jewelry* → named collections (Talk to Me, Marvelous Creations, Majestic Escapes, New York, The Incredibles, Winston Icons, Legacy). *Fine Jewelry* → ten named collections (Sunflower, Forget-Me-Not, Lily Cluster, Winston Cluster, Classics, Sparkling Cluster, HW Logo, Winston Candy, Diamond Loop, Winston Gates) + categories (Necklaces, Rings, Earrings, Bracelets, Charms). *Engagement & Bridal* → Engagement Rings, Wedding Bands, Wedding Day Jewels, Bridal Guide, "From Our Hands to Yours." Utility: Search, Salon Locator, Schedule an Appointment, Request Assistance, Explore Catalogs, language. **No cart, no wishlist.**
Source: https://www.harrywinston.com/en

**Homepage order (8 sections):** HJ hero (Majestic Escapes) → "Crafted for a Lifetime of Love" engagement → bridal hub cards (Bridal Guide / Engagement / Wedding) → Emerald collection → "Rare Jewels of the World" → fine jewelry + watch collection cards → "Find My Harry Winston" salon locator → newsletter.
Source: https://www.harrywinston.com/en

**Fine jewelry hub:** collections first (visual cards with copy + Explore), then categories; **no prices**; "Find a Salon" + appointment CTAs, newsletter mid-page.
Source: https://www.harrywinston.com/en/fine-jewelry

**Collection page (Sunflower):** story (Mr. Winston's love of nature, 1950s motif, "eight perfectly matched stones surround a single vibrant center stone", "Handcrafted in the heart of New York City"); product grid is JS-rendered (fetched HTML shows "No results were found"); CTAs Find a Salon, Schedule an Appointment.
Source: https://www.harrywinston.com/en/products/sunflower-by-harry-winston

**PDP anatomy (Classic Winston pear engagement ring, RGDPPS010TB):** 4 images (front, side, angle, on-model), no video/3D → name + ref → **"Starting from $22,000"** with footnote that price varies by carat/color/clarity → carat-weight dropdown (from 1.0 ct; larger by request) → no metal selector (platinum only) → no engraving → **"Schedule An Appointment" + "Request Assistance"** (no Add to Bag) → description → "Sculpted For Light and Beauty" carousel → related Classic Winston styles (3) → newsletter → salon locator. No shipping/returns, reviews, financing, care sections. Platinum wedding band page: 10-slide carousel, "Starting from $1,300", width options 2–6 mm, "Harry Winston Suggests" (3). Quotes: "No two diamonds are alike." / "Wedding vows are precious, cherished, everlasting."
Sources: https://www.harrywinston.com/en/products/classic-winston/classic-winston-pear-shaped-engagement-ring-with-tapered-baguette-side-stones · https://www.harrywinston.com/en/products/classic-bands-by-harry-winston/platinum-wedding-band-wbnsppl4bp

**High jewelry:** hub of nine collection cards (Majestic Escapes, Winston Icons, The Incredibles, New York, Legacy, Talk to Me, Marvelous Creations, Hope, Royal Adornments) with Discover/Explore; no individual pieces or prices on the hub. Quote: "One-of-a-kind jewels with D- color, internally flawless diamond center stones."
Source: https://www.harrywinston.com/en/high-jewelry

**Bridal:** engagement rings in platinum by cut; **"inquire" model — no prices on listing, no builder**; Winston Bridal Guide covers the 4Cs plus a "5th C: Character," craftsmanship, integrity/leadership; CTAs Explore rings/bands/wedding-day jewels, View Bridal Catalog, Find a Salon, Schedule. Quote: "Only the very best diamonds are accepted. There are no exceptions."
Sources: https://www.harrywinston.com/en/fine-jewelry/engagement-rings · https://www.harrywinston.com/en/engagement-and-bridal/bridal-guide

**Appointments:** one form — country/region → salon → date + 15-minute time slots → title/name/email/phone → interest (Bridal Jewelry or Timepieces) → preferred contact method → newsletter opt-in → privacy. "If you're unable to select certain dates, kindly contact the Harry Winston Salon directly by phone."
Source: https://www.harrywinston.com/en/services/schedule-an-appointment

**Services:** Client Services (Schedule an Appointment, Request Assistance, Subscribe) + Support (Watch Warranty, Product Care, FAQ, Catalogs, Salon Locator). Repairs/engraving/bespoke are not listed as discrete services — they route through "Request Assistance." Quote: "A dedicated Harry Winston Client Services expert looks forward to providing you with the ultimate personalized experience."
Source: https://www.harrywinston.com/en/services

**The House:** founding statement (1932, NYC) → History & Heritage (six stories) → Expertise (four topics) → salon locator + newsletter. Craftsmanship page: artisans "working exclusively for Harry Winston for over 40 years," two NYC workshops (2,700 sq ft flagship redesigned 2012; 16,500 sq ft Diamond District), "traditional techniques with high-tech manufacturing." Quote: "Having once owned more than one-third of the world's most famous gems, Harry Winston was known as the 'King of Diamonds.'"
Sources: https://www.harrywinston.com/en/the-house · https://www.harrywinston.com/en/the-house/our-craftsmanship

**Salons:** locator filters by area/country/city and salon vs authorized retailer; salons are "by appointment" destinations (the Dallas salon opened inside a hotel suite, "open to guests and the public by appointment only").
Sources: https://www.harrywinston.com/en/locations · https://jckonline.com/?p=38228

**Footer:** Services (Schedule Appointment, Request Assistance, Newsletters, Catalogs) · Corporate (Careers, Philanthropy) · Legal (Terms, Privacy, Cookie, Supply Chain, Accessibility) · Social (10 incl. WeChat, LINE, Weibo).
Source: https://www.harrywinston.com/en

---

### 1.4 Tiffany & Co. — tiffany.com

**Primary navigation (rendered DOM):** Gifts · Jewelry · High Jewelry · Love & Celebration (Engagement) · Watches · (plus Home & Accessories / Men's categories reachable from the mega-menu). *Jewelry* mega-menu = three logics side by side: categories (Necklaces & Pendants, Bracelets, Earrings, Rings, Brooches), materials (Gold, Silver, Mixed Metal), merch (Tiffany Icons, Men's, New, Most Popular, price buckets Under 500/750/1500) and **named collections** (HardWear, Knot, T, Lock, Bird on a Rock, Sixteen Stone, Elsa Peretti, Return to Tiffany, Titan by Pharrell, Paloma Picasso, "All Jewelry Collections"). *High Jewelry* → Blue Book 2023–2026 (each a named chapter), A Curated Selection, The Tiffany Diamond, Legendary Acquisitions, education (Tiffany Diamonds, Colored Gemstones, Schlumberger, Bird on a Rock, HJ watches). *Love & Celebration* → Engagement Rings by collection (The Tiffany® Setting, True, Forever, Soleste, Sixteen Stone) and by shape (round, oval, emerald, princess, cushion, pear), Guide to Diamonds, wedding bands (women's/men's/couples/eternity), style guides, "Tiffany Difference" (diamond provenance, a lifetime of service, engagement-ring customization), "Book Your Appointment." Utility: search, stores, account, cart, Contact Us.
Source: DOM dump of https://www.tiffany.com/

**Homepage order (7 sections):** (1) "New In: HardWear" hero — "Drawing on a design from 1962"; (2) product carousel (HardWear, T, Knot); (3) Shop by Category; (4) Icon Collections — "For 189 years…"; (5) Most Popular; (6) **The Tiffany Experience**: Book an Appointment (in-store or virtual), Personalization ("bespoke engraving"), Contact Us; (7) footer.
Source: https://www.tiffany.com/

**Collection page (Tiffany T):** short story ("A homage to an iconic motif from 1975… the spirit of New York"), 191-product grid with prices, "Must-Have" badges, and a **"Behind the Design — Explore the story" tile inserted into the grid**.
Source: https://www.tiffany.com/designers-collections/tiffany-t/

**PDP anatomy (Tiffany T Smile pendant, small, $1,400):** gallery 1/6 (+1 video) → collection + name → price → metal swatches (18k rose / white / yellow) → ADD TO CART → **"Contact a client advisor or book an appointment"** (Contact your advisor / Book an appointment) → **Find in Store** → story paragraph → specs (18k yellow gold, size small, 16–18" adjustable chain) + "More details" → Save → accordions: Blue Box (sustainability of packaging), Complimentary Shipping & Returns, Ask a Client Advisor, Responsibly Sourced, Size Guide, Visit a Store → "Behind the Design" → SEO-style FAQ block ("Are layering necklaces in style in 2026?" …). No engraving option, no reviews, no financing, no 3D on this PDP.
Source: https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-t-18k-yellow-gold-necklaces-pendants-1364371976.html

**Engagement PDP (Sixteen Stone solitaire):** "2 CT Pictured" → name → BOOK AN APPOINTMENT → "Need a Tiffany Diamond Expert?" → story → phone → an inline **diamond selector** (buttons for Color, Clarity VS2–VVS1, carat range "2.00CT–2.24CT", origin "USA", "Select this diamond") with "Notify me at launch" for the new design → story modules (Textiles Transformed / Perfect Proportions / A Symbol of Care) → "Ask a Tiffany Diamond Expert — Book a virtual appointment" → the same six accordions → Discover More. Engagement PLP shows 52 products with **"Starting from $1,650"** pricing and "View Details" where a price is withheld; the Tiffany Setting PLP adds "Shop 1 carat / 2 carat," shapes, and education tiles (Guide to Diamonds, Styles and Settings, Diamond Craftsmanship, Diamond Shapes).
Sources: https://www.tiffany.com/engagement/engagement-rings/schlumberger-16-stone-platinum-and-18k-yellow-gold-diamond-engagement-rings-17186626.html · https://www.tiffany.com/engagement/ · https://www.tiffany.com/engagement/engagement-rings/tiffany-setting/

**High jewelry:** hub opens "As the first American high jewelry house…"; introduces Blue Book 2026: Hidden Garden; sections on Jean Schlumberger, HJ watches, The Tiffany Diamond (128.54 ct), Legendary Acquisitions (7,500-ct kunzite), Tiffany Diamonds, Colored Gemstones; ends with **"Get Help from a Tiffany High Jewelry Expert"** (phone + diamondspecialist@ email). The Blue Book page is a chaptered story (Butterfly, Jasmine, Monarch, Bird on a Rock, Palm, Twin Bud, Paradise Bird) with a 47-second film and gemstone provenance (padparadscha, Mozambique rubies, Zambian emeralds) — **no prices, no cart**. A separate "Curated Selection" PLP sells nine Schlumberger pieces with real prices ($90,000–$500,000) and "View Details" for one.
Sources: https://www.tiffany.com/high-jewelry.html · https://www.tiffany.com/high-jewelry/blue-book/2026-hidden-garden.html · https://www.tiffany.com/jewelry/high-jewelry/

**Appointments / consultation:** "Speak With a Tiffany Diamond Expert" — Call (1-800-518-5555), Book an Appointment, Book a Virtual Appointment, Chat; plus links to Guide to Diamonds, A Lifetime of Care, Responsible Sourcing. The store locator FAQ confirms virtual appointments are chosen via a "Virtual tab after selecting your store."
Sources: https://www.tiffany.com/client-services/schedule-consultation.html · https://www.tiffany.com/stores/

**Services:** *Personalization* — "Some objects you own, others you define." Names/initials/dates/custom motif on jewelry, watches, accessories, leather, textiles, crystal, Blue Boxes; hand-engraving heritage; online personalization only on a limited selection, otherwise contact/appointment/store. *Care & Repair* — care by material (gold/platinum, watches, gemstones/pearls, silver), "Request a Service" (cleaning, polishing, fit alterations), book in-store or virtual, or mail-in via service request form. *Tiffany Ring Studio* — "Designed by You. Crafted by Tiffany." Customization happens **with a Diamond Expert in an appointment** (shapes, settings, metals), plus engraving and Blue Box personalization.
Sources: https://www.tiffany.com/client-services/personalization.html · https://www.tiffany.com/client-services/care-and-repair.html · https://www.tiffany.com/engagement/tiffany-difference/engagement-ring-customization.html

**World of Tiffany (heritage):** 1837 founding → "An Iconic Heritage" timeline → The Diamond Kings (first Tiffany® Setting 1886) → The Blue Box → A Legacy of Gemstone Discovery → Designers of Note (Peretti, Schlumberger, Picasso) → The Magical Windows → Our Latest Stores → Shop by Category.
Source: https://www.tiffany.com/world-of-tiffany/heritage.html

**Stores:** locator lists 87 stores with open-until status, distance, Get Directions, **Book an Appointment on every card**, "Flagship" labels; FAQ block. Store page (Nashville – Green Hills): status → BOOK AN APPOINTMENT → "Services available +3" → address/phone → hours → "The Tiffany Experience" carousel (Engagement Ring Consultation, Jewelry & Gift Engraving, Jewelry Cleaning & Repair, Speak with a Diamond Expert) → **"All Services at …"** list (Cleaning & Repair, Engraving, Leather Embossing, Personal Shopping, Watch Repair & Sales, Online Appointment, Glass & Crystal Etching, In-Store Pick-up) → Book an Appointment → More to Explore categories.
Sources: https://www.tiffany.com/stores/ · https://www.tiffany.com/stores/en/united-states/nashville-the-mall-at-green-hills-121

**Footer:** Track Your Order, Contact Us, FAQ, Shipping & Return Policy, Store Information, Store List, Site Index, Gift Card, Jewelry Gift Guide, Contact a Tiffany Diamond Expert, Request Repair, Personalization, Business Accounts, **Tiffany Select Financing**, Alertline, Sustainability, Tiffany & Co Foundation, Careers, Press, Privacy/Terms/Accessibility/California/Human Rights/LVMH charter/Product Safety, social.
Source: DOM dump of https://www.tiffany.com/

---

### 1.5 Graff — graff.com/us-en

**Primary navigation (7 items):** High Jewelry · Jewelry · Engagement & Bridal · Watches · Fragrance · Gifts · The House. *Jewelry* → "Shop By Collection": Laurence Graff Signature, Butterfly, Wild Flower, Tilda's Bow, Classic Graff, Icon, Spiral, Foufou, Threads, Be Together, Follow Me, View All. *Engagement & Bridal* → Engagement Rings by **setting family** (Promise, Icon, Paragon, Flame, Legacy, Constellation, Laurence Graff Signature). *Gifts* → Gifts for Her/Him, Ultimate, Classic, Anniversary, Contemporary, Iconic, Couples. Utility: phone, WhatsApp, Client Services, Boutiques, Wishlist, Sign In/Register, Cart; search suggests "engagement ring / cross / eternity ring"; the mega-menu even lists three US boutiques (New York Madison, Chicago Oak St, Palm Beach Worth Ave) with "View All Boutiques."
Source: DOM dump of https://www.graff.com/us-en/home/

**Homepage order (5 sections):** (1) alternating hero — Butterfly "Diamonds Take Flight" / "Say yes with Graff — For the beginning of forever," each with **SHOP NOW + DISCOVER THE STORY**; (2) "A World of Diamonds" product carousel (Butterfly, Tilda's Bow); (3) three pillars — Unmistakably Graff, Diamond Jewelry, Engagement & Bridal ("Artisanal in every sense of the word, with no two the same"); (4) "The House of Graff — Featured": Crafting an Icon, Book an Appointment, Unique Solitaires.
Source: https://www.graff.com/us-en/home/

**Collection page (Butterfly):** one-line story ("Diamonds in Flight"), 106 products with fixed prices, **"3D" badges on product cards**, filters, "See more," and a Book an Appointment + Contact Graff pair at the bottom.
Source: https://www.graff.com/us-en/jewellery-collections/view-by-collection/butterfly/

**PDP anatomy (Promise emerald-cut engagement ring, ET01ALL):** breadcrumb Engagement Rings / Promise → name → "Baguette cut side stones, platinum" → **"From $6,800 (Excl. taxes)"** → Size Chart → **ENGRAVE YOUR RING** → **SELECT YOUR DIAMOND** (expands inline to a list of 18 certified stones, each with carats / colour / clarity / price / size and its own Add to Bag: 0.60 ct G VVS1 $6,800 … 1.01 ct G VS1 $18,000 … 3.69 ct F FL $230,000; filter options) → "Interest-free monthly payments available with Splitit" → accordions Details & Care / Size & Fit / Delivery & Returns → **ENQUIRE / APPOINTMENT BOOKING / ORDER BY PHONE** → description ("A member of the Graff family personally selects each stone…") → spec chips (Emerald Cut, White Diamond, Platinum) → "Discover Diamond Brilliance: A Guide to the 4Cs" → "Complete the Collection — Most Popular" (bands, earrings with 3D badges). 3D viewer + video present; no reviews. Engagement search results show "from $X", fixed prices for yellow-diamond pieces, and **"Price on application"** for the Legacy setting.
Sources: https://www.graff.com/us-en/engagement-bridal/engagement/engagement-rings/promise/promise-emerald-cut-diamond-engagement-ring/ET01ALL_ET01ALL.html · https://www.graff.com/us-en/search/?q=engagement%20ring

**High jewelry:** "The Most Fabulous Jewels in the World" hub organized **by stone** (Yellow Diamond "Golden Light," Sapphire "Magnetic Power," White Diamond "Enduring Treasures," Emerald "Verdant Splendour") plus Unique Creations, Ruby, Unique Solitaires. Unique pieces are told as long-form making-of chapters (gouache painting → 3D scanning of each stone → CAD → hand setting) with carat weights and a Laurence Graff quote; no prices, no cart.
Sources: https://www.graff.com/us-en/high-jewellery.html · https://www.graff.com/us-en/high-jewellery/unique-timepieces.html

**Bridal hub:** "The Most Romantic Jewels in the World" → Engagement Rings / Wedding Bands / Bridal Jewelry tiles → Book an Appointment → Bridal Guides ("At Graff, everything begins with the diamond. Discover the Graff Difference").
Source: https://www.graff.com/us-en/engagement-bridal.html

**Appointments & boutiques:** `/book-an-appointment.html` embeds an "Online Appointment" widget (no visible form text). Boutique page (New York, Madison Avenue): "FLAGSHIP STORE," **a named private-appointment contact with direct phone and email**, address, client-services email, hours by day, CONTACT BOUTIQUE / REQUEST AN APPOINTMENT. Store list is alphabetical by country with full addresses.
Sources: https://www.graff.com/us-en/book-an-appointment.html · https://www.graff.com/us-en/store-detail/new-york-madison-avenue · https://www.graff.com/us-en/store-list/

**Client Services:** FAQ, Delivery & Returns, Size Guide, Privacy, Terms of Sale, Contact (call, WhatsApp, email), Book an Appointment, Visit Us.
Source: https://www.graff.com/us-en/Client-Services-Landing.html

**The House:** "Home to the most fabulous jewels in the world" — 1960, London, Laurence Graff OBE; This is Graff ("No stage is bypassed. No shortcuts are taken. Only perfection matters."); Beginnings; Creating Diamond History (a dated ledger of famous stones 2010–2021 with carat weights, e.g. the 302.37 ct Graff Lesedi La Rona); News & Features; Delaire Graff Estate; Facet Foundation.
Sources: https://www.graff.com/us-en/house.html · https://www.graff.com/us-en/house/heritage/rarity.html

**Footer:** Client Services, Book an Appointment, Contact Us, Size Guide, Privacy, Terms, Cookie, Anti-slavery, Accessibility, This is Graff, Find a Boutique, Delaire Graff Estate, Facet Foundation, social (3).
Source: DOM dump of https://www.graff.com/us-en/home/

---

### 1.6 Boucheron — boucheron.com/int_en (US page 404s; international-English used)

**Primary navigation (4 items):** High Jewelry · Jewelry · Watches · Our Maison. Utility: Saved items, Account (My orders, Saved items, My cart, Personal information, Addresses), Search, region/language.
Source: https://www.boucheron.com/int_en/

**Homepage order (5 sections):** Lierre de Paris campaign — "Where you least expect it. Standing the test of time." → four featured pieces → "let your style climb" (Creative Director) → more pieces (necklace, ear clips, two-finger ring, brooch) → "our services — Discover our services."
Source: https://www.boucheron.com/int_en/

**Collection page (Quatre):** hero → story ("In 2004, it all began with a ring. Four seemingly contrasting archival motifs…") → seven edition cards (Classique, Blue, White, Red, Black, Radiant, Double White) → product grid by category with counts (71 rings, 39 necklaces, 27 earrings, 23 bracelets, 1 hair jewel), filters (category, metal, availability), sort by price — yet **every item reads "Price on demand."** The Nature hub (Lierre de Paris, Plume de Paon…) works the same way, and the Lierre de Paris campaign page is a video-led editorial with Claire Choisne styling pieces, eight pieces "Price on demand," Find a store, Book an appointment.
Sources: https://www.boucheron.com/int_en/jewelry/jewelry-collection/quatre.html · https://www.boucheron.com/int_en/jewelry/jewelry-collection/nature.html · https://www.boucheron.com/int_en/lierre-de-paris-naturally-free

**PDP anatomy (Quatre Classique small ring, JRG00627):** 10 images + **3D view** → name + reference → **"Price on demand"** → 9 edition variants → sizes 44–75 + "choose my Quatre ring" size guide → **"Contact us" as the primary CTA (no add-to-cart)** → Saved items → description → details (collection history) → Shipping & returns link → "Taking care of your creation" → 6 related pieces. No engraving, no reviews.
Source: https://www.boucheron.com/int_en/quatre-classique-small-ring-classique-jrg00627.html

**High jewelry:** hub with two programs — *Histoire de Style* (annual archive-driven chapters: 2024 "The Power of Couture" 24 pieces; 2025 "Untamed Nature" 28; 2026 "Nom: Boucheron, Prénom: Frédéric" 4 pieces) and *Carte Blanche* (Design Studio's free theme). Pieces are not itemized on the hub. "Special order" (bespoke) lives in the footer. Quote: "Creativity and innovation are used to forge emotion."
Sources: https://www.boucheron.com/int_en/high-jewelry/ · https://www.boucheron.com/int_en/high-jewelry/collections-histoire-de-style

**Bridal:** no dedicated bridal nav item on the international site (the Quatre collection and wedding bands sit inside Jewelry).

**Appointments:** two steps — Meeting details (country from a list of 14 → boutique → date → hour slot, required) → Contact information via **account login/creation so the client advisor can see your saved selection**. "To best enjoy the Boucheron experience, we invite you to…"
Source: https://www.boucheron.com/int_en/book-an-appointment

**Services:** Contact (live chat, phone, email) → Size guide → FAQ → Prepare in-store visit → Book appointment → Store locator → After-sales → Newsletter → **Special orders** ("We guide you in creating the design of your dreams") → **Authentication service**.
Source: https://www.boucheron.com/int_en/services

**Our Maison:** four pillars — The Family Spirit, The Freedom to Create, The Sense of Style, Our Commitments/Sustainability; told through 26 Place Vendôme and the house cat Wladimir; "Icons cannot be created; they are forged over time." Savoir-faire and care instructions sit under Our Maison.
Source: https://www.boucheron.com/int_en/our-maison/

**Footer:** Need help (Size guide, Shipping & returns, FAQ) · Contact us (Hours, Live chat, Phone, Email) · Book an appointment (Prepare visit, Store locator, Wishlist prep) · Boucheron & you (Special order) · Your creation (Care instructions, After-sales service) · Information (Legal, policies, ethics, Careers, Press, Site map). Tagline "Paris depuis 1858."
Source: https://www.boucheron.com/int_en/

---

### 1.7 Bulgari — bulgari.com/en-us

**Primary navigation (rendered DOM):** Jewelry · Watches · Bags & accessories · Fragrances · Gifts · High Jewelry (→ Eclettica) · Maison/world items · Contact & Appointments · Services · Store Locator · Hotels & Resorts. *Jewelry* → categories (Rings, Necklaces, Bracelets, Earrings, **Engagement & Wedding**, Discover All) and collections (Serpenti, B.zero1, Divas' Dream, Bvlgari Tubogas, Bvlgari Bvlgari, Eternal, Colors, Save the Children, Other). *Gifts* → New Arrivals, For Her, For Him, **Personalized Gifts**, Essentials. Maison/world: Serpenti Infinito (experience), Hospitality, Bvlgari Arte, Fondazione, ESG, People & Careers, Stories, **Artsmanship**, 140 Years of Creations, Heritage Collection, Iconic Creations.
Source: DOM dump of https://www.bulgari.com/en-us/

**Homepage order (4 sections):** "Serpenti Infinito New York" hero (art installation on the High Line; SHOP NOW) → "An Icon of Transformation" Serpenti carousel with **"Virtual try-on"** and "New" badges (SHOP SERPENTI) → "START THE EXPERIENCE" → "Serpenti Meets the City" (artwork auruBOROS).
Source: https://www.bulgari.com/en-us/

**Collection page (Serpenti):** a straight PLP of 110 products with prices and badges — "New," **"Customize It,"** "Virtual try-on," "Must-have" — with category tiles (Necklaces / Bracelets DISCOVER) interleaved in the grid. B.zero1 is identical, with a "Gold meets steel" story tile. An "Icons" page lists the five icons (Serpenti, Octo, B.zero1, Tubogas, Bvlgari Bvlgari).
Sources: https://www.bulgari.com/en-us/jewelry/serpenti · https://www.bulgari.com/en-us/jewelry/b-zero1 · https://www.bulgari.com/en-us/bvlgari-icons

**PDP anatomy (Serpenti Viper bracelet, BR860038):** breadcrumb Jewelry / Bracelets → **"3D" + "View more images" + "Virtual try-on"** → name → "Rose gold | Diamonds" → $13,700 "Excluding Taxes" → Size → ADD TO SHOPPING BAG → Product details → **Send as a Gift** → **Book a virtual appointment** → **Find in store** → description → accordions Payment Methods / Shipping and Returns / **Signature Box** / FAQ → "Related creations" ladder ($13,700 → $85,000). Engraving referenced; no reviews, no financing.
Source: https://www.bulgari.com/en-us/BR860038.html

**High jewelry (Eclettica):** "an unprecedented selection of one-of-a-kind masterpieces" organized by art discipline — Painting / Sculpture / Architecture — with "Tap on any content to discover more" tiles and a **"Contact an expert" form** (email, name, country). No prices.
Source: https://www.bulgari.com/en-us/collection/high-jewellery/eclettica

**Bridal:** "The Bvlgari Bridal Collection" banner → 27-product PLP (Infinito, Marryme, Fedi bands $820–$6,150; B.zero1 and Serpenti rings) with "Customize It" badges and **service tiles woven into the grid**: "Make a unique gift," "Find your ring size," "A special engraving," "Book an appointment."
Source: https://www.bulgari.com/en-us/engagement-and-wedding

**Services:** "At Bvlgari, service is a matter of care." Cards: Book an appointment (boutique or "from the comfort of your own home"), Personalization (hot stamping, engraving), Care/wear/repair, The art of gifting, FAQ, Order information. The Personalized Gifts PLP ends with "Our services for you": Engraving, Hotstamping, FAQ, Find a store, Click & Collect, Expert advice, Book an appointment.
Sources: https://www.bulgari.com/en-us/services-experience · https://www.bulgari.com/en-us/gifts/customized-gifts

**Heritage / craft:** history timeline by decade 1884→2020; "From Craftsmanship to Artsmanship — Artisans with an Artistic Soul" (Art of Color documentary in Jaipur, Tubogas/Serpenti techniques, "more than 140 years").
Sources: https://www.bulgari.com/en-us/bvlgari-history · https://www.bulgari.com/en-us/artsmanship

**Stores:** locator with 62 US entries: status ("Closed – Opens at 11:00 AM Friday," "Opening soon – 10/26/2026"), address, phone, directions, "Products available in this store."
Source: https://www.bulgari.com/en-us/storelocator/

**Footer:** Discover more (history) · Store locator · Contact & Appointments · Book an appointment · Order information · Services · Returns and exchanges · Track your order · FAQ · Brand protection · Compliance and sustainability · People & Careers · Accessibility · Fondazione Bvlgari · Privacy center · Terms · Sitemap · social (5).
Source: DOM dump of https://www.bulgari.com/en-us/

---

### 1.8 David Yurman — davidyurman.com

**Primary navigation (7 items):** Women's · Men's · Gifts · Collections · Wedding · High Jewelry · World of Yurman. *Women's* → categories, Materials (YG, silver, RG, WG, mixed), Featured (New In, Most Loved, Chains + Charms, Gifts, Collections), Featured Collections. *Gifts* → by recipient, occasion, price, and **Services** (Book Appointment, Shipping, Returns, Gift Cards, Packaging, BOPIS). *Collections* → Sculpted Cable, DY Madison®, Chevron, Curb Chain. *Wedding* → Engagement (rings, shapes), Wedding Bands (her/him), Crafted With Love (Artistry, DY Diamonds, Signature Cut). *High Jewelry* → Spirit of New York, Beauty of Nature, Classical Motifs. *World of Yurman* → About Us, An Artist's Story, Our Values, Charitable Partnerships, Stories (guides, Screening Room). Utility: Search, account ("Hi, {0}"), Wish List with count, Cart with count, Contact Us, Store Locator, Book an Appointment, country.
Source: https://www.davidyurman.com/

**Homepage order (11 sections):** Sculpted Cable hero "As Seen On Eiza González" → five products → Cable Collection promo → Shop by Category (6) → Chevron hero "As Seen On Michael B. Jordan" → four products → Streamline promo → BCRF partnership → More to Explore (collections, gifts, metal-mixing guide, store locator) → **"At Your Service"** (overnight shipping, returns, BOPIS, gift cards, gift boxes) → email.
Source: https://www.davidyurman.com/

**Collection page (Sculpted Cable):** hero of two cuffs + design story (Evan Yurman, bas-relief, "Cable is deconstructed to its essence"), materials explanation (18K for warmth, oxidized hand-polished silver), categories with counts (Bracelets 79, Rings 38, Necklaces 35, Earrings 29, Charms 5), filters (material, price bands, stone, size, sub-collection), grid with price ranges and "New Arrival"/"Most Loved" flags, sub-collections (Sculpted Cable Flex®, Petite Pavé), shop-the-look, campaign video.
Source: https://www.davidyurman.com/womens/collections/sculpted-cable-collection.html

**PDP anatomy (Sculpted Cable pendant, N18960DSS, $950):** 5 images incl. on-model (no video/3D) → name, Style #, UPC → price → metal/stone variant → length dropdown (17 IN; adjustable 15–17) + size guide (in/cm) → Add to Bag → wishlist → **"Contact a Diamond Specialist"** + "Contact Customer Care" → description → specs (0.24 ctw, 10 mm pendant, 1.25 mm chain, lobster clasp) → complimentary overnight UPS, 30-day returns, BOPIS → packaging ("fawn-colored sueded pouches… signature ribbon with gift receipt") → care + complimentary boutique cleaning → collection promo + "Choose Your Width." No engraving, no reviews, no financing.
Source: https://www.davidyurman.com/womens/necklaces/sculpted-cable-pendant-necklace-in-sterling-silver-with-diamonds-10mm-N18960DSS.html

**High jewelry:** hero of a one-of-a-kind Liberty necklace; four groupings incl. **"Discover by Appointment"**; no prices; primary CTA **"Contact Our Concierge."** Quote: "We invite you to explore our High Jewelry collections with a private appointment."
Source: https://www.davidyurman.com/high-jewelry.html

**Bridal:** Wedding hub "Love's Brilliance" → engagement grid → Diamond Specialists appointment → Men's engagement → "Crafted With Love" (artistry, GIA-certified conflict-free DY Diamonds, 58-facet DY Signature Cut™) → bands with Women's/Men's tabs → gift guide → **"Exclusive Services" (engraving, resizing, polishing, upgrades)**. Engagement rings are **diamond-first** (shape carousel: Signature Cut, Round, Oval, Pear) then settings by collection (Capri, Eden, Lanai, Crossover, Unity, Infinity); no builder — book an appointment instead.
Sources: https://www.davidyurman.com/wedding.html · https://www.davidyurman.com/wedding/engagement-rings.html

**Appointments:** off-site JRNI booking (booking.jrni.com, "Customer Journey").
Source: https://booking.jrni.com/?client=davidyurman_37000&product=Customer%20Journey&environment=production&lang=en

**Services (Product Care & Repair):** annual professional cleaning at boutiques + at-home kit; repairs via an online **Care and Service Portal** (or in store, or mail-in); resizing on select rings; **engraving, 3-week turnaround**; Jewelers Mutual insurance; no price list — estimate after a ≤2-week evaluation ("time owned" and "condition received" considered).
Source: https://www.davidyurman.com/customer-care/product-care-repair.html

**World of Yurman:** Paris+ banner → About → four cards (An Artist's Story, Our Values, Close to Our Hearts, The Journey) → Cable Book (Rizzoli) → Yurman Family Foundation. Timeline 1942–2022 by milestone with image carousels, tying Lipchitz/Roszak bronze work and Hamada ceramics to the Cable motif ("one long art project").
Sources: https://www.davidyurman.com/world-of-yurman.html · https://www.davidyurman.com/timeline.html

**Stores:** locator (radius 15–300 mi; DY store vs authorized retailer). Store page: hero photo → address/phone/status → call / book / directions → hours → services (styling appointments, complimentary cleaning, repairs) each with booking → photos → categories → nearby stores → FAQs ("Repairs may take 4–6 weeks") → newsletter.
Sources: https://www.davidyurman.com/stores?boutiques=true&retailers=true · https://www.davidyurman.com/on/demandware.store/Sites-davidyurman-Site/en_US/Stores-Details?StoreId=269001

**Footer:** Need Help (FAQs, Shipping, Returns, Gift Cards, Ordering, Contact) · Services (Care & Repairs, Book an Appointment, Store Locator) · Cultural Partnerships (Paris+, Louvre, SCAD) · Commitments (BCRF, Trevor Project) · Our Company (About, Stories, Careers, Fighting Counterfeits) · Legal · Social (6).
Source: https://www.davidyurman.com/

---

### 1.9 Ralph Lauren — ralphlauren.com (style reference; partial capture, see §0)

**Navigation (rendered DOM of the heritage page):** gender-first top level (Men captured) → **"Our Brands": Polo Ralph Lauren, Purple Label, Double RL, RLX Ralph Lauren** (each a hub URL, e.g. `/brands-ralph-lauren-purple-label-hub`) → "What's New" (New Arrivals, Trending, **Fall Heritage Icons**, Polo Bear Shop, Purple Label Fall 2026, Double RL Winter I Collection, Family Style, Pink Pony) → Clothing by type → Big & Tall. Utility: Find a store, Sign In/Register, a very long country selector.
Source: DOM dump of https://www.ralphlauren.com/rl-heritage-timeline-feature

**Heritage page ("The World of Ralph Lauren Timeline"):** tabs The Man · The Timeline · Letters to Ralph · The Awards · In the Press; year-by-year ledger from 1967 ("It all started with a tie…") with Ralph's own quotes, 1979 "Polo Western… 'made to be worn'," 1981 Santa Fe Collection, 1983 Ralph Lauren Home; "READ THE FULL STORY AT RL MAG."
Source: https://www.ralphlauren.com/rl-heritage-timeline-feature

**Footer:** Customer Support, Shipping, Returns, Order Status, Gift Cards, About Us (corporate), Careers, **World of RL** (`/about-ralph-feature`), Protecting Our Brands, Global Citizenship (Timeless by Design), Recycling (Crafted to Endure), Satisfaction Guarantee, **Personalize Your Experience** (`/mystyle`), Find a Store, App, Sitemap, **Book an Appointment** (virtual), **brand-specific social handles** (Ralph Lauren, Polo, Lauren, RRL), legal.
Source: DOM dump of https://www.ralphlauren.com/rl-heritage-timeline-feature

**Label ladder (corporate + Wikipedia):** corporate groups the business as Ralph Lauren Luxury / Polo Ralph Lauren / Lauren Ralph Lauren / Chaps / Hospitality; Wikipedia's "Brands" section orders Purple Label (1994, "the highest level"), Collection (1971, women's), Polo (1967, "top-selling"), Double RL/RRL (1993, workwear/selvedge), Lauren (1996), Chaps, plus RL Home (1983).
Sources: https://corporate.ralphlauren.com/ · https://en.wikipedia.org/wiki/Ralph_Lauren_Corporation

**How RL presents "Americana":** tiers are **named sub-brands with their own hubs, campaigns and social accounts**, not a filter; heritage is a dated, first-person ledger with the founder's voice; "Heritage Icons" is a merch lane; regional American references (Western, Santa Fe, Old Hollywood) are used as collection themes. Commentary: RL "builds an aspirational American narrative by positioning his brand as a custodian of cultural memory."
Sources: https://www.kicktheconcrete.com/post/ralph-lauren-heritage-storytelling-polo · https://www.ralphlauren.com/rl-heritage-timeline-feature (RL Mag and the Mr Porter piece were not readable: 403)

---

### 1.10 VRAI — vrai.com (digital-native, lab-grown)

**Primary navigation (8 items):** Engagement · Wedding · Diamonds · Jewelry · Collections · Gifts · Showrooms · Tennis Bar. *Engagement* → Engagement Rings, VRAI Created Diamonds, Ready-to-Ship Rings, Custom Engagement Rings. *Collections* → Tennis Bar, Arrow, V, VRAI Atelier, designer collabs. *Gifts* → Most Popular, Under $1000, Ready-to-Ship, Gift Cards, occasions. *Showrooms* → 10 cities. Utility: account, search, appointment, chat/expert, cart.
Source: https://www.vrai.com/

**Homepage order (8 sections):** Tennis Bar hero ("Your destination for creating personalized tennis jewelry") → Engagement "True to the Future / Design your ring" → VRAI Created Diamonds "Unmatched Origin / Select your diamond" → Master Cutters → Sought-After Styles → "Spotted in VRAI" (social proof) → "Meet us around the world" (showrooms) → email.
Source: https://www.vrai.com/

**Engagement PLP:** builder path (setting → diamond → size), filters (shape, metal, style), **"From $1,035"** price grammar, Ready-to-Ship section, and education embedded on the listing (Diamond Color Scale, the 4Cs, certification, sizing, articles, long FAQ); CTAs "Configure," "Design your own," "Contact a VRAI Diamond Expert," virtual appointment. Quote: "Every VRAI engagement ring can be made unique."
Source: https://www.vrai.com/engagement-rings

**Configurator/PDP (Signature oval):** 360° views + video + on-hand photography → steps **Setting → Diamond → Review** → options: 30+ shapes, metals (platinum, 18k Y/W, 14k rose, mixed), plain vs hidden halo, band width, plain vs pavé band → base price $1,150 with **spec transparency** (metal weight 2.05 g, band depth 1.6 mm, pavé 0.18 ctw, "shown with 1.5 ct") → FedEx 2Day $10 / Overnight $50 → 30-day returns → appointment (in-person/virtual) → live chat → **reviews 5.0 (224+)** → Spotted in VRAI → financing → Lifetime Care Package.
Source: https://www.vrai.com/configure/setting-to-diamond/signature-prong/oval-yellow-gold-16169210314818

**Diamonds:** three trust pillars (Impeccable origin, Master cutters, Unmatched value), inventory search by shape/carat/color/clarity/price, "Cut for You."
Source: https://www.vrai.com/diamonds

**Custom:** **Dream It → Design It (3D visualization) → Make It (14 business days)**; budget-first; estimate after consultation, final price on design approval; no rush orders.
Source: https://www.vrai.com/custom-engagement-rings

**Showrooms:** grid of 8 NA + 2 EU locations; each page: hero, address/hours, "What to expect" (try on, Cut for You, custom "white-glove"), Book an appointment (`/book-appointment`), virtual option ("connect with a diamond expert from the comfort of your home").
Sources: https://www.vrai.com/showrooms · https://www.vrai.com/book-appointment

**Footer:** Contact (Contact Us, help@, phone, Diamond Expert Access, Showroom Visits) · Support (FAQs, Shipping, Returns, Lifetime Care Package, **Payment Plans**) · Company (Our Mission, Spotted in VRAI, Careers, Affiliates, Journal) · Legal.
Source: https://www.vrai.com/

---

### 1.11 Catbird — catbirdnyc.com (digital-native, Brooklyn)

**Primary navigation (11 items):** New · All Jewelry · Customized · Rings · Necklaces · Charms · Earrings · Bracelets · Wedding · Gifts · World of Catbird (+ "Stores & Services"). Category sub-navs mix type, Best Sellers, price (Under $300/$500), Personalized, and "Forever" (permanent jewelry). Utility: search, account (orders, wishlist), wishlist, cart, Contact, Store Locator.
Source: https://www.catbirdnyc.com/

**Homepage order (16 sections):** Vito's Gems banner → Ear Constellations → Clairo collab → shipping-deadline banner → Just for You & Under $300 → Shop by Price ($150/$300/$500/$1000) → Tennis Edit → October Opals → Fall Edit → Stores & Services → Experiences & events (Get Zapped, piercing) → customer reviews → values (Solid Gold, Sustainable since 2004, Giving Fund) → World of Catbird → SEO paragraph → **email signup with 10% discount**.
Source: https://www.catbirdnyc.com/

**Wedding hub:** 342 items; by type (engagement, bands), by collection (The Swans, Fairy Lights & Snow Queens…), **Ready to Ship**, by stone (lab-grown, recycled diamonds, sapphires, rubies, emeralds, opals), bespoke custom; **Love & Engagement consultations via Acuity Scheduling**; virtual styling; FAQ.
Sources: https://www.catbirdnyc.com/wedding-engagement.html · https://www.catbirdnyc.com/wedding-engagement/engagement-rings.html

**Personalization:** product-specific rather than a global configurator — engraving (names/dates), birthstones, initial charms, "Build Your Own" charm holders; some items "(Visit a Store!)."
Source: https://www.catbirdnyc.com/jewelry/designer-jewelry/personalized-jewelry.html

**PLP cards:** "READY TO SHIP!", "MAKE IT PERSONAL", "BEST SELLER", Add to Wish List, **maker attribution per card** (Catbird Jewelry / Satomi Kawakita / Catbird x The Met / Jenny Slate x Catbird), strike-through sale prices, "25% OFF – LEAVING SOON."
Source: https://www.catbirdnyc.com/sale.html

**PDP anatomy (Entwined Braided Chain Collar):** View All Images → READY TO SHIP! → name → maker → price (sale + strike-through) → **4.4 ★ · 5 Reviews** → Add to Bag → **"Send a Hint!"** → Add to Wish List → "What We Love" (story + a storage tip) → Details (100% recycled sterling, 3 mm, 17"; value bullets "Heirloom quality," "Sustainable since 2004," "Charitable giving") → Designer → Shipping & Returns → "We think you'll love these" → Customer Reviews with media filter → values footer ("over 95% recycled gold, 95% recycled diamonds"). No financing, no 3D.
Source: https://www.catbirdnyc.com/entwined-braided-chain-collar-silver.html

**Appointments & stores:** types — Virtual Styling, Engagement/ring consults, Zapping (permanent jewelry), Piercing (walk-ins welcome) — all via Acuity. Store cards: name + services (Fine Jewelry, Permanent Jewelry, Wedding & Engagement, Piercing), map link, hours, "VIEW STORE INFO." Quote: "Expert Catbirds are here to help you find the ring of your dreams."
Sources: https://www.catbirdnyc.com/appointments · https://www.catbirdnyc.com/our-locations/

**Footer:** Visit Us (Locations, Love & Engagement, Get Zapped, Pierced, Studio, Events, World of Catbird, Story, Wedding, Blog) · Let Us Help You (Virtual Styling, Contact, Returns, FAQs, Shipping, International, Warranty, Sizing Guide, Jewelry Care, Gold Info, Promotions) · More (Gift Cards, Press, Careers, Giving Fund, legal, Sitemap, Facts).
Source: https://www.catbirdnyc.com/

---

### 1.12 Mejuri — mejuri.com (digital-native, "everyday fine")

**Primary navigation (7 items):** All Jewelry · Best Sellers · New In · Collections · Jewelry Essentials · Get Inspired · Open Dôme Salmon Gold™. Utility: search, store selector, sign in/wishlist, bag.
Source: https://mejuri.com/

**Homepage order (8 sections):** Salmon Gold launch (restoration metrics) → Open Dôme collection → Essentials → Lab-grown sapphires → **Stores & Services** (stores, piercing studios, events) → mission statement → sustainability report → footer.
Source: https://www.mejuri.com/

**PDP anatomy (Interconnected Lattice Hoops, $178):** name → price → 18k Gold Vermeil, 20 mm / 1.3 mm → Add to Bag → **wishlist requires sign-in** → description → materials (18k gold on 91% recycled silver, hypoallergenic) → trust badges Free Shipping / Free Returns & Exchanges / **2-year warranty** → 4.8 rating → Mejuri+ loyalty → complimentary cleaning at stores.
Source: https://mejuri.com/products/interconnected-lattice-hoops

**Stores:** hub filtered by region; cards with photo, address, hours, services (piercing studio, complimentary cleaning, styling, events), "Book your appointment." Quote: "We'll polish your jewelry to perfection while you're here. Our treat."
Source: https://mejuri.com/stores/hub

**Footer:** Help (FAQs, order status, shipping, returns, warranty, contact) · Stores & Services (locations, piercing, aftercare, events) · Resources (jewelry care, materials, size guides, how-tos, blogs) · About (mission, sustainability, commitments, careers).
Source: https://www.mejuri.com/

---

## 2. Cross-site matrix (what was actually on the pages checked)

| Site | Fine-jewelry price on PDP | High-jewelry price | 3D / AR | Engraving on PDP | Reviews on PDP | Financing | Appointment types | Bridal builder | Wishlist | Add to bag |
|---|---|---|---|---|---|---|---|---|---|---|
| Cartier | Yes, fixed | Yes (fixed or range); "Request Price" on unsold-online pieces | No | No (service page; band filter "Engraving: Yes") | No | No | Boutique only; no same-day | Set For You (separate domain) | Yes | Yes + Contact an ambassador |
| Van Cleef & Arpels | Yes, "excluding taxes" | None; Heritage by inquiry | No | No ("Engrave my ring" is a service) | No | No | 4-step boutique request | Your Poetic Setting (6 settings) | Yes | Yes + Order by phone |
| Harry Winston | "Starting from $…" | None (collections only) | No | No | No | No | Salon form; 15-min slots | None | No | **No** (Schedule / Request Assistance) |
| Tiffany | Yes; "Starting from" for bridal | Curated Selection priced; Blue Book unpriced | No | Via Personalization/appointment | No (SEO FAQ instead) | Tiffany Select (footer) | In-store, virtual, chat, call | On-PDP diamond selector; Ring Studio in appointment | "Save" | Yes + Find in Store |
| Graff | "From $…" + priced stone list; "Price on application" (Legacy) | None (editorial making-of) | **Yes** (3D badges + viewer) | **Yes** ("Engrave your ring") | No | Splitit | Widget; named private contact per boutique | Inline "Select your diamond" | Yes | Yes + Enquire / Order by phone |
| Boucheron | **"Price on demand"** everywhere | None | 3D view | No | No | No | Boutique date/slot + account | None | Saved items | **No** ("Contact us") |
| Bulgari | Yes, "excluding taxes" | None ("Contact an expert" form) | **3D + Virtual try-on** | "Customize It" badge; engraving/hot stamping | No | No | Boutique or virtual | None | — | Yes + Send as Gift + Find in store |
| David Yurman | Yes | None ("Contact Our Concierge") | No | No (service; 3-week turnaround) | No | No | JRNI off-site; Diamond Specialist | None (diamond-first browse) | Yes | Yes + BOPIS |
| VRAI | Yes + spec/price breakdown | n/a | 360° + video | (not captured) | **5.0 (224+)** | Yes | Showroom, virtual, chat | **Full configurator + 3-step custom** | Implied | Yes |
| Catbird | Yes (+ sale) | n/a | No | "Make it personal" per product | **4.4 (5)** | No | Acuity: styling, engagement, zap, piercing | None (bespoke mention) | Yes | Yes + Send a Hint |
| Mejuri | Yes | n/a | No | No | **4.8** | (not shown) | Piercing/store booking | None | Sign-in required | Yes |

Sources: the per-site PDP/PLP URLs in §1.

---

## 3. Synthesis

### 3.1 The common skeleton every house shares

Across Cartier, VCA, HW, Tiffany, Graff, Boucheron, Bulgari and DY the sitemap is the same six-part skeleton, varying only in labels:

1. **A separate High Jewelry realm** at the top level (Cartier, HW, Tiffany, Graff, Boucheron, Bulgari, DY all have it as a nav item; VCA carries it first in the footer map). It has its own grammar: chapters/collections by year or theme, editorial making-of pages, no cart, and a human CTA ("Request Price," "Contact an expert," "Contact Our Concierge," "Discover by Appointment").
   Sources: https://www.cartier.com/en-us/high-jewelry/ · https://www.harrywinston.com/en/high-jewelry · https://www.tiffany.com/high-jewelry.html · https://www.graff.com/us-en/high-jewellery.html · https://www.boucheron.com/int_en/high-jewelry/ · https://www.bulgari.com/en-us/collection/high-jewellery/eclettica · https://www.davidyurman.com/high-jewelry.html
2. **"Jewelry" as one hub with three parallel entry logics** — named collections (LOVE, Alhambra, T, Butterfly, Quatre, Serpenti, Sculpted Cable), piece-type categories (rings, necklaces…), and a bridal lane. Collections are always named and always come with a story page.
   Sources: https://www.cartier.com/en-us/ · DOM dumps of tiffany.com, graff.com, bulgari.com · https://www.davidyurman.com/
3. **Bridal/Engagement as its own lane** (Cartier "Engagement rings / Wedding bands," HW "Engagement and Bridal," Tiffany "Love & Celebration," Graff "Engagement & Bridal," Bulgari "Engagement & Wedding," DY "Wedding," VCA "Engagement") with education (4Cs/bridal guide), a semi-custom "choose your diamond on our setting" path (Cartier Set For You, VCA Poetic Setting, Tiffany diamond selector/Ring Studio, Graff Select Your Diamond), and appointment CTAs.
4. **Services as a first-class section** (Cartier "Services"/"Advice and services," VCA "Care & Services," HW "Services," Tiffany "Client Services," Graff "Client Services," Boucheron "Services," Bulgari "Services," DY "Product Care & Repairs"), always covering: appointment, engraving/personalization, resizing/adjustment, cleaning/care advice, repair, and often authentication/valuation and service-status tracking.
5. **The House / La Maison / World of …** as a top-level or footer realm containing: founding story, timeline by decade, savoir-faire/ateliers, stones expertise, designers/people, commitments/foundation, news.
   Sources: https://www.cartier.com/en-us/la-maison/ · https://www.vancleefarpels.com/us/en/the-maison.html · https://www.harrywinston.com/en/the-house · https://www.tiffany.com/world-of-tiffany/heritage.html · https://www.graff.com/us-en/house.html · https://www.boucheron.com/int_en/our-maison/ · https://www.davidyurman.com/world-of-yurman.html
6. **Boutiques as destination pages** with photos, hours, phone, "services available at this boutique," and a per-boutique Book an Appointment (Tiffany, VCA, DY, Cartier, Graff).

Utility bar is near-identical everywhere: Search · Wishlist/Saved · Account · Bag · Contact/Phone · Find a Boutique · (Book an Appointment). Footer is near-identical: Client care · Services · Company/House · Legal (privacy, accessibility, human-rights/supply-chain) · Social.

### 3.2 Ten conventions that signal "luxury house" rather than "jewelry store"

1. **Designs have names and biographies.** Every house navigates by named design (LOVE 1969/Aldo Cipullo; Alhambra 1968; T 1975; Quatre 2004; Serpenti 1948) and the collection page opens with the origin story before any grid. Stores navigate by category and price. (Cartier LOVE, VCA Alhambra, Tiffany T, Boucheron Quatre pages above.)
2. **A "House" realm exists and is in the nav** — HW puts "The House" first; Cartier "La Maison"; DY "World of Yurman"; RL "World of RL." It contains a dated timeline in the founder's voice (RL, DY, VCA, Bulgari, Graff "Creating Diamond History").
3. **High jewelry is separated and priced differently.** Fixed prices for icons; "Starting from/From" when a stone varies the price (Tiffany, HW, Graff, VRAI); "Price on request/application/demand" or "Contact an expert" for unique pieces (Cartier HJ pieces not sold online, Graff Legacy, Boucheron, Bulgari Eclettica, DY HJ).
4. **The appointment is omnipresent and human.** It sits in the utility bar, on the PDP ("Contact an ambassador," "Contact a Diamond Specialist," "Book a virtual appointment"), inside PLP grids (Bulgari service tiles), on store pages, and in the footer; Graff names the person and gives a direct line; Tiffany offers in-store, virtual, chat and phone on one page.
5. **The PDP is calm and service-wrapped.** Few selectors (metal, size, maybe stone variation), one price line (often "excluding taxes"), then a stack of service accordions: shipping & returns, packaging as a feature (Blue Box, Signature Box, DY pouch), care, size guide, responsibly sourced. No countdown, no star rating, no financing banner on the houses (VRAI/Catbird/Mejuri are the opposite).
6. **"Complete the set / Related creations" over "You may also like."** VCA's "Complete Set" lists the matching necklace/earrings/ring with prices; Graff "Complete the Collection"; Cartier "Related Creations." It sells the design system, not a random cross-sell.
7. **Stones and craft are pages, not bullet points.** VCA "The stone expertise" + GIA thresholds on Poetic Setting; HW "Our Stones/Our Craftsmanship"; Cartier "Know-how" naming the métiers; Bulgari "Artsmanship"; Tiffany "Diamond provenance"; Graff "a member of the Graff family personally selects each stone."
8. **Services are productized.** Named services with their own pages and sometimes status tracking: VCA (Engrave my ring / Adjust my bracelet / Request a repair / Authentication and Valuation / "check its status"), DY (Care and Service Portal, 3-week engraving), Tiffany (mail-in service form), Cartier Care warranty.
9. **Boutique pages read like a hotel page.** Photo slider, "this boutique speaks: English," services offered here, private-appointment contact, hours by day (VCA Atlanta, Graff Madison, Tiffany Nashville, DY).
10. **Copy register: short declaratives in the house's voice; no exclamation points; no discounts.** "No two diamonds are alike." (HW) · "Some objects you own, others you define." (Tiffany) · "Icons cannot be created; they are forged over time." (Boucheron) · "At Bvlgari, service is a matter of care." Counter-examples that read "store": "NEW TO SALE – 25% OFF," "Join Mejuri+," "10% off" email popups.
11. **(Bonus) Packaging and lifetime care are part of the product.** Tiffany's Blue Box accordion on every PDP; Bulgari "Signature Box"; DY's described pouch and ribbon; VRAI "Lifetime Care Package"; Tiffany "A Lifetime of Service."

### 3.3 What the digital-native brands do better

1. **Configurators with live, itemized prices.** VRAI's Setting → Diamond → Review flow shows base price, metal weight, band depth, pavé ctw, "shown with 1.5 ct," shipping cost per method and a reviews block — all on one page. Graff is the only house that matches it (inline certified-stone list with per-stone price and Add to Bag); Tiffany's selector is close but hides prices behind "Notify me."
   Sources: https://www.vrai.com/configure/setting-to-diamond/signature-prong/oval-yellow-gold-16169210314818 · Graff ET01ALL PDP
2. **Education at the point of decision, not in a separate guide.** VRAI puts the color scale, 4Cs, certification and sizing on the engagement PLP itself; Tiffany's PLP adds "Shop 1 carat / 2 carat" and education tiles; HW puts it in a PDF-style Bridal Guide.
3. **Honest fulfilment states.** "Ready to Ship" vs made-to-order (VRAI, Catbird), 14-business-day custom promise (VRAI), explicit shipping prices, 2-year warranty badge (Mejuri). Houses mostly say "complimentary shipping" and little else.
4. **A clear bespoke path with a timeline:** VRAI "Dream It → Design It (3D visualization) → Make It (14 business days)." Houses hide bespoke behind "Special orders" or "Request Assistance."
5. **Social proof and gifting mechanics:** star ratings (VRAI 5.0/224+, Catbird 4.4, Mejuri 4.8), "Spotted in VRAI," Catbird's "Send a Hint!" (a gift-intent capture the houses lack).
6. **Stores as experiences, booked in two clicks.** Catbird's Acuity and Mejuri's piercing/cleaning offers make the store a reason to visit; VRAI's showroom pages explain "what to expect." Houses' booking is heavier (Cartier: no same-day; Graff: opaque widget; Boucheron: account creation required).
7. **Materials transparency pages** (Mejuri "Materials," VRAI "Diamonds / Impeccable origin") — the exact page American Jewelry needs for natural vs man-made.
8. **Wishlist with intent**: VRAI/Catbird expose wishlists without friction; Mejuri's sign-in gate is the anti-pattern.

### 3.4 Recommended sitemap for American Jewelry

Design principle drawn from the teardowns: **tiers are named realms with their own storytelling (RL's label hubs, every house's High Jewelry), but the catalog is one catalog organized by design, and stone origin is a version chosen on the piece** (Tiffany's diamond selector, Graff's stone list, VRAI's created diamonds, VCA's Poetic Setting all put the stone decision on the setting's page). Royal American gets the High-Jewelry treatment; Americana and New American share designs and differ at the stone step.

**Top-level navigation (7 + utility):**
`The House · Royal American · Jewelry · Bridal · Build · Services · Visit`
Utility: Search · Book an Appointment · Wishlist · Account · Bag · phone.

**Proposed tree (URL → what the page is, with the house it borrows from):**

- `/` — Home. Order: (1) one hero per season (a design, not a sale) with SHOP + DISCOVER THE STORY (Graff pattern); (2) featured pieces with prices; (3) "By design" tiles (motifs); (4) the three tiers explained in one strip (Royal American / Americana / New American) — the only place all three sit side by side; (5) Bridal + Build entry; (6) "Designed and cast in Tennessee" craft block (Cartier "fauna" / Bulgari Artsmanship slot); (7) Services trio (appointment, engraving, care) — Tiffany "The Tiffany Experience"; (8) Visit Brentwood / Mt. Juliet; (9) journal; (10) newsletter without a discount.
- `/house` — The House (HW puts it first in nav; keep it first). Children: `/house/story` (founding, family, timeline by decade in the founder's voice — RL/VCA/Bulgari), `/house/atelier` (designed and cast in-house: named crafts, the casting process, people — Cartier Know-how), `/house/stones` (natural and man-made, what the house accepts, grading thresholds — VCA Poetic Setting, Tiffany provenance), `/house/commitments`, `/house/journal`.
- `/royal-american` — Tier 1 hub = the High Jewelry realm. Chapters by year/theme (Tiffany Blue Book, Boucheron Histoire de Style), each `/royal-american/[chapter]` an editorial page with making-of; each piece `/royal-american/[chapter]/[piece]` with gallery + iJewel3D, stones and provenance, the story, **"Price upon request" + "Request a private viewing" + named contact** (Graff Madison pattern), and an "Acquired" state for sold pieces so the archive persists (VCA Heritage). No Add to Bag.
- `/jewelry` — hub with three entry logics in one mega-menu (Tiffany/Graff): **By design** (motifs), **By piece** (rings, bands, necklaces, earrings, bracelets), **By tier** (Americana, New American), plus New / Most loved.
- `/jewelry/[motif]` — the design's biography page (Cartier LOVE): origin story → shop-the-look → grid of every piece type in that motif → "the lines" comparison (versions) → related motifs.
- `/jewelry/[motif]/[piece]` — e.g. `/jewelry/signal/rings`: PLP filtered to one piece type with filters metal · stone (natural / man-made) · size · price.
- `/jewelry/[motif]/[piece]/[version]` — the PDP. Version = design + piece + metal + stone-origin family. Anatomy (house-standard): gallery + 3D + short video → name + reference → **tier badge (Americana / New American) that switches with the stone toggle** → price (plain) → metal → **stone: Natural (Americana) | Man-made (New American), each with carat/grade options and the price updating** (Tiffany selector + Graff stone list) → size + size guide → engraving field (Graff "Engrave your ring") → Add to Bag → Wish List → "Contact an advisor" + "Book an appointment" + "Find in store (Brentwood / Mt. Juliet)" → description + specs → accordions: Shipping & returns, Packaging, Care, Lifetime service, Responsibly sourced → **"Complete the set"** (VCA) → "Behind the design." No reviews, no financing banner, no urgency.
- `/americana`, `/new-american` — tier hubs, not catalogs: what the tier means, who it is for, the stone standard, then "Shop Americana" which is `/jewelry?stone=natural`. (RL label-hub pattern; Tiffany "Tiffany Difference.")
- `/collections/[collection]` — editorial curations ("Collection No. 1 — Fall 2026", a gift edit, a bridal edit) that reference versions across motifs; shop-the-look; never the canonical product URL. (Tiffany Blue Book / Cartier "Latest collections" / Graff "Gifts" edits.)
- `/bridal` — hub (Tiffany Love & Celebration): Engagement (by design, by shape), Bands (hers / his / matching), **Build your ring / Build your band** entry, education (choosing, 4Cs, natural vs man-made truth), "A lifetime of service," appointment.
- `/build/ring`, `/build/band` — the configurators (VRAI flow: Setting → Stone → Metal → Fit → Review) with live itemized price, 3D, ready-to-ship vs made-to-order date, engraving, save-to-wishlist, "Design with us" handoff to an appointment (Tiffany Ring Studio) and a bespoke path "Dream it → Design it → Make it" with a stated lead time.
- `/services` — productized (VCA): Engrave · Resize/adjust · Clean & care · Repair · Appraisal/Authentication · Lifetime care; "Request a service" form; "Check service status"; care advice by material.
- `/appointments` — one on-site form (VCA 4-step): Location (Brentwood / Mt. Juliet / Virtual) → Purpose (engagement, build, Royal American private viewing, service, gift) → date/time (allow same-day; Cartier's refusal is a lesson) → contact. Embed it; do not bounce to Acuity/JRNI.
- `/visit/brentwood`, `/visit/mt-juliet` — destination pages (Tiffany Nashville / VCA Atlanta): photos, hours by day, phone, "services at this location," the team, Book here, directions; a place to surface the existing Google reviews instead of on PDPs.
- `/journal` — house stories and guides (Tiffany style guides, DY Stories).
- `/account` — orders, wishlist, **saved builds**, service status, appointments.
- Footer: Client Care (contact, phone, FAQ, shipping & returns, size guide, order status) · Services · The House · Visit · Legal/Accessibility.

**Data model note (for the Shopify side):** canonical product = *version* (design × piece × metal × stone-origin family); Shopify variants carry carat/grade/size; **tier is a metafield derived from stone origin** (Royal American pieces are their own product type with `price_on_request = true`); *collection* is a Shopify Collection used only for curation URLs. This keeps the house's "one design, your stone" promise true in the URL structure.

### 3.5 Things to avoid

1. **Discount grammar anywhere** — sale pages, "25% OFF – LEAVING SOON," 10%-off email popups, loyalty-program upsells (Catbird, Mejuri). No house does this.
2. **Price-less fine jewelry.** HW and Boucheron withhold prices on everything; that reads as couture, but for a regional house it kills the funnel and contradicts the builders. Reserve "Price upon request" for Royal American only; use "From $" when the stone varies.
3. **Collection story pages with no products on them** (VCA Alhambra) or product grids that fail to render (HW Sunflower). Every story page must end in shoppable pieces.
4. **Off-site or opaque booking** (DY → JRNI, Catbird → Acuity, Graff's blank "Online Appointment" widget, Cartier's "no same-day," Boucheron's forced account creation). Build the form in-house, allow same-day and virtual.
5. **Nav bloat.** Cartier's and Bulgari's menus carry fragrances, bags, eyewear and hotels; American Jewelry's advantage is focus — keep seven top-level items.
6. **Reviews and star ratings on house pieces.** None of the eight houses show them on PDPs; put the 2,500+ Google reviews on Visit pages and the services page.
7. **SEO filler on PDPs** — Tiffany's "Are layering necklaces in style in 2026?" FAQ block reads as content-farm. Keep education in `/journal` and `/house/stones`.
8. **Celebrity "As Seen On" heroes** (DY) — unverifiable for a Tennessee house; use the atelier, the stones, the place.
9. **Wishlist behind login** (Mejuri). Save-to-wishlist and save-a-build must work logged out.
10. **Two tiers as two catalogs.** If Americana and New American become separate product sets, every design is listed twice and the "same design, your stone" promise is lost — keep stone origin on the PDP/builder, with the tier badge switching.
11. **Hiding the 3D.** Graff and Bulgari badge "3D"/"Virtual try-on" on the PLP card itself; since iJewel3D is a differentiator, badge it on cards, not just the PDP.
12. **Hard-sell countdowns, "x people viewing," and financing banners above the price** — VRAI tolerates them; a house does not.

---

## 4. Tone bank (verbatim, ≤15 words each)

- Cartier: "All Cartier engagement rings are set by hand in the ateliers."
- Cartier: "The Maison will work with you through time to preserve the beauty of your creation."
- Van Cleef & Arpels: "Open the doors of our boutiques — AFTER YOU"
- Van Cleef & Arpels: "Personalize, adjust or revive your creations"
- Harry Winston: "No two diamonds are alike."
- Harry Winston: "Only the very best diamonds are accepted. There are no exceptions."
- Tiffany: "Some objects you own, others you define."
- Tiffany: "Designed by You. Crafted by Tiffany."
- Graff: "No stage is bypassed. No shortcuts are taken. Only perfection matters."
- Graff: "For the beginning of forever."
- Boucheron: "Icons cannot be created; they are forged over time."
- Boucheron: "Paris depuis 1858"
- Bulgari: "At Bvlgari, service is a matter of care."
- Bulgari: "An Icon of Transformation"
- David Yurman: "One long art project."
- David Yurman: "A ring as unique as your love story."
- Ralph Lauren: "It all started with a tie…"
- Ralph Lauren (Polo Western tagline): "made to be worn"
- VRAI: "Every VRAI engagement ring can be made unique"
- VRAI: "Meet us around the world — in person or virtually"
- Catbird: "Love letters from a tiny shop, born in Williamsburg in 2004"
- Catbird: "Solid Gold, Always"
- Mejuri: "Jewelry isn't for waiting. It's for living."
- Mejuri: "We'll polish your jewelry to perfection while you're here. Our treat."

---

## 5. Source index (every URL used)

**Cartier** — https://www.cartier.com/en-us/ · https://www.cartier.com/en-us/la-maison/ · https://www.cartier.com/en-us/high-jewelry/ · https://www.cartier.com/en-us/high-jewelry/know-how/ · https://www.cartier.com/en-us/love-cartier.html · https://www.cartier.com/en-us/jewelry/bracelets/love/love-unlimited-bracelet-flexible-diamonds-CRB6094117.html · https://www.cartier.com/en-us/jewelry/necklaces/cartier-fauna-%26-flora/faune-et-flore-de-cartier-necklace-paved--CRN3109100.html · https://www.cartier.com/en-us/jewelry/engagement-rings/ · https://www.cartier.com/en-us/jewelry/wedding-bands/ · https://www.cartier.com/en-us/services.html · https://www.cartier.com/en-us/jewelry/advice-and-services/ · https://www.cartier.com/en-us/personalization-services.html · https://www.cartier.com/en-us/rdv-bookings · https://stores.cartier.com/en_us/search?category=storeLocatorSearch · https://stores.cartier.com/united-states/ga/atlanta/3500-peachtree-road · https://diamonds.cartier.com/en-us · https://openers.jp/en/watch-and-jewelry/watch-and-jewelry_jewelry-news/QBRU8 · https://thejewelleryeditor.com/jewellery/article/cartier-diamond-engagement-rings-and-set-for-you-engagement-service

**Van Cleef & Arpels** — https://www.vancleefarpels.com/us/en/home.html · https://www.vancleefarpels.com/us/en/collections/jewelry/alhambra.html · https://www.vancleefarpels.com/us/en/e-boutique/category/necklaces-and-pendants.html · https://www.vancleefarpels.com/us/en/collections/jewelry/alhambra/vcara41500---vintage-alhambra-bracelet-5-motifs.html · https://www.vancleefarpels.com/us/en/collections/high-jewelry.html · https://www.vancleefarpels.com/us/en/collections/high-jewelry/the-heritage-collection.html · https://www.vancleefarpels.com/us/en/collections/engagement.html · https://www.vancleefarpels.com/us/en/collection/your-poetic-setting.html · https://www.vancleefarpels.com/us/en/in-store-appointment.html · https://www.vancleefarpels.com/us/en/care-and-services.html · https://www.vancleefarpels.com/us/en/the-maison.html · https://www.vancleefarpels.com/us/en/the-maison/timeline.html · https://www.vancleefarpels.com/us/en/store-boutique-list.html · https://www.vancleefarpels.com/us/en/boutique-detailed-page/atlanta-neiman-marcus.html

**Harry Winston** — https://www.harrywinston.com/en · https://www.harrywinston.com/en/the-house · https://www.harrywinston.com/en/the-house/our-craftsmanship · https://www.harrywinston.com/en/high-jewelry · https://www.harrywinston.com/en/fine-jewelry · https://www.harrywinston.com/en/products/sunflower-by-harry-winston · https://www.harrywinston.com/en/products/classic-winston/classic-winston-pear-shaped-engagement-ring-with-tapered-baguette-side-stones · https://www.harrywinston.com/en/products/classic-bands-by-harry-winston/platinum-wedding-band-wbnsppl4bp · https://www.harrywinston.com/en/fine-jewelry/engagement-rings · https://www.harrywinston.com/en/engagement-and-bridal/bridal-guide · https://www.harrywinston.com/en/services · https://www.harrywinston.com/en/services/schedule-an-appointment · https://www.harrywinston.com/en/locations · https://jckonline.com/?p=38228

**Tiffany & Co.** — https://www.tiffany.com/ · https://www.tiffany.com/engagement/ · https://www.tiffany.com/engagement/engagement-rings/tiffany-setting/ · https://www.tiffany.com/engagement/engagement-rings/schlumberger-16-stone-platinum-and-18k-yellow-gold-diamond-engagement-rings-17186626.html · https://www.tiffany.com/high-jewelry.html · https://www.tiffany.com/high-jewelry/blue-book/2026-hidden-garden.html · https://www.tiffany.com/jewelry/high-jewelry/ · https://www.tiffany.com/world-of-tiffany/heritage.html · https://www.tiffany.com/designers-collections/tiffany-t/ · https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-t-18k-yellow-gold-necklaces-pendants-1364371976.html · https://www.tiffany.com/client-services/personalization.html · https://www.tiffany.com/client-services/schedule-consultation.html · https://www.tiffany.com/engagement/tiffany-difference/engagement-ring-customization.html · https://www.tiffany.com/client-services/care-and-repair.html · https://www.tiffany.com/stores/ · https://www.tiffany.com/stores/en/united-states/nashville-the-mall-at-green-hills-121

**Graff** — https://www.graff.com/us-en/home/ · https://www.graff.com/us-en/high-jewellery.html · https://www.graff.com/us-en/high-jewellery/unique-timepieces.html · https://www.graff.com/us-en/search/?q=engagement%20ring · https://www.graff.com/us-en/engagement-bridal/engagement/engagement-rings/promise/promise-emerald-cut-diamond-engagement-ring/ET01ALL_ET01ALL.html · https://www.graff.com/us-en/engagement-bridal.html · https://www.graff.com/us-en/jewellery-collections/view-by-collection/butterfly/ · https://www.graff.com/us-en/house.html · https://www.graff.com/us-en/house/heritage/rarity.html · https://www.graff.com/us-en/book-an-appointment.html · https://www.graff.com/us-en/store-detail/new-york-madison-avenue · https://www.graff.com/us-en/store-list/ · https://www.graff.com/us-en/Client-Services-Landing.html

**Boucheron** — https://www.boucheron.com/int_en/ · https://www.boucheron.com/int_en/jewelry/jewelry-collection/quatre.html · https://www.boucheron.com/int_en/jewelry/jewelry-collection/nature.html · https://www.boucheron.com/int_en/lierre-de-paris-naturally-free · https://www.boucheron.com/int_en/quatre-classique-small-ring-classique-jrg00627.html · https://www.boucheron.com/int_en/high-jewelry/ · https://www.boucheron.com/int_en/high-jewelry/collections-histoire-de-style · https://www.boucheron.com/int_en/our-maison/ · https://www.boucheron.com/int_en/services · https://www.boucheron.com/int_en/book-an-appointment

**Bulgari** — https://www.bulgari.com/en-us/ · https://www.bulgari.com/en-us/jewelry/serpenti · https://www.bulgari.com/en-us/jewelry/b-zero1 · https://www.bulgari.com/en-us/bvlgari-icons · https://www.bulgari.com/en-us/BR860038.html · https://www.bulgari.com/en-us/collection/high-jewellery/eclettica · https://www.bulgari.com/en-us/engagement-and-wedding · https://www.bulgari.com/en-us/services-experience · https://www.bulgari.com/en-us/gifts/customized-gifts · https://www.bulgari.com/en-us/bvlgari-history · https://www.bulgari.com/en-us/artsmanship · https://www.bulgari.com/en-us/storelocator/

**David Yurman** — https://www.davidyurman.com/ · https://www.davidyurman.com/womens/collections/sculpted-cable-collection.html · https://www.davidyurman.com/womens/necklaces/sculpted-cable-pendant-necklace-in-sterling-silver-with-diamonds-10mm-N18960DSS.html · https://www.davidyurman.com/high-jewelry.html · https://www.davidyurman.com/wedding.html · https://www.davidyurman.com/wedding/engagement-rings.html · https://www.davidyurman.com/world-of-yurman.html · https://www.davidyurman.com/timeline.html · https://www.davidyurman.com/customer-care/product-care-repair.html · https://www.davidyurman.com/stores?boutiques=true&retailers=true · https://www.davidyurman.com/on/demandware.store/Sites-davidyurman-Site/en_US/Stores-Details?StoreId=269001 · https://booking.jrni.com/?client=davidyurman_37000&product=Customer%20Journey&environment=production&lang=en

**Ralph Lauren** — https://www.ralphlauren.com/rl-heritage-timeline-feature · https://corporate.ralphlauren.com/ · https://corporate.ralphlauren.com/our-company · https://en.wikipedia.org/wiki/Ralph_Lauren_Corporation · https://www.kicktheconcrete.com/post/ralph-lauren-heritage-storytelling-polo · (blocked: https://www.ralphlauren.com/ · https://www.ralphlauren.com/rlmag · https://www.ralphlauren.co.uk/en/discover/70 · https://www.mrporter.com/en-ch/journal/fashion/a-closer-look-at-the-world-of-ralph-lauren-422296)

**VRAI** — https://www.vrai.com/ · https://www.vrai.com/engagement-rings · https://www.vrai.com/configure/setting-to-diamond/signature-prong/oval-yellow-gold-16169210314818 · https://www.vrai.com/diamonds · https://www.vrai.com/custom-engagement-rings · https://www.vrai.com/showrooms · https://www.vrai.com/book-appointment

**Catbird** — https://www.catbirdnyc.com/ · https://www.catbirdnyc.com/wedding-engagement.html · https://www.catbirdnyc.com/wedding-engagement/engagement-rings.html · https://www.catbirdnyc.com/jewelry/designer-jewelry/personalized-jewelry.html · https://www.catbirdnyc.com/appointments · https://www.catbirdnyc.com/our-locations/ · https://www.catbirdnyc.com/sale.html · https://www.catbirdnyc.com/entwined-braided-chain-collar-silver.html

**Mejuri** — https://www.mejuri.com/ · https://mejuri.com/ · https://mejuri.com/products/interconnected-lattice-hoops · https://mejuri.com/stores/hub
