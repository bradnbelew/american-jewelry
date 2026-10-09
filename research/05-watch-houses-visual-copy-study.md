# 05 — Watch Houses: Visual and Copy Craft Study

Prepared for American Jewelry (Brentwood and Mt. Juliet, Tennessee), 2026-10-09.
Companion to `01-luxury-house-teardowns.md`. That study mapped sitemaps, service lanes and the six-part "house" skeleton. This one looks only at craft: what is in the first viewport, how a menu is labelled, what a product card and a product page are made of, how the copy is written, and how metal and stone are chosen. The watch houses (Rolex, Patek Philippe, Audemars Piguet) are the main subjects because they are the most disciplined writers and the most consistent page-builders on the web; Roberto Coin is the jewelry control; Tiffany, Van Cleef & Arpels, Cartier, Harry Winston, David Yurman and Ralph Lauren are re-read only for the specific items the brief asked for.

---

## 0. Method and access log

Method: WebFetch and WebSearch only (no browser). Every quoted line below was present in text actually fetched, or in a search-engine snippet of a named URL; snippet-sourced lines are marked `[snippet]`. No quote is reconstructed from memory. Image backgrounds could rarely be verified from text, so photography notes are limited to what alt text, filenames and image counts reveal, and are flagged as such.

| Site | Read directly | Fallback used | Could not read |
|---|---|---|---|
| rolex.com | Nothing. Every path (root, `/en-us`, `/watches`, `/watches/day-date`, model pages, `/watchmaking/our-signature`, brochure PDFs on content.rolex.com and assets.rolex.com) returned 403. Wayback is blocked for this tool; a read-through proxy returned 401. | (1) Rolex-syndicated "Discover Rolex" pages on an Official Rolex Jeweler site (tinyjewelbox.com) that carry the official catalog text, model pages, technical tables and filters; (2) search snippets of rolex.com/en-us/watches/day-date/features, rolex.com/watchmaking/our-signature and newsroom.rolex.com. | The rolex.com homepage hero and the "Configure your Rolex" tool itself. |
| patek.com | Home, collection hub, Nautilus, Calatrava, Nautilus 5811/1G-001 PDP, "Find your timepiece", Values, Service. | — | `/en/manufacture` and `/en/company/generations` (404). |
| audemarspiguet.com | Home, About (Le Brassus), Collections hub, Royal Oak 15510ST PDP. | — | Collection grids (Royal Oak, Code 11.59) render by JavaScript; only header/footer text arrived. Sitemap 404. |
| robertocoin.com | Home, Cobra collection, Love in Verona bangle PDP, The Brand, Concierge, Prestige Service, Product Care, product sitemap. | — | `/jewelry` and `/maison` (404; the live paths are `/collections/...` and `/pages/the-brand`). |
| tiffany.com | Nothing (403 on .com, .co.uk, .com.au, sitemap). | Search snippets of the Ring Studio page, personalization page, Tiffany T pages and the HardWear header banner. | Hero, menu, PLP card, PDP. |
| vancleefarpels.com | Nothing (403 on us/en, ww/en, jp/en, events). | Search snippets of the Alhambra series/events pages and Poetic Setting pages. | Hero, menu, PLP card, PDP. |
| cartier.com | Home, All rings PLP, LOVE bracelet PDP. | Press coverage for Set For You (diamonds.cartier.com is JS-only). | Set For You UI itself. |
| harrywinston.com | Home, Fine Jewelry hub, The House. | — | Collection PLP (`/fine-jewelry/sunflower` is 404); sitemap over 10 MB. |
| davidyurman.com | Home, Cable Collection PLP, Sculpted Cable Locket PDP, "History of Sculpted Cable" story. | — | — |
| ralphlauren.com | Nothing (307 redirect loop on .com, .co.uk, .de). | One search snippet (867 collection watch page). | Everything else; see `01-luxury-house-teardowns.md` for RL. |

---

## 1. Site captures

### 1.1 Rolex (rolex.com, reconstructed)

Sources: https://www.tinyjewelbox.com/discover-rolex/ · https://www.tinyjewelbox.com/discover-rolex/rolex-day-date.html · https://www.tinyjewelbox.com/discover-rolex/rolex-day-date/M228239-0033.html · https://www.tinyjewelbox.com/discover-rolex/rolex-selection.html · https://www.tinyjewelbox.com/discover-rolex/watchmaking.html · https://www.rolex.com/en-us/watches/day-date/features `[snippet]` · https://newsroom.rolex.com/watches/oyster-collection `[snippet]` · https://www.rolex.com/watchmaking/our-signature `[snippet]` · https://www.rolex.com/en-us/store-locator/germany `[snippet, nav only]`

**HERO.** The rolex.com homepage could not be read. The syndicated collection page shows the Rolex pattern at collection level: one still banner image, the collection name as headline ("Rolex Day-Date", 2 words), a two-word tagline beneath ("Ideal accomplishments"), then a single intro sentence ("When midnight strikes, the Oyster Perpetual Day-Date forms a bridge between past and future."). No button in the hero; the first interactive elements are the model cards below. Rolex taglines are noun phrases, never imperatives: "Where a new world begins" (New watches 2026), "Second-hand, new life" (Certified Pre-Owned), "The ultimate watch of prestige" (Day-Date), "The classic watch of reference" (Datejust), "The reference among divers' watches" (Submariner) `[snippet, newsroom]`.

**MENU.** Rolex's own nav (from store-locator page snippets) lists "Rolex watches and accessories" as a family list (Air-King, Cosmograph Daytona, Datejust, Lady-Datejust, Day-Date, Explorer, …) plus a "Shortcuts" group: "Find your Rolex", "Configure Rolex watches" / "Configure your Rolex", "Frequently Asked Questions", "Store locator". The syndicated sub-nav is nine text items: Discover Rolex · Rolex watches · New watches 2026 · Rolex accessories · Watchmaking · Servicing · Oyster Story · Rolex at [Jeweler] · Contact us. No images in the menu text; the collection tiles under "Keep exploring" are a 17-link image grid, one per family.

**PRODUCT LISTING.** Card anatomy is rigidly fixed, four lines, no badges, no stars:
1. brand label "Rolex"
2. model name with size: "Day-Date 40", "Datejust 41", "Land-Dweller 36"
3. spec line in one invariant grammar: `Oyster, 40 mm, white gold` (case type, diameter, material) — e.g. "Oyster, 36 mm, platinum and diamonds", "Oyster, 43 mm, Oystersteel and yellow gold"
4. price: "$54,200"

Reference numbers never appear on cards (only in the URL: M228239-0033). Listing headline is "Browse our selection of Rolex watches". Filters ("Filter your search") are in human words: Collections (17) · Model size: "Small size", "Mid-size", "Large size" · Material: Oystersteel, Oystersteel and gold, Yellow gold, Pink gold, White gold, Platinum, RLX titanium · Dial: "Light dial", "Colored dial", "Dark dial", "Gem-set dial" · Price bands. Sort: "Sort by features", price low/high. 18 cards then "More results". Image background could not be verified from text (all alt text is the model name).

**PRODUCT PAGE.** Title grammar: model name + size as the H1 ("Day-Date 40"), spec line as subtitle ("Oyster, 40 mm, white gold"), reference ("M228239-0033"), price with a plain disclosure: suggested retail price "before applicable taxes", prices can change without notice. Then the order is:
1. Gallery: four distinct views (upright and three "slide" views), all alt-texted "Day-Date 40".
2. Service blocks first, product features second: "Rolex Guarantee" → "The green seal" → "Rolex presentation box".
3. Feature blocks, each a heading + one paragraph + its own detail photograph: "Fluted bezel" ("The Rolex fluted bezel is a mark of distinction."), "Olive-Green Dial" ("The sunray finish creates delicate light reflections."), "18 kt white gold" ("By operating its own exclusive foundry, Rolex has the unrivalled ability…").
4. "Model availability" (hand-assembled, limited; ask the jeweler).
5. Technical details as a label : value table — Reference · Model case ("Oyster, 40 mm, white gold") · Water-resistance ("Waterproof to 100 metres / 330 feet") · Bezel ("Fluted") · Dial ("Olive green") · Bracelet ("President, semi-circular three-piece links") · Movement ("Perpetual, mechanical, self-winding") · Caliber ("3255, Manufacture Rolex") · Power reserve ("Approximately 70 hours") · Certification ("Superlative Chronometer").
6. CTAs: "Download brochure", "Send us a message", "Request an Appointment".
7. "Keep exploring" family grid.

On rolex.com proper the collection-level "features" page carries the mechanism essays (day display in "more than 20 languages", "interconnected disc mechanism", President bracelet "Designed especially for the Day-Date at its launch in 1956", calibre 3255, dial "available in a wide array of variations") `[snippet]`, and model pages end with "Discover all models" `[snippet]`.

**BUILDER / VARIANTS.** No swatches, no dropdowns on the model page. Every dial/metal combination is its own page; you move between them through the family's "all models" grid and the Model size / Material / Dial filters. Rolex's "Configure your Rolex" exists as a nav entry but could not be read; the syndicated catalog omits it entirely, which suggests it is a Rolex-hosted tool rather than part of the catalog feed.

**Unique.** Rolex writes the way it builds: one grammar for every card, one table for every spec, one tagline shape for every family, and the service promise (guarantee, seal, box) placed above the product's own features.

### 1.2 Patek Philippe (patek.com)

Sources: https://www.patek.com/en/home · https://www.patek.com/en/collection · https://www.patek.com/en/collection/nautilus · https://www.patek.com/en/collection/calatrava · https://www.patek.com/en/collection/nautilus/5811-1G-001 · https://www.patek.com/en/collection/all-models · https://www.patek.com/en/manufacture (resolves to "Our Values") · https://www.patek.com/en/service

**HERO.** Looping video. Headline: "Watch Art" Grand Exhibition Milan 2026 (6 words). Support line: "Open to the public, free admission, reservations recommended." CTA: "Discover more". The hero is an event, not a product; the first product appears in the second band ("Gondolo Ladies First": "A fresh new style infused with retro appeal, finely balanced between history and modernity." → "Discover more"). The rest of the homepage is the house before the catalog: "The power of independence" / "The last family-owned Genevan manufacture" → "A long-term vision" / "Innovation and Tradition" → "Preserving for the Future" / the museum → "Our collections" ("over 150 references in regular production") → "Our commitment to service" → "Points of Sale". Image captions are facts: "Spanning over 133,650 square meters", "All the watch parts we produce are hand finished".

**MENU.** Six top-level text items: Manufacture · Collection · Service · Museum · Points of Sale · Contact. No images in the menu. "Collection" opens the eleven families plus "Find your timepiece".

**COLLECTION HUB.** Page heading "A legacy of timepieces" then "Our collections". Each family is a block: press photo of one watch, tagline as the heading, family name as the subheading, "Discover more". Taglines are four to six words and never repeat a construction twice in a row: "The pinnacle of watchmaking" · "A supreme test of ingenuity" · "The quintessential round watch" · "The Art Deco Spirit" · "A perfect harmony of proportions" · "Unmistakable elegance" · "Sporting elegance" · "Modern, sporty and chic" · "24 hours of elegance" · "The seal of tradition" · "The Contemporary Collection".

**COLLECTION PAGE.** Eyebrow / headline / subhead triplet, every time: "Sporting Elegance" / "Nautilus" / "The Elegant Sports Watch"; "Legendary Purity" / "Calatrava" / "The Quintessential Round Watch". One intro paragraph, then alternating feature sections with eyebrow + heading ("Synonymous with Simplicity" / "Timeless Elegance"; "Bauhaus Influence" / "Form Follows Function"; "Emblematic Bezel" / "Clous de Paris") and short feature captions tied to a part of the object: "Iconic case inspired by a ship's porthole", "Horizontally embossed pattern with date in aperture", "Contrasted polished and satin finishings". Then "Current Collection": three or four cards, then "Find your Nautilus" to the full list.

**PRODUCT LISTING.** Card = image / reference ("5811/1G-001") / uppercase function line ("DATE. SWEEP SECONDS.", "PERPETUAL CALENDAR") / material ("white gold"). No price, no name beyond the family. The watch-finder adds a collection line and a year tag ("2026 / Watch Art Milan") and a count ("283 models displayed"). No filter labels were visible in the fetched text.

**PRODUCT PAGE.** Title: "Nautilus ref. 5811/1G-001 White Gold" (family · "ref." · reference · material). Price is shown ($82,021) with no cart. Description opens with a thesis sentence ("A reinterpretation of a cult design, this model is distinguished by its white gold case and bracelet") then one sentence per part. Technical data is grouped under four headings — Dial, Case, Bracelet, Movement — each a dense label list (Case: material, diameter measured "10-4 o'clock", thickness, water resistance, crown, case back; Movement: caliber, functions, diameter, thickness, parts, jewels, power reserve "min. 35 hours – max. 45 hours", rotor, balance, frequency, spring, "Distinctive sign: Patek Philippe Seal"). CTAs: "Download" (instructions PDF), "Play Video", "Explore more". Photography (from filenames): front/back, soldier ("SDT"), back ("DOS"), three-quarter 3 o'clock and 9 o'clock ("PRO_3H", "PRO_9H"), close-ups of movement, dial, bracelet, clasp, plus a product film. No swatches; related models are listed as text with their metal ("5811/1460G-001 White gold", "5712/1R-001 Rose gold", "5726/1A-014 Steel").

**BUILDER.** None. Choice is made by moving between references; the finder is the only "configurator".

**Unique.** Patek is the only site where the house precedes the product on the homepage and where every family, page and section is introduced by an eyebrow/headline/subhead triplet; the technical sheet is the longest and the most honest on the web (power reserve as a range, parts count, jewels).

### 1.3 Audemars Piguet (audemarspiguet.com)

Sources: https://www.audemarspiguet.com/com/en/home.html · https://www.audemarspiguet.com/com/en/about.html · https://www.audemarspiguet.com/com/en/collections.html · https://www.audemarspiguet.com/com/en/watch-collection/royal-oak/15510ST.OO.1320ST.09.html

**HERO.** Headline "Crafting time since 1875" (4 words) with a 32-word paragraph beginning "Our craftsmanship thrives at the crossroads of tradition and innovation." No CTA in the hero at all. The homepage then sells places and experiences, not watches: "EXPLORE OUR AP HOUSES" → "Musée Atelier Audemars Piguet" → "Watchmaking Experiences" → "AP CHRONICLES" → "Find a boutique" → newsletter. Every section ends in "Discover more" or "Explore".

**MENU.** Not recoverable from text (JS-rendered). The collections hub stands in for it: six collections, each a card with name, one-line tagline and "View Collection": "Code 11.59 by Audemars Piguet" — "Classic by nature, unconventional by design." · "Royal Oak" — "From avant-garde to icon." · "Royal Oak Offshore" — "A daring and sportier take on the Royal Oak." · "Royal Oak Concept" — "A high-tech approach to Haute Horlogerie." · "Neo frame" — "Vintage elegance meets modern innovation." · "Établisseurs" — "A Sanctuary for Rare Craftsmanship."

**PRODUCT LISTING.** Not readable (client-rendered grid).

**PRODUCT PAGE.** Title grammar is three stacked lines: name ("Royal Oak") / complication subtitle in italics ("Selfwinding") / "Ref. 15510ST.OO.1320ST.09". Size and material are not in the title; they open the description: "This 41 mm Royal Oak Selfwinding in stainless steel sports the collection's ergonomic design evolution…" Price is a client-side template (`{{ priceData.formatedPrice }}`), i.e. shown only when the market allows. The page is built as an owner's page as much as a shopper's: "Save to Favourites", "Return to My Collection", "Serial no.", "View Interactive User Manual", "Warranty", "Service", "Plan an Appointment", "Find a Boutique". No spec table in the fetched text; no variant selector.

**BUILDER.** None. "Save to Favourites" / "My Collection" is the only personal state.

**COPY ANCHORS.** The About page is a place and a date, repeated: "Our Heritage: Born in Le Brassus"; "For 150 years, our story has been rooted in Le Brassus, a small village that went on to do rather big things."; "Here in Le Brassus, where it all started in 1875."; "Audemars Piguet is more than a company. It remains independent and family owned"; "CRADLE OF COMPLICATED WATCHES"; "A SPIRIT OF INDEPENDENCE".

**Unique.** AP writes taglines as paradoxes (classic/unconventional, avant-garde/icon) and leads with a village and a year rather than a product; the PDP doubles as the owner's service record.

### 1.4 Roberto Coin (robertocoin.com)

Sources: https://www.robertocoin.com/ · https://www.robertocoin.com/collections/cobra · https://robertocoin.com/products/bracelet-diamonds-love-in-verona · https://robertocoin.com/pages/the-brand · https://robertocoin.com/pages/concierge · https://robertocoin.com/pages/prestige-service · https://robertocoin.com/pages/product-care

**HERO.** One still image (the Cobra bangle). Headline "The unmistakable character of Cobra." (5 words). CTA "Discover the collection". A second promo band: "Timeless designs, made to be treasured. Find the perfect gift." → "Discover more." Then "Cobra Collection" ("An icon, reimagined. Sculptural design inspired by the strength of the King Cobra.") and "Our best sellers" with category chips (Necklaces, Earrings, Rings, Bracelets, Bangles) above product grids with name, price and three metal variants (18kt yellow, white, rose).

**MENU.** Four top-level items: Best Sellers · Jewelry · Occasions · Maison. Utility: Find a boutique · Concierge · Log in. The leanest menu in the set.

**PRODUCT LISTING (Cobra).** Page title "cobra" (lowercase), intro "An iconic design reimagined through sculptural movement and timeless elegance.", category tabs (Bangles, Rings, Earrings, Necklaces, Bracelets) and a count ("34 Pieces View all"). The story is collapsed under "Read more". Card = image carousel (front, side, back, on-model; hover switches image) / "New" badge / uppercase name / price in euros, "From" when variants differ. Filters: Type · Collection · Metal Color (18kt white gold, 18kt yellow gold) · Stone (Diamond, Enamel) with "View 34 items"; sort includes Featured, Best selling, A–Z, price. 24 of 34 shown, "Load more". Trust bar in caps: "FREE SHIPPING", "14-DAYS RETURNS", "2-YEARS WARRANTY", "GIFT PACKAGING".

**PRODUCT PAGE.** Eyebrow = collection ("LOVE IN VERONA"); title uppercase = collection + piece + stones ("LOVE IN VERONA BANGLE WITH DIAMONDS"); "Regular price €18.400". Selectors: three metal swatches with thumbnails labelled "18kt yellow gold / 18kt white gold / 18kt rose gold"; size options ("46X56", "48X58") with "Notify me" when out. Description: "Diamonds illuminate this dazzling bangle by Roberto Coin featuring 18kt gold and the uniqueness of an handmade jewel." / "Available in rose, yellow and white gold." Specs: SKU · "Weight (total): 2.27 CT" · "Purity: VS" · "Color: G" · "Cut: round brilliant" · and the honesty line "Being a handmade product, the above characteristics may undergo slight variations." Accordions: Details · Care · Commitments. CTAs: "Add to cart", "I need help with sizing", "Ask our concierge", "Send a hint", "Book a video appointment". Then "The Ruby" signature block, "Our Exclusive Gift Box", "2-Year Warranty", "More LOVE IN VERONA", "More Bracelets", "Recently Viewed". Photography includes an explicit model shot and per-metal variant shots.

**HOUSE COPY.** "Daring Grace" / "Since 1996"; "Roberto Coin is based in Vicenza, the City of Gold…"; "Fashion is changeable. It is whimsical. Style is not."; "Roberto Coin signs each piece with a small ruby cast inside, touching the wearer's skin"; "…creates over 600 new designs annually." Service pages are titled as arts: "The Art of Personal Assistance" (Concierge), "The Art of Protecting Beauty" (Prestige Service: "A complimentary 2-years program designed to protect your Roberto Coin jewel against theft, robbery, and irreparable accidental damage."), "Precious Moments of Care" (Product Care, split EVERYDAY CARE / CLEANING AT HOME / STORAGE by material).

**Unique.** Roberto Coin is the one jewelry site here that runs a modern Shopify stack (hover-to-model cards, "Send a hint", swatches, trust bar) and still reads like a house, because the eyebrow/uppercase-title grammar, the signature ruby block and the "Art of…" service names do the house work.

### 1.5 Re-looks (only the items asked for)

**Tiffany & Co.** (snippets only: https://www.tiffany.com/engagement/engagement-ring-customization/ · https://www.international.tiffany.com/personalize · https://www.tiffany.com/designers-collections/tiffany-t/diamond/ · https://www.tiffany.com/jewelry/earrings/tiffany-hardwear-ball-earrings-GRP03142/tiffany-hardwear-ball-earrings-11408362)
- Hero/banner: the site-wide header banner reads "Inspired by New York, HardWear is an expression of love's strength. Shop the collection." (place + collection + abstract noun + imperative).
- Ring Studio headline: "Designed by You. Crafted by Tiffany." Flow is advisor-led, not self-serve: "A Tiffany Diamond Expert will collaborate with you to create an engagement ring…"; settings named as a list (the Tiffany Setting, solitaire, prong, bead, pavé, cathedral, burnish); you "book a consultation".
- Personalization line: "Some objects you own, others you define."
- Collection grammar: "A homage to an iconic motif from 1975, T by Tiffany is an expression of love's endless potential." (year + motif + "expression of love's …", the same mould as HardWear).
- Could not read: homepage hero media, mega menu, PLP card, PDP accordions this round (see study 01 for the Blue Box accordion).

**Van Cleef & Arpels** (snippets only: https://www.vancleefarpels.com/en/the-maison/series.html · https://www.vancleefarpels.com/us/en/events/the-alhambra-collection-the-van-cleef-arpels-icon-of-luck.html · https://www.vancleefarpels.com/es/en/the-maison/articles/luck-at-van-cleef---arpels.html · https://www.vancleefarpels.com/tw/zh/collections/engagement/your-poetic-setting.html)
- Copy anchors: "The Alhambra® collection, a jewelry icon since 1968"; "Alhambra, the Maison's icon of luck"; "Luck is in sight"; Jacques Arpels picked four-leaf clovers for his staff and sent them with the poem "Don't Quit". The register is luck, poetry, enchantment, "the Maison", ® on every name.
- Builder: "Your Poetic Setting®" — a curated semi-custom ring: five setting families (Romance, Bonheur, Couture, Estelle, Perlée), diamonds D–E colour, IF–VVS2 clarity, carat ranges that differ by market. Appointment-led.
- Could not read: hero, menu, PLP card, PDP.

**Cartier** (https://www.cartier.com/en-us/ · https://www.cartier.com/en-us/jewelry/rings/ · https://www.cartier.com/en-us/jewelry/bracelets/love-bracelet-B6035517.html · Set For You via https://www.thejewelleryeditor.com/jewellery/article/cartier-diamond-engagement-rings-and-set-for-you-engagement-service/ and https://openers.jp/en/watch-and-jewelry/watch-and-jewelry_jewelry-news/QBRU8)
- Hero: "Endless love" (2 words) + a 15-word line ("The new LOVE Unlimited selection features diamonds in the place of the iconic screw motif.") + "Discover the selection". Product tiles directly under the hero show name + price + "ADD TO BAG".
- Menu: eight top-level items (High Jewelry · Jewelry · Watches · Bags and accessories · Fragrances · Home & Stationery · News · La Maison). The Jewelry panel = left text list (All Collections, Bracelets, Rings, Necklaces, Earrings, Engagement rings, Wedding bands, Cartier Jewelry, Advice and services) + a "Be Inspired" row of four image tiles (Virtual try-on, Engrave Your Creation, Latest creation, Wishlist jewelry for him) + collection image grids.
- PLP card ("All rings", "344 Models", intro "Cartier rings have character."): optional "NEW" badge / image / name in the form `collection + piece + stone count` ("LOVE Unlimited ring, 6 diamonds") / material descriptor ("White gold, diamonds") / price / inline size selector / "Product details" / "Add to Bag" or "GET NOTIFIED". A "Shop The Look" tile sits inside the grid. Filters: Available Online, NEW, Her/Him, Collection (27 names), Metal (White/Rose/Yellow Gold, Platinum, 3-Gold), Paving (Non-paved/Paved/Semi-paved), Stone Shape, Engraving. Sort: Recommended, price.
- PDP: title "LOVE bracelet, classic model"; $7,950; "CHOOSE CLOSURE SYSTEM" as two labelled image options (ORIGINAL / SINGLE-SCREW); "Select Size" dropdown 15–22 cm; other metals as text links; spec bullets ("18K yellow gold (750/1000)", "Width: 6.1mm", "Fastening system: two functional screws", "Comes with a screwdriver"); accordions Instructions for use · Sizing guide · CARE · Gift Wrapping · Shipping / return; CTAs Add to Bag · Add to Wish List · Book an Appointment · Contact an ambassador · "CLICK HERE TO TRY ON" (image 1 of 10 is a QR code for virtual try-on); a lifestyle image filename ends "_Worn".
- Builder: Set For You = choose one of ~14–15 named settings → gold → a GIA-reported center stone (0.18–2.99 ct in press accounts) → ~3 weeks; complimentary engraving and box embossing. Lives on a separate subdomain.

**Harry Winston** (https://www.harrywinston.com/en · https://www.harrywinston.com/en/fine-jewelry · https://www.harrywinston.com/en/the-house)
- Hero: "Majestic Escapes by Harry Winston" (5 words) + "The most exclusive destinations inspire jewels of surpassing beauty." + "Discover".
- Menu: seven items (The House · High Jewelry · Fine Jewelry · Engagement and Bridal · Watches · Accessories · Services). Panels are text-only, grouped "By Collection" / "By Category", each ending in two CTAs ("Explore Sunflower", "Explore Forget-Me-Not"; "Explore Engagement Rings", "Schedule an Appointment").
- Listing (Fine Jewelry hub): tiles = small "Explore" label / collection name / one-line descriptor / image; no prices anywhere; feature banners with "DISCOVER". Intro: "Diamond jewelry designs set in platinum or gold from the House of Harry Winston reflect a longstanding tradition of creativity, rarity and quality without compromise."
- House copy: "King of Diamonds"; "Mr. Winston"; "Rare Jewels of the World"; "Our Stones" / "Our Craftsmanship" / "Our Design" / "Savoir-Faire & Métiers d'Art"; the refrain "We look forward to welcoming you to the extraordinary world of Harry Winston, where our legacy becomes yours." appears twice on the homepage.

**David Yurman** (https://www.davidyurman.com/ · https://www.davidyurman.com/womens/collections/the-cable-collection.html · https://www.davidyurman.com/womens/charms-and-amulets/sculpted-cable-locket-in-18k-yellow-gold-24mm-D17954+88.html · https://www.davidyurman.com/world-of-yurman/stories/heritage/making-of-sculpted-cable-collection.html)
- Hero: looping video with play/pause/mute; headline "Sculpted Cable" (2 words); support "As Seen On Eiza González"; CTA "Shop The Women's Collection". A utility bar above: "Complimentary overnight shipping", "Book an appointment", "Contact Us".
- Menu: seven items (Women's · Men's · Gifts · Collections · Wedding · High Jewelry · World of Yurman). Panels: "Shop by category" / "Material" / "Featured" text columns + two image tiles + a "Shop the Campaign" column. Gifts adds "By Occasion" and "Gifts by Price".
- PLP card: badge ("Most Loved", "New Arrival", "DY Exclusive") / metal-count label ("2 metals") / image with stone/metal swatch thumbnails and "+N" / name with dimension ("Micro Cable Flex® Buckle Bracelet 2.6mm") / price or range ("$2,050 - $2,150") / metal line ("Sterling Silver with 14K Yellow Gold"). Filters: PICK UP · Material · Type · Price · Color · Stone · Size · Sub Collection, with counts; "View results (156)"; "Load More (124 Products)".
- PDP: title "Sculpted Cable Locket" / subtitle "18K Yellow Gold, 24mm" / "$5,950"; one metal swatch; size dropdown; "Deliver to address" or "Pick up at David Yurman boutique"; CTAs "Add to Bag", "Contact a Diamond Specialist", "Wish List"; gallery = 4:5 main image, on-model image, four alternates, two videos; "Details" opens "Inspired by his love of architecture and bas relief sculpture," and states in bold "Locket only; chain not included."; spec bullets include dimensions, "Style #", UPC; accordions Details · Care ("Do not use abrasive cleaners, steamers or ultrasonic machines.") · Gifting · Inspiration · Craftsmanship.
- Story page: hero → date byline → jump-link bar (Beginnings, Inspiration, Design Language, Materials, Legacy) → text block then image with "Shop the look", repeated; founders by first name ("When Sybil and David Yurman first met in 1969…", "In 1982, the very first Cable bracelet debuted…", "Sybil and David Yurman's son, Evan…"); pull quotes from Sybil.

**Ralph Lauren.** Unreadable this round (redirect loop on three country sites). One snippet survives: the 867 collection watch page says the collection is "Named after our first New York City flagship at 867 Madison Avenue" and "embodies Art Deco–inspired elegance" (https://www.ralphlauren.com/638333.html `[snippet]`). RL names product lines after street addresses (867, 888 Madison), which is the most American naming device in the set. For the RL hero, menu and PDP, use study 01.

---

## 2. Copy register

### 2.1 Quote bank (verbatim, each under 15 words)

| # | House | Line | Source |
|---|---|---|---|
| 1 | Rolex | "Ideal accomplishments" | tinyjewelbox.com/discover-rolex/rolex-day-date.html (Rolex catalog text) |
| 2 | Rolex | "When midnight strikes, the Oyster Perpetual Day-Date forms a bridge between past and future." | same |
| 3 | Rolex | "The Day-Date is the watch of a global, multicultural and ever-changing world." | same |
| 4 | Rolex | "The Day-Date speaks its wearer's language" | same |
| 5 | Rolex | "Decades come and go, but the Day-Date remains where it has always been" (fragment) | same |
| 6 | Rolex | "The Rolex fluted bezel is a mark of distinction." | tinyjewelbox.com/discover-rolex/rolex-day-date/M228239-0033.html |
| 7 | Rolex | "The sunray finish creates delicate light reflections." | same |
| 8 | Rolex | "At the heart of Rolex philosophy and activities lies a long-term vision." | tinyjewelbox.com/discover-rolex/watchmaking.html |
| 9 | Rolex | "When midnight strikes, these two indicators change over in the blink of an eye." | rolex.com/en-us/watches/day-date/features `[snippet]` |
| 10 | Rolex | "The ultimate watch of prestige" · "The classic watch of reference" | newsroom.rolex.com/watches/oyster-collection `[snippet]` |
| 11 | Patek | "The last family-owned Genevan manufacture" | patek.com/en/home |
| 12 | Patek | "A fresh new style infused with retro appeal, finely balanced between history and modernity." | patek.com/en/home |
| 13 | Patek | "All the watch parts we produce are hand finished" | patek.com/en/home |
| 14 | Patek | "A Patek Philippe is far more than a means of telling the time:" | patek.com/en/manufacture (Our Values) |
| 15 | Patek | "Your relationship with us begins the day you purchase one of our timepieces." | patek.com/en/service |
| 16 | Patek | "Iconic case inspired by a ship's porthole" | patek.com/en/collection/nautilus |
| 17 | Patek | "The pinnacle of watchmaking" · "A supreme test of ingenuity" · "24 hours of elegance" | patek.com/en/collection |
| 18 | AP | "Crafting time since 1875" | audemarspiguet.com/com/en/home.html |
| 19 | AP | "Our craftsmanship thrives at the crossroads of tradition and innovation." | same |
| 20 | AP | "Classic by nature, unconventional by design." · "From avant-garde to icon." | audemarspiguet.com/com/en/collections.html |
| 21 | AP | "Here in Le Brassus, where it all started in 1875." | audemarspiguet.com/com/en/about.html |
| 22 | AP | "…a small village that went on to do rather big things." (fragment) | same |
| 23 | Roberto Coin | "The unmistakable character of Cobra." | robertocoin.com |
| 24 | Roberto Coin | "Fashion is changeable. It is whimsical. Style is not." | robertocoin.com/pages/the-brand |
| 25 | Roberto Coin | "An icon, reimagined. Sculptural design inspired by the strength of the King Cobra." | robertocoin.com |
| 26 | Roberto Coin | "Being a handmade product, the above characteristics may undergo slight variations." | robertocoin.com/products/bracelet-diamonds-love-in-verona |
| 27 | Cartier | "Cartier rings have character." · "Endless love" | cartier.com/en-us/jewelry/rings/ · cartier.com/en-us/ |
| 28 | Cartier | "The LOVE collection began with the iconic bracelet created in New York in 1969." | cartier.com/en-us/jewelry/bracelets/love-bracelet-B6035517.html |
| 29 | Harry Winston | "The most exclusive destinations inspire jewels of surpassing beauty." | harrywinston.com/en |
| 30 | Harry Winston | "Timeless elegance meets contemporary design, inspired by Mr. Winston's preferred cut." | harrywinston.com/en |
| 31 | David Yurman | "A balance of beauty and strength defines the Sculpted Cable collection." | davidyurman.com/world-of-yurman/stories/heritage/making-of-sculpted-cable-collection.html |
| 32 | David Yurman | "Locket only; chain not included." · "Do not use abrasive cleaners, steamers or ultrasonic machines." | davidyurman.com (Sculpted Cable Locket PDP) |
| 33 | Tiffany | "Designed by You. Crafted by Tiffany." · "Inspired by New York, HardWear is an expression of love's strength." | tiffany.com `[snippet]` |
| 34 | Van Cleef & Arpels | "Alhambra, the Maison's icon of luck" · "Luck is in sight" | vancleefarpels.com the-maison/articles `[snippet]` |
| 35 | Ralph Lauren | "…the 867 collection embodies Art Deco–inspired elegance" (fragment) | ralphlauren.com/638333.html `[snippet]` |

### 2.2 How the registers differ

**Rolex — the object is the grammatical subject; the house almost never says "we".** Sentences run 8–14 words, one idea each, present tense, declarative. The subject is the watch or the part ("The Day-Date is…", "The fluted bezel is…", "The sunray finish creates…"), the time of day is a recurring character ("When midnight strikes…", "the miracle of midnight"), and every romantic claim is attached to a mechanism, a material or a year (1956, 26 languages, calibre 3255, "own exclusive foundry"). Vocabulary: prestige, precision, distinction, superlative, accomplishments, modernity. Taglines are noun phrases with no verb ("Ideal accomplishments", "Where a new world begins"). The adjectives are few and all earned by a noun. Specs never appear in prose; they live in a table.

**Patek Philippe — first-person plural, family and generations, longer sentences.** "We", "our", "us" everywhere ("We have been pursuing…", "we pledge to service, repair, or restore…", "Your relationship with us begins the day…"). The lexicon is lineage and duty: family-owned, independence, tradition, pledge, responsibility, relationship, generations, heritage, "welcome into your own family". Patek claims superlatives as plain fact ("The pinnacle", "the quintessential", "the last family-owned") and structures every unit as eyebrow / headline / subhead. Sentences run longer (15–25 words) and often carry a colon or a pair ("Innovation and Tradition", "history and modernity").

**Audemars Piguet — place, date and paradox.** Few pronouns; the anchor is a village and a year ("Le Brassus", "1875", "Vallée de Joux", "150 years"). Taglines are built on contrast ("Classic by nature, unconventional by design", "From avant-garde to icon", "Vintage elegance meets modern innovation") and the About page allows wry understatement ("a small village that went on to do rather big things") that no French house would risk. Capitalised section labels ("CRADLE OF COMPLICATED WATCHES", "A SPIRIT OF INDEPENDENCE").

**Roberto Coin — Italian warmth, aphorism, and honest small print.** "Discover" is the verb of the site; adjectives are warmer and more frequent (unmistakable, dazzling, timeless, sculptural); the house speaks in aphorism ("Fashion is changeable… Style is not."); service is named as an art ("The Art of Protecting Beauty"); and the PDP carries a plain disclaimer in the same breath as the romance.

**Van Cleef & Arpels — enchantment.** Luck, poetry, fairy tale; "the Maison"; registered marks on names; a founder who mailed clovers with a poem. Soft, feminine, third person about "the Maison", never about a mechanism.

**Cartier — French-English of "creations" and "character".** "Creation" not product, "ambassador" not advisor, "the Maison", and short punchy heads ("Endless love", "Cartier rings have character."). Title grammar is `collection, piece, descriptor` with commas ("LOVE bracelet, classic model").

**Harry Winston — grandeur in the third person.** "The House", "Mr. Winston", "King of Diamonds", "surpassing beauty", "rarity", "without compromise", "where our legacy becomes yours". Long nominal sentences, few verbs of action.

**David Yurman — the American art-studio voice.** Founders by first name in the present tense, the vocabulary of sculpture and architecture (bas relief, S-curve, "lines of beauty"), dimensions inside product names ("…Buckle Bracelet 2.6mm"), and blunt practical lines on the PDP ("Locket only; chain not included."). It is the only house whose stories read like a magazine profile rather than a brochure.

**Ralph Lauren — autobiography and address.** (From study 01 plus the 867 snippet.) First person singular from the founder ("It all started with a tie…"), and product lines named for street numbers on Madison Avenue. Where Europe names a village, RL names a storefront.

Net: Swiss = mechanism and year, object as subject, no exclamation, table for specs. French = Maison, creation, enchantment. American (DY, RL, Tiffany) = place names, first names, a plain practical sentence, and the formula "X is an expression of love's Y".

---

## 3. Builders and configurators, compared

| Site | Self-serve builder? | How metal/dial/stone is chosen | UI form | Live price? |
|---|---|---|---|---|
| Rolex | No. "Configure your Rolex" exists in nav but could not be read; the catalog has no configurator. | Every metal/dial combination is a separate model page; "Find your Rolex" filters by Collection, Model size (Small/Mid/Large), Material, Dial (Light/Colored/Dark/Gem-set), Price. | Filter chips + grid; model pages link "Discover all models". No swatches. | Price per reference, "before applicable taxes". |
| Patek | No. | Separate references; "Find your timepiece" lists reference / collection / material / year; related models named with metal in text. | Text list. | Price shown, no cart. |
| Audemars Piguet | No. | Separate references; "Save to Favourites" / "My Collection". | None. | Templated by market. |
| Roberto Coin | Partial (variant picker). | Three metal swatches with thumbnails; size options; "Notify me". | Swatches + buttons. | Yes; "From" on PLP. |
| Cartier | LOVE PDP: closure as two labelled images; size dropdown; metals as text links. Set For You (separate subdomain): ~14–15 named settings → gold → GIA-graded center stone 0.18–2.99 ct. | Images for the structural choice, dropdown for size, text for metal; Set For You is step-wise. | Mixed. | LOVE yes; Set For You not readable (press: "from" pricing). |
| Tiffany | Ring Studio is advisor-led ("Designed by You. Crafted by Tiffany."); settings offered as a named list; book a consultation. | Shape, setting, metal with a Diamond Expert. | Appointment funnel. | Not online. |
| Van Cleef & Arpels | Your Poetic Setting®: five setting families, D–E / IF–VVS2 stones, curated carats. | Curated, appointment-led. | Appointment funnel. | Not online. |
| David Yurman | Variant picker. | Swatch thumbnails on PLP cards ("+N"), swatch + size dropdown on PDP, "CHOOSE YOUR WIDTH" heading. | Swatches. | Yes; ranges on PLP. |

Reading: the watch houses do not configure; they *enumerate* and let you filter in plain words. The jewelers that do configure show the structural choice as pictures (Cartier's closure, Roberto Coin's metal thumbnails) and the numeric choice as a dropdown. Only the digital-native brands (study 01: VRAI, Graff's stone list) itemize a live price.

---

## 4. What is unique about each site

- **Rolex:** one grammar for everything — card, title, spec line, tagline — and the service promise placed above the product's own features on the model page.
- **Patek Philippe:** the house precedes the product on the homepage; eyebrow/headline/subhead on every unit; the most complete and candid technical sheet online.
- **Audemars Piguet:** sells a village, a museum and an experience before a watch; taglines as paradox; the PDP is also the owner's warranty and service record.
- **Roberto Coin:** a four-item menu, a trust bar and a "Send a hint" button that still read as a house because of the eyebrow/uppercase title grammar, the signature-ruby block and "The Art of…" service names.
- **Tiffany:** every collection line is cast in the same mould, "[place/year] … an expression of love's [noun]"; customization is a consultation, not a tool.
- **Van Cleef & Arpels:** luck as the house's single theme, down to a founder who mailed clovers with a poem.
- **Cartier:** product tiles with prices directly under a two-word hero; a 27-collection filter; closure shown as pictures; a QR code as the first gallery image.
- **Harry Winston:** text-only mega menu with two "Explore" CTAs per panel; a refrain repeated on the same page; no prices anywhere.
- **David Yurman:** founders by first name, dimensions in product names, metal-count badges, and the bluntest honesty lines on any PDP.
- **Ralph Lauren:** lines named after street addresses; the founder's autobiography as the house story.

---

## 5. Synthesis for American Jewelry

### 5a. Ten layout rules to adopt

1. **Hero: one subject, a headline of six words or fewer, one support line under fifteen words, one button or none.** Patek (6 words + 1 line + "Discover more"), Roberto Coin (5 + CTA), Cartier (2 + 15-word line + CTA), AP (4 words, no CTA), HW (5 + 1 line + "Discover"), DY (2 + attribution + CTA). The hero names a design or an event, never a sale.

2. **Navigation: four to seven text items; images only in the "inspire" row of the panel.** Roberto Coin 4, Patek 6, HW 7, DY 7; Cartier's 8 reads as sprawl. Panel pattern to copy: Cartier's left text list + a single "Be Inspired" row of four image tiles (Build your ring, Engrave, Newest design, Book Brentwood / Mt. Juliet). Proposed: `The House · Royal American · Jewelry · Bridal · Build · Services · Visit` (as in study 01).

3. **Every design and every tier gets a one-line tagline, and the hub shows name + tagline + one link.** AP's six-card hub and Patek's eleven-card hub prove a collection needs no grid to be sold. Give each American Jewelry design a four-to-six-word tagline and show the three tiers the same way.

4. **Collection/design pages open with an eyebrow / name / subhead triplet, then three feature captions tied to a part.** Patek: "Sporting Elegance" / "Nautilus" / "The Elegant Sports Watch", then "Iconic case inspired by a ship's porthole". For a ring design: eyebrow (its idea), name, subhead (what it is), then captions for the setting, the band, the finish, each with its own photograph.

5. **Product card = four lines in a fixed grammar, no stars, no urgency.** Rolex: brand / name + size / `Oyster, 40 mm, white gold` / price. For us: design + piece / `Americana · 18k yellow gold · natural 1.0 ct` / price. Tier is a word in the spec line, not a badge. Borrow DY's "2 metals" count and Roberto Coin's hover-to-model second image; skip DY's three badge types.

6. **Filters in plain English, six groups or fewer.** Rolex: Collections · Model size (Small / Mid / Large) · Material · Dial (Light / Colored / Dark / Gem-set) · Price. Ours: Design · Piece · Metal · Stone (Natural / Man-made) · Carat · Price, plus DY's "Pick up" toggle for the two stores. No "Paving" or 27-collection lists (Cartier).

7. **PDP order: title → spec line → price with a tax note → gallery → service blocks → feature blocks with their own photos → technical table → appointment.** Rolex places Guarantee / Seal / Box before Bezel / Dial / Gold, then a label : value table. Patek groups the table (Dial, Case, Bracelet, Movement). Ours: Guarantee · Box · Care, then Setting · Band · Stone feature blocks, then a table (Design, Metal, Stone origin, Carat, Colour, Clarity, Cut, Width, Reference, Made in).

8. **One plain honesty line on every PDP.** Rolex: "suggested retail price before applicable taxes". Roberto Coin: "Being a handmade product, the above characteristics may undergo slight variations." DY: "Locket only; chain not included." Ours: "Price before Tennessee sales tax." / "Natural stones vary slightly from the photograph." / "Band only; center stone chosen in the builder."

9. **Variants: picture the structural choice, dropdown the number, page the rest.** Cartier shows closure as two labelled images; Roberto Coin shows metal as three thumbnails; both use a dropdown for size. Rolex and Patek make every other combination its own page with "Discover all models". Ours: metal and stone origin as labelled image chips (the two choices that change the piece and the tier), size as a dropdown, everything else a separate version page.

10. **Story pages alternate text and image, with "Shop the look" after every image and a jump-link bar at the top.** DY's "History of Sculpted Cable" (Beginnings · Inspiration · Design Language · Materials · Legacy) is the template; Patek's collection pages do the same with eyebrow headings. Never a story page without pieces to buy at the end (study 01's VCA lesson).

### 5b. Copy style guide — twelve rules, with before/after for American Jewelry

Conventions applied from the copywriting skill: clear over clever, specific over vague, active voice, no exclamation points, no buzzwords, show the outcome instead of the adverb, customer language. Luxury-house exception: the skill's "Learn more / Discover" ban holds for commerce CTAs but editorial links may say "Discover" (every house does). Design names and years below are placeholders in brackets where the fact is not yet confirmed; nothing here should ship without the real figure.

1. **Title grammar: Design name + piece + one descriptor; reference and tier on the line below.** (Rolex "Day-Date 40" / "Oyster, 40 mm, white gold"; Cartier "LOVE bracelet, classic model"; DY "Sculpted Cable Locket" / "18K Yellow Gold, 24mm".)
   Before: "Beautiful 14K Yellow Gold 1 Carat Diamond Engagement Ring"
   After: **Signal Solitaire, 1.0 ct** — `Americana · 18k yellow gold · Ref. AJ-SG-101`

2. **Hero headline is a noun phrase of six words or fewer; it need not contain a verb.** (Rolex "Ideal accomplishments"; AP "Crafting time since 1875"; Cartier "Endless love".)
   Before: "Discover Our Stunning New Collection of Fine Jewelry Today!"
   After: **One design. Your stone.** — or — **Made in Tennessee since [year].**

3. **Make the object the subject of the sentence. Say "we" only when a person is doing something.** (Rolex: "The fluted bezel is a mark of distinction." Patek: "we pledge to service, repair, or restore…")
   Before: "We are proud to offer our customers the finest craftsmanship."
   After: "The Signal band holds its stone in four claws, cut by hand at the bench in Brentwood."

4. **Anchor every romantic claim to a mechanism, a place or a year.** (AP "Le Brassus, 1875"; Rolex "1956", "26 languages"; Cartier "New York in 1969"; DY "In 1982, the very first Cable bracelet".)
   Before: "Expertly crafted with the highest quality materials."
   After: "Cast, set and polished on [Street], Brentwood, Tennessee, by [N] jewelers."

5. **Write taglines by contrast.** (AP "Classic by nature, unconventional by design."; Patek "finely balanced between history and modernity".) Use this for the three tiers so they define each other.
   Before: "Our three amazing collections for every budget."
   After: **Royal American** — "One of one. Never made again." · **Americana** — "Natural diamonds, American hands." · **New American** — "Grown diamonds. The same hands."

6. **Specs are a table; prose is for feeling. Never list numbers in a paragraph.** (Rolex label : value; Patek Dial / Case / Bracelet / Movement.)
   Before: "This gorgeous ring features a 1.02ct G VS2 round brilliant in 18k yellow gold with a 2.1mm band and weighs 4.3 grams."
   After (prose): "A round brilliant, held just above the band so the light reaches it from the side." (table): Stone · Natural round brilliant, 1.02 ct · Colour G · Clarity VS2 · Metal 18k yellow gold · Band 2.1 mm · Weight 4.3 g · Made in Brentwood, TN.

7. **Second person for service, third person for the object.** (Patek "Your relationship with us begins the day you purchase…"; Roberto Coin care copy addresses "your jewelry".)
   Care line, before: "Jewelry should be cleaned regularly to maintain its appearance."
   After: "Bring it to either store twice a year. We clean and check the claws while you wait; it costs nothing."

8. **One plain honesty line per page, in the same voice as the romance.** (Rolex tax note; Roberto Coin "slight variations"; DY "chain not included".)
   Before: (nothing, or legal small print)
   After: "Price before Tennessee sales tax." · "No two natural stones match the photograph exactly." · "Band shown with a 1.0 ct stone; choose yours in the builder."

9. **Banned words and marks.** No exclamation points (none on any house site). No "stunning, gorgeous, luxury, exquisite, elevate, curated, timeless" as filler (Roberto Coin's "timeless" is the weakest line on its site). No discount grammar. No "Maison", "atelier", "savoir-faire", "métiers d'art", "haute" (see 5c). Allowed, because they are specific: cast, set, claw, bezel, polish, bench, carat, grown, mined, Brentwood, Mt. Juliet, Tennessee, [year].

10. **Numbers are the adjectives.** (Rolex "26 languages", "Approximately 70 hours"; Patek "over 150 references", "133,650 square meters"; Roberto Coin "over 600 new designs annually".)
    Before: "Loved by thousands of families across Middle Tennessee."
    After: "2,537 Google reviews between two stores." (keep the figure live from the review feed)

11. **Commerce CTAs name the thing; "Discover" is for stories only.** (Houses: "Discover more" everywhere; Rolex "Request an Appointment", "Download brochure"; DY "Shop The Women's Collection"; Roberto Coin "Ask our concierge", "I need help with sizing".)
    Before: "Learn More" / "Shop Now" / "Click Here"
    After: "See every Signal ring" · "Build your ring" · "Book a Brentwood appointment" · "Ask a jeweler about sizing" · (editorial only) "Discover the Signal story"

12. **Sentence length 8–14 words, one idea each; stack sentences, do not join them.** (Rolex throughout.) Tier intro, before: "The Americana collection is our line of natural diamond jewelry that is designed and handcrafted by our skilled artisans here in Tennessee using only ethically sourced, GIA-certified natural diamonds of the highest quality."
    After: "Americana is natural diamonds. Every stone is mined, graded and set by hand in Tennessee. The design is the same one you will find in New American. Only the stone's origin differs."

### 5c. Five things to do deliberately differently — so it is ours, and American

1. **Name by place and address, not by "Maison" or "House".** RL names lines after 867 and 888 Madison Avenue; DY writes "Tribeca, New York City"; AP's whole story is "Le Brassus, 1875". The French and Swiss houses never say a street. We should: "the Brentwood bench", "Mt. Juliet", "[Street] Workshop", and a tier called Royal *American*. Drop "Maison", "atelier", "salon", "ambassador", "savoir-faire", "haute" (HW's "Savoir-Faire & Métiers d'Art", AP's "Haute Horlogerie", Cartier's "ambassador") in favour of shop, bench, jeweler, workshop, hand.

2. **People by first name, in the present tense, doing something.** DY says "Sybil and David", "Evan"; Patek says "the Stern family"; HW says "Mr. Winston"; Rolex says no one living. A family store in Tennessee has what Geneva lacks — the people are in the building. Every design page credits the jeweler who set it; every Visit page names who is at the counter; a Royal American piece names the hand that made it. Pair this with the review count (rule 10) on Visit and Services pages, never on PDPs.

3. **Say the price, say the tier, say the stone's origin — in one sentence each.** AP templates its price per market, Patek shows it without a cart, HW shows none, Tiffany and VCA hide customization behind a consultation. The plainness is the American register (DY's "chain not included", Rolex's tax note). Our PDP states price, tier and origin on three consecutive lines, and the only "Price upon request" in the entire site is Royal American.

4. **Romanticize a mechanism we actually have, the way Rolex romanticizes midnight.** Rolex's best lines are about a disc that turns at midnight; Patek's about a porthole bezel. Ours is the builder: one design, two stone origins, the tier changing as you choose. Write the builder as a story ("The band is the same. The stone is your decision. The name on the box follows the stone.") rather than as a tool, and give that moment its own feature block and photograph on every PDP. Add one plainly American line that no European house would write: a quiet Thursday afternoon in Mt. Juliet, a repair done while you wait.

5. **Photography and type that are neither Swiss black nor Paris cream.** Image backgrounds could not be verified from text, but the fetched structures tell us this much: Rolex and Patek shoot the object alone, repeated in four fixed views, with a single detail photograph per feature; DY and Roberto Coin add one on-model frame and a 4:5 crop; HW and VCA sell destinations and fairy tales. Ours: the four fixed object views (Patek's soldier, back, 3 o'clock, 9 o'clock discipline), one detail per feature block, and one honest lifestyle frame per page shot in Tennessee daylight — a porch, a kitchen table, a church step — never a yacht or an alpine valley. Set titles in a sturdy American serif, keep the uppercase eyebrow (Roberto Coin, Patek) and the table (Rolex), and let the reviews and the two storefronts, not a crest, carry the authority.

---

## 6. Source list

Read directly (text fetched):
- https://www.patek.com/en/home
- https://www.patek.com/en/collection
- https://www.patek.com/en/collection/nautilus
- https://www.patek.com/en/collection/calatrava
- https://www.patek.com/en/collection/nautilus/5811-1G-001
- https://www.patek.com/en/collection/all-models
- https://www.patek.com/en/manufacture (served "Our Values")
- https://www.patek.com/en/service
- https://www.audemarspiguet.com/com/en/home.html
- https://www.audemarspiguet.com/com/en/about.html
- https://www.audemarspiguet.com/com/en/collections.html
- https://www.audemarspiguet.com/com/en/watch-collection/royal-oak/15510ST.OO.1320ST.09.html
- https://www.robertocoin.com/
- https://www.robertocoin.com/collections/cobra
- https://robertocoin.com/products/bracelet-diamonds-love-in-verona
- https://robertocoin.com/pages/the-brand
- https://robertocoin.com/pages/concierge
- https://robertocoin.com/pages/prestige-service
- https://robertocoin.com/pages/product-care
- https://robertocoin.com/sitemap.xml and sitemap_products_1.xml, sitemap_pages_1.xml
- https://www.tinyjewelbox.com/discover-rolex/ (Rolex-syndicated Official Jeweler catalog)
- https://www.tinyjewelbox.com/discover-rolex/rolex-day-date.html
- https://www.tinyjewelbox.com/discover-rolex/rolex-day-date/M228239-0033.html
- https://www.tinyjewelbox.com/discover-rolex/rolex-selection.html
- https://www.tinyjewelbox.com/discover-rolex/watchmaking.html
- https://www.cartier.com/en-us/
- https://www.cartier.com/en-us/jewelry/rings/
- https://www.cartier.com/en-us/jewelry/bracelets/love-bracelet-B6035517.html
- https://www.harrywinston.com/en
- https://www.harrywinston.com/en/fine-jewelry
- https://www.harrywinston.com/en/the-house
- https://www.davidyurman.com/
- https://www.davidyurman.com/womens/collections/the-cable-collection.html
- https://www.davidyurman.com/womens/charms-and-amulets/sculpted-cable-locket-in-18k-yellow-gold-24mm-D17954+88.html
- https://www.davidyurman.com/world-of-yurman/stories/heritage/making-of-sculpted-cable-collection.html

Search snippets only (text present in the engine's excerpt of the named URL):
- https://www.rolex.com/en-us/watches/day-date/features
- https://www.rolex.com/watchmaking/our-signature
- https://www.rolex.com/en-us/store-locator/germany (navigation labels: "Find your Rolex", "Configure Rolex watches")
- https://newsroom.rolex.com/watches/oyster-collection
- https://www.rolex.com/watches/day-date/m228238-0059 (model-page title grammar)
- https://www.tiffany.com/engagement/engagement-ring-customization/
- https://www.international.tiffany.com/personalize
- https://www.tiffany.com/designers-collections/tiffany-t/diamond/
- https://www.tiffany.com/jewelry/earrings/tiffany-hardwear-ball-earrings-GRP03142/tiffany-hardwear-ball-earrings-11408362
- https://www.vancleefarpels.com/en/the-maison/series.html
- https://www.vancleefarpels.com/us/en/events/the-alhambra-collection-the-van-cleef-arpels-icon-of-luck.html
- https://www.vancleefarpels.com/es/en/the-maison/articles/luck-at-van-cleef---arpels.html
- https://www.vancleefarpels.com/tw/zh/collections/engagement/your-poetic-setting.html
- https://www.ralphlauren.com/638333.html

Press used for builder descriptions where the tool itself was unreadable:
- https://www.thejewelleryeditor.com/jewellery/article/cartier-diamond-engagement-rings-and-set-for-you-engagement-service/
- https://openers.jp/en/watch-and-jewelry/watch-and-jewelry_jewelry-news/QBRU8
- https://openers.jp/en/watch-and-jewelry/watch-and-jewelry_jewelry-news/21689 (Poetic Setting)

Blocked or empty (recorded so no one repeats the attempt): rolex.com (all paths, 403), content.rolex.com and assets.rolex.com brochure PDFs (403), web.archive.org (tool-blocked), r.jina.ai (401), tiffany.com / .co.uk / .com.au (403), vancleefarpels.com (403), ralphlauren.com / .co.uk / .de (307 loop), audemarspiguet.com collection grids (JS), diamonds.cartier.com (JS), harrywinston.com/en/fine-jewelry/sunflower (404), harrywinston.com/sitemap.xml (over 10 MB), patek.com/en/company/generations (404).
