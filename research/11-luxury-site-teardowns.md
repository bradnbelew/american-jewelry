# 11. Luxury site teardowns: what makes a house, not a template

**For:** American Jewelry remake (Shopify Hydrogen / React, react-three-fiber, GSAP, Lenis; Libre Caslon + Public Sans on warm paper; one subject per screen; signature 3D ring).
**Date:** 2026-10-10.
**Builds on:** research/01 (Cartier, VCA, Harry Winston, Tiffany, Bulgari, Graff, Rolex, Patek) and research/08 §1–2 (Repossi, Messika, Chaumet, Buccellati, Mikimoto, Dinh Van, Fernando Jorge, Jessica McCormack, Sophie Bille Brahe, Foundrae, Marla Aaron, Sidney Garber, Jade Trau, Irene Neuwirth, Brent Neale, Retrouvaí, ORE, Juri, Nida Tabba). None of those are re-read here.
**Method:** every site and case study below was fetched as text on 2026-10-10 (WebFetch; no browser). Text fetches cannot see CSS, so no typeface is asserted for an outside site unless the source names it. Where a site returned 403/503/timeout or rendered only a shell, it is listed under "Skipped" and nothing is guessed about it. Word counts are approximate and exclude navigation and footer unless stated.

**Skipped, with reason (do not cite these from memory):** Vacheron Constantin and A. Lange & Söhne (403 on two paths each), Tasaki (503), Pomellato (only nav rendered; it shows "COLLEZIONE 1967" and a broken "undefined_state" locale banner, https://www.pomellato.com/en-us/), Lauren Rubinski (402), Bottega Veneta and Christie's (fetch refused), Loro Piana (timeouts), Brunello Cucinelli direct (403; covered via the makemepulse case study), Zegna, Jacquemus, Aesop, Rimowa, Brioni, Six Senses, Gagosian (403), Holland & Holland (429), Hemmerle (body is the single word "Hemmerle"; JS-only), Lorraine Schwartz (a "Pop Up Store" login shell, https://www.lorraineschwartz.com/), Cindy Chao (526), Ralph Lauren (redirect loop), Resn and Active Theory (render nothing without JS), Unseen and Commission Studio project pages (index only). Leica rendered navigation only.

---

## 0. The three sites that set the bar

1. **365, A Year of Cartier (14islands).** The only award-level luxury build in this study with a published engineering story: 32 articles from 15 reusable components, a home page that is "a custom grid, divided by chapters", a folded-corner red triangle on a thumbnail once an article is read, WebGL as a progressive layer where "all the content is in the HTML", and a loading lesson (KTX2 textures made files larger but the page "faster and smoother"). React, Next.js, Framer Motion, React Three Fiber, and their own r3f-scroll-rig. SOTD at Awwwards and FWA, Lovie silver. https://www.awwwards.com/behind-the-scenes-designing-and-building-365-a-year-of-cartier.html · https://www.14islands.com/work/cartier365 · https://www.lovethework.com/work-awards/campaigns/365-a-year-of-cartier-761833
2. **Cartier, Le Chœur des Pierres (makemepulse, Awwwards HM 2026-09-15).** One stone → its world → the jewel it inspired → the gouaché drawing underneath. "The interface stays intentionally restrained"; built from "layered imagery, light, browser-based motion and subtle visual effects", real-time 3D credited. The model for how a jewel is revealed without a gimmick. https://www.makemepulse.com/case-study/cartier-le-choeur-des-pierres · https://www.awwwards.com/websites/luxury/
3. **Loewe.** The quietest commerce home page fetched: four content sections, about 35 editorial words, headings in sentence case ("Fresh classics", "New knits", "The gift of craft"), product names that are the material ("Sweater in wool", "Scarf in alpaca and wool"), prices only where a product card exists, no "Shop now", no "Add to bag", no bar, no popup. It is a house because the copy is a label, not a pitch. https://www.loewe.com/usa/en/home

Honourable: Boucheron (eight product cards, all "Price on demand", lowercase section heads "let your style climb", "our services"; about 80 editorial words) https://www.boucheron.com/en/ · Hermès (one runway video, eight category tiles, two paragraphs, one CTA "Discover the current collection") https://www.hermes.com/us/en/ · F.P. Journe (no prices anywhere, product cards are name + calibre + "Discover this watch") https://www.fpjourne.com/en.

---

## 1. Teardowns

Format per site: (a) home structure, (b) typography as far as text reveals it, (c) ground, (d) motion, (e) photography, (f) copy density, (g) commerce, (h) the house device, (i) the steal and how to build it, (j) template tells.

### 1.1 Jewelry and watch houses

**Boucheron** https://www.boucheron.com/en/
(a) Five sections: hero "Lierre de Paris, naturally free" with Play control and four product cards; editorial "let your style climb" with a Claire Choisne caption and four more cards; "our services" band with one Vendôme image; newsletter; footer. (b) Headings are lowercase sentences; logo alt "BOUCHERON Paris depuis 1858". (c) Photo-carried; the editorial image is a 4:5 crop ("…porte-02-4x5…"). (d) A hero video with a "Play" control; nothing else detectable. (e) Product shots are SKU-named packshots ("JRG03485_1.jpg"); the caption describes jewels worn "along the ear, neck, and fingers", so one on-body editorial frame per screen. (f) About 80 editorial words on the whole page; longest line: "Where you least expect it. Standing the test of time. Blazing its own trail." (g) All eight cards read "Price on demand"; no add-to-bag; "Book an appointment" and "Prepare my in-store visit" are the human CTAs; a "Create a new list" wishlist modal. Magento/Hyva storefront by asset path. (h) Lowercase headings and a three-fragment hero line; the restraint is typographic, not pictorial. (i) *Steal:* the three-fragment tagline (three sentence fragments, full stops, no verb-first marketing) as the only hero copy. CSS: `max-width: 22ch; text-wrap: balance;` and set each fragment on its own line with `display:block`. (j) "Discover" twice; newsletter heading is the word "Newsletter".

**Chopard** https://www.chopard.com/en-us/
(a) Utility bar ("Enjoy complimentary shipping & returns..."), hero with eyebrow "Happy Diamonds" and headline "Happier when they are free", a seven-card carousel, three creation tiles, three service tiles with "Learn more", newsletter, trust strip, footer. (b) One uppercase label on the page ("EXPLORE CHOPARD'S CREATIONS"); eyebrow is the line name above the headline. (e) Front/back/side packshots (`_01, _04, _05`); campaign files "chopard-loves-cinema", "Making_of_dancing_diamonds". (f) 250-300 words. (g) "Happy Sport The First 33 mm, quartz, Lucent Steel, diamonds" then "$7,140"; "New" on every card; "Discover", never "Add to bag". (h) Footer toggles "Enable high contrast" and "Disable animations": a house owning its motion. (i) *Steal:* the motion toggle, writing `data-motion="off"` to `<html>` and honoured by every GSAP context. (j) Announcement bar, trust strip, "Learn more" x3.

**Piaget** https://www.piaget.com/us-en
(a) Twelve blocks: hero "Piaget Polo Signature / A legacy of gadroons" with a ten-card row; "Possession / Own the moment"; "Sixtie / Jewelry watch collection"; a twelve-tile "signature collections" grid, each a name + tagline; a quote band "Do what has never been done before." (Valentin Piaget); two colour stories; four Maison Services tiles; four service perks; newsletter; footer with "Version 103.33.4". (b) Name + lowercase tagline pairs ("Andy Warhol" / "Reimagining an icon."); uppercase section labels ("DISCOVER OUR SIGNATURE COLLECTIONS"). (c) Not determinable; alt texts are all object descriptions. (d) Nothing detectable beyond "Step in" / "Dive into Colours" links. (e) Alt texts are material inventories ("Piaget Glow collection ring in rose gold, with a wide textured and brushed band…"), plus two process shots ("Assembling a watch movement") and one boutique. (f) About 200 editorial words out of 1,100. (g) "$ 16,200 Sales tax not included" on watch cards; jewelry tiles carry no price; no add-to-bag; contact drawer offers "Chat with an ambassador". (h) The founder's sentence as a full-width band between product and service. (i) *Steal:* the one-line tax note set in the same type as the price, inline, not a footnote: `<p class="price">$16,200 <span class="note">Sales tax not included</span></p>`. (j) Twelve equal tiles; "View more" ×4; four-item perk row.

**Breguet** https://www.breguet.com/en
(a) About nine screens: two-slide hero with audio controls ("The Marine in a new light", "Sorry Isaac."); "Breguet, over 250 years of watchmaking excellence" in four short blocks (Since 1775 / Major inventions / Savoir-faire / Contemporary innovation); seven "universes" tiles; "FIND A WATCH" + six Novelty cards; manufacture mosaic and three feature cards; one lifestyle banner; "Be assisted by an advisor"; five news cards; footer. (b) Uppercase CTAs ("DISCOVER", "FIND A WATCH", "OUR MÉTIERS D'ART"); eyebrows "Novelties", "Corporate". (c) Photo-carried. (d) Video hero with volume toggle; nothing else detected. (e) Filenames are a shot list: `3-4FACE`, `LATERAL`, `TOPSHOT`, `stilllife-2`, `ECLATE` (exploded view), `DUO`, `SOLDAT`, `LIFESTYLE_hero_final_16x9`. (f) About 800 words; longest passage 45 words on the Breguet records. (g) Cards show reference only ("5527BBYABW0") + collection + "Novelty"; no price, no material, no bag. (h) The registry: "Since 1775, Breguet has maintained historical records documenting timepieces…" and a nav item "The Breguet records". (i) *Steal:* the shot-list vocabulary for our own photography pipeline (3/4 face, lateral, top shot, still life, exploded, duo) and the "records" page as the Royal American registry. (j) "Discover" on every tile, five news cards, a ten-item nav.

**F.P. Journe** https://www.fpjourne.com/en
(a) Eight-slide news carousel ("Previous News 0/0 Next"), boutique finder bar, "Discover the collections that make every single F.P.Journe a unique model." then a twenty-card product carousel, two editorial teasers ("Invenit and fecit"), a search block, footer. (b) All-caps news headlines; "THE RESTAURANT" as a nav item. (c) Not determinable. (d) Carousels. (e) No alt text exposed. (f) About 550 words including nav. (g) No prices anywhere; cards are name + calibre ("Chronographe Rattrapante Calibre 1518") + "Discover this watch". (h) A nav that includes "Young Talent Competition", "Patrimoine Service" and "THE RESTAURANT": the house is a place with a kitchen, not a shop. (i) *Steal:* the calibre line under the name. For us: "Ref. AM 004" under "Shooting Star" in Public Sans caps. (j) "LEARN MORE" ×8; a twenty-card carousel; "0/0" counter bug.

**Grand Seiko** https://www.grand-seiko.com/us-en
(a) Hero strip of about 26 product tiles plus an Ohtani campaign banner; five collection tiles; "Modern Reinterpretation of Tradition" (44GS, 62GS); eight "New" cards; "THE NATURE OF TIME" with one "More" link; ten news cards; footer. (b) One all-caps display heading on the page; eyebrows are collection names; dates "Apr. 14, 2026". (c) Key-visual files tagged `_KV_5-9_RGB` and `_KV_3-2_RGB` (two aspect ratios per image), `_SP`/`_PC` variants. (d) A "Reduce Animations: Enabled / Disabled" toggle. (e) Product paths under "Product--Image/All"; nature imagery "Nature--of--time.jpg". (f) 350–450 words of prose. (g) "USD 3,600.00" with currency code prefix; "Jan.2027 Release" on cards; no add-to-bag. (h) Every image cut twice (5:9 and 3:2) so the crop is designed, not auto-fitted. (i) *Steal:* ship two art-directed crops per hero (portrait 4:5 and landscape 3:2) and switch with `<picture>` + `media="(orientation: portrait)"`, never `object-fit` alone. (j) 26-tile hero strip; ten news cards.

**Anita Ko** https://www.anitako.com/ and **Emily P. Wheeler** https://emilypwheeler.com/ (negative references). Anita Ko: hero "Love is in the air / DIAMONDS / EVERYWHERE / Shop Now", 34 product cards on the home page with no prices, two newsletter blocks, and a hero file named "ANITAKO-FALL22-2071FPO.png" (for placement only) still live. Emily P. Wheeler: an `<h1>` reading "test", a 50-card grid, "$34,000.00" with cents, "Sold" tags, empty alt text throughout. The one idea worth keeping from Wheeler: a named colourway as the product's second half ("Lacey Necklace, Malibu"); for us "Shooting Star, Montana sapphire".

**Tabayer** https://tabayer.com/
(a) Five to six screens: full-width hero "The Strength of Many—Oera Sheaf Series"; two stacked 4:5 images "The Knot That Holds—Oera Knot Series"; three product cards; newsletter "Sign up to be notified"; footer with B Corp and Fairmined logos; "Site by AP". (b) Title-case headings using an em dash as the hinge; one uppercase label on the whole site ("BAG OVERVIEW"). (c) Photo-carried; "Mood_…-4x5" filenames. (d) Nothing detectable. (e) Product images in A/B pairs at 4:5 (packshot + worn), "LB" lookbook set. (f) 150–200 words. (g) Cards: name, "Yellow Gold", "$28,800"; two images per card (hover swap); no add-to-bag; concierge drawer "Chat securely via WhatsApp / Email Us / Call Us". (h) Three products on the home page and a certification row instead of a trust row. (i) *Steal:* the headline-as-phrase-plus-series-name ("The Knot That Holds, Oera Knot Series") for our line names: "The Stone Is Set, Shooting Star". (j) Hover swap on cards; "Sign Up" twice.

**Emily P. Wheeler** https://emilypwheeler.com/
(a) A leftover `<h1>` reading "test", "Made in Shades" intro, a 50-card necklace grid, "As Unique as You" with "Couture" / "BESPOKE" buttons, newsletter slideshow, "Let's Connect" modal, footer. (f) 150–170 narrative words. (g) "$34,000.00" with cents; "Sold" tags; "(One-of-a-Kind)" in titles; no add-to-bag. (h) Colourway names (Malibu, Dusk, Melrose, Laguna) as the second half of every product name. (i) *Steal:* a named colourway or stone as the product's second line ("Lacey Necklace, Malibu"), for us "Shooting Star, Montana sapphire". (j) 50 cards on home; a chat launcher in `#E68699`; an `<h1>test</h1>` in production.

**Viltier** https://www.viltier.com/
(a) Header with "Prendre rendez-vous" and "Trouver une boutique"; hero "Alpha-Edge / Découvrir"; "LE SHOWROOM VILTIER" with a showroom photo and the appointment CTA; six category tiles; "Magnetic" with five product images; newsletter; "L'art d'offrir"; reassurance strip; footer. (e) Packshots named by view: `_Face`, `_3_4`, `-PROFIL`; ecom shots on stone surfaces ("nacre, onyx, turquoise, lapis"). (f) About 130 prose words. (g) No cards, no prices on home. (h) The showroom as a home screen with its own photograph. (i) *Steal:* "The showroom" as the second screen of the House page: the Brentwood counter, the address, "Book an hour". (j) Reassurance strip; "Découvrir" x3.

**Yvonne Léon** https://www.yvonneleon.com/en/ Announcement bar (free delivery from 750€), hero "La plage / Discover the collection", "New arrivals", then two Paris boutiques with addresses, phones and hours plus a "LIBERTY LONDON / SHOP IN SHOP" block; no product cards on the home page; 150-200 body words. (h) The stores take a third of the home page, with hours. *Steal:* stores with hours as a home screen, not a footer line.

**Lizzie Mandler** https://lizziemandler.com/
(a) Utility bar is the store address and days ("926 N Sycamore Ave #104 La CA 90038 Tuesday through Saturday"), a letter-spaced wordmark "L i z z i e  M a n d l e r", Love Knots banner, four category tiles, nine "Shop New" cards, four bespoke tiles, "ABOUT LIZZIE" (90 words), "THE BRAND", country selector, newsletter, footer. (b) Section heads as small uppercase h6 ("ABOUT LIZZIE", "THE BRAND"). (e) `-Y / -R / -W / WD` variant suffixes; founder portrait file. (f) 250–300 marketing words. (g) "$1,850.00"; "New" / "In stock" tags; cart notice warns of a 4–8 week production period; no add-to-bag on cards. (h) The top bar is an address and opening days, not an offer. (i) *Steal:* exactly this top bar: "157 Franklin Road, Brentwood. Tuesday to Saturday." (j) "SHOP NOW", "SEE MORE", a 700-word country list.

**Bea Bongiasca** https://www.beabongiasca.com/ (negative reference). Three identical "NEW IN" four-card rows split by banners; uppercase names ("FLOWER VINE RING IN SAKURA PINK"); packshots on coloured grounds (`BC44`-`BC46`); "€540.00"; a cart meter "You are €500 away from free shipping." Its one house idea is colour as the organising system ("SHOP BY COLORS... Only Gold").

**Suzanne Kalan** https://www.suzannekalan.com/
(a) Hero "The Gilded Collection / Explore Now"; two promo tiles; six-tile "Explore By Category"; Harrods feature; "Our Mission"; three info tiles; newsletter "Join our world of brilliance."; footer; newsletter popup "Sparkle Delivered"; country modal. (b) Headings pair an italic lead word with a roman word: "*Our* Mission", "*Client* Care", "*Harrods* London". (e) `SK-Web-2025-4x5-Look-3-1.webp`, "Business Casual Collection", gifting/packaging shots, office lifestyle. (f) 150–200 words. (g) No product cards on home; "Gifts $2000 & Under" in nav. (h) The italic/roman heading pair is the only typographic idea and it is a good one. (i) *Steal:* one italic word inside a roman display heading, done with `<em>` in Libre Caslon Display Italic, never a second family. (j) Popup on load, "Sign Up Today!", "Learn More" ×3.

**Jacquie Aiche** https://jacquieaiche.com/ (truncated capture) Three rotating announcement bars, a quiz as the hero CTA, "Sale price $12,000 Regular price $24,000", card button "Add". Negative reference only.

**Single Stone** https://singlestone.com/
(a) Affirm bar; hero "ANTIQUE DIAMONDS REIMAGINED / HEIRLOOM-WORTHY JEWELRY"; 15-card best sellers; three "classics" tiles; 17-card emerald carousel; Zodiac/Cobblestone tiles; "Jewelry with meaning"; San Marino flagship; three gemstone tiles; events slider; three blog cards; newsletter; footer; "Join the Club" popup. (b) Lowercase eyebrows above headings ("we're hitting the road", "shop our flagship"); uppercase hero. (c) Packshots "on a clean white background" and "on a light gray background"; a section background named `E2E2E2`. (e) Hero alt: "A close-up of a person wearing a white button-up shirt and layered gold jewelry… against a light gray background"; packshots A/B/C angles; designer portrait "sitting in chair and smiling". (f) 250–350 words. (g) "Regular price $34,000" / "Regular priceFrom $11,500"; "New In"; no add-to-bag. (h) The flagship as a home-page subject ("a jewel box of timeless pieces"). (i) *Steal:* light-grey seamless (`#E2E2E2`) as the only alternate ground on an otherwise paper site. (j) Affirm bar, 32 product cards, popup, blog trio, events slider.

**Marrow Fine** https://marrowfine.com/
(a) About 34 modules: four category blocks, six product carousels, a best-sellers banner, twelve product cards, promos, two "Visit A Showroom" blocks, founder quote, press logos, trunk shows, virtual appointments, newsletter. (e) The richest alt-text set in the study: "flat lay, on a pink flower", "on blush paper", "on crumpled black paper", "resting horizontally on a dark brown velvet fabric background", "Model's hand with an oval diamond engagement ring", `TK_MarrowFine_FA25_Estudio__0021_RT.jpg`. (f) 350–400 words. (g) "From $4,600.00"; badges NEW • ONE-OF-A-KIND, READY TO SHIP • BEST SELLER, JILLIAN'S PICK. (h) The photography vocabulary (paper, velvet, flowers) is a house idea trapped in a template. (i) *Steal:* the two-ground rule for detail shots: crumpled paper for daylight, dark velvet for evening, nothing else. (j) 34 modules; six badges; "SHOP NOW" in two casings.

**Ashley Zhang** https://ashleyzhangjewelry.com/ A camera-roll hero filename (`Photo_Jun_17_2026_1_14_44_PM_1x1.jpg`), eight vintage cards at "$5,500.00", a "CUSTOM DESIGN ATELIER" banner, and the one device worth taking: an "INQUIRE" overlay with a budget selector from "Less Than $1000" to "$30K+". *Steal:* five budget bands in the commission form, phrased "What would you like to spend?"

**Wallace Chan** https://www.wallace-chan.com/ Two atmospheric slides, six installation photographs, a portrait with five paragraphs (about 210 words), "Site by Artlogic". No products, no prices; nav is "Artwork, Innovations, Documentaries, Exhibitions, Lectures". *Steal:* "Documentaries" as a nav word when the bench film exists. (j) Cookie dialog and signup dialog both on load.

**Tilly Sveaas** (Awwwards HM 2026-09-03, Commerce-UI) https://tillysveaas.co.uk/
(a) Scrolling announcement bar; hero "CHARMS FOR THE JOURNEY"; ten-card charm bracelet carousel; "01/02, 02/02" category tiles; three brand pillars; "TINY T-BARS" banner and seven cards; press strip; founder quote; three link cards; newsletter; footer. (b) Uppercase headings followed by one sentence; "New In" in three casings. (e) Alt text names the shot type: "front view", "on model, side view", "flat lay", "close-up", "on wrist"; `Technical_Drawings` files. (f) 450–550 words. (g) "£385" no decimals; metal swatch icons; "Add to bag" on cards. (h) Technical drawings as product images. The Charm Studio builder (Commerce-UI case study: "pick a chain, add charms, and preview", an 86% desktop conversion lift claimed) https://commerce-ui.com/work/tilly-sveaas-woocommerce-to-shopify-plus-migration-case-study. (i) *Steal:* a technical drawing as the fourth PDP image (line, no shading, dimensions in mm). (j) Scrolling ticker, 10% popup copy, press strip.

**WWAKE** https://wwake.com/
(a) About fifteen sections: announcement; hero "The Language Of Silver"; four-item row; gift band; three-item carousel; four collection cards; a 20-card grid; four category tiles; "Continuum Journal Series" with nine cards; three value props numbered "1 Made In New York"; LA pop-up; five tiles; newsletter; footer; a booking modal. (b) Title-case headings, numbered eyebrows ("1 Holiday Gift Guide"). (e) Four photo types in filenames: `on-model`, `StillLife`, `-detail`, `jewelry-making-workbench`; portrait crops. (f) About 450 words. (g) "$1,400.00", "From $175.00"; badges "Choose Your Diamond"; only "Add to list". (h) "Jewelry exists within a continuum that begins with the earth and continues through every hand in between." and "Made In New York" as a numbered fact. (i) *Steal:* numbered facts instead of icon rows: "1 Set in Brentwood. 2 Two stores. 3 Since 19xx." in small Caslon, no icons. (j) 20-card grid, nine journal cards, announcement bar.

**Heirest** https://heirest.com/ About 25 blocks, a 17-slide carousel, a $19 sizing-kit bar, trust bars twice, "from $1,752", "Shop Now" on every card. The one device: the configurator written as a sentence on the home page, "Generate your: Necklace / Ring / Earrings / Bracelet". *Steal:* the builder entry as a fill-in-the-blank line ("Build on Signal: a ring / a pendant").

### 1.2 Fashion, leather, fragrance, craft houses

**Loewe** https://www.loewe.com/usa/en/home
(a) Four content sections: hero FW26 campaign image, "Fresh classics" + one line + three links + five bag cards; "New knits" + four cards; "The gift of craft" + six cards; two Stories cards; footer. (b) Sentence-case headings; product names are "Top in viscose blend", "Scarf in alpaca and wool". (c) Photo-carried campaign + packshots with view suffixes `_1B, _1F, _1W`. (d) Nothing detectable. (e) Campaign files tagged `MAIN_CAMPAIGN`, `SECONDARY_CONTENT`, `RUNWAY`; a named model folder. (f) About 35 editorial words on the page. (g) "$1,350.00" only on knit cards; "+ Colour" label; no add-to-bag, no "Shop now". (h) Product name = garment + material. (i) *Steal:* name the material in the name: "Shooting Star ring in 18k yellow gold". (j) None found on the home page; the mega-menu is where the catalogue lives.

**Hermès** https://www.hermes.com/us/en/
(a) Announcement ("Information: Kindly note, our Distribution Center will be closed Monday, October 12th."), runway video with play/pause, "Women's spring-summer 2027 runway show / Relive the show", eight category tiles, two paragraphs (about 75 words), a three-image strip, "Discover the current collection", footer. (b) Footer group heads in caps; everything else sentence case. (d) One video; images lazy-loaded with data-URI placeholders. (f) 75 editorial words. (g) No product cards on the home page. (h) Four screens. The announcement is an operational notice, not an offer. (i) *Steal:* if we ever need a bar, it says a fact ("The Mt. Juliet store is closed Monday for inventory."). (j) None on the home page.

**The Row** https://www.therow.com/
(a) One hero image (`THE-ROW-SS27-Vogue-Runway1.jpg`), no headline, newsletter, footer; nav includes "Galerie", "Objects", "Vintage", "William Eggleston", "Handwoven Blankets", "Archive". (f) 150–200 words, mostly a legal note about mixed carts. (g) No product cards on home. (h) A single photograph and a nav that reads like a house's rooms. (i) *Steal:* "Archive" as a top-level nav word. (j) "Are you in the right place?" country modal.

**Byredo** https://www.byredo.com/us_en/
(a) Three full-width images with no copy (`PRODUCT_STILL_LIFE`, `HOMEPAGE_UNBRANDED`, `IMAGE_noLogo_noCTA` in filenames), logo bar, footer. (f) Hero copy: zero words. (g) No cards on home. (h) The home page is three photographs. Filenames show an asset discipline: a "no logo, no CTA" image variant exists on purpose. (i) *Steal:* produce a `noLogo_noCTA` master of every campaign frame so the hero can be silent. (j) "New" badges in the menu; "FREE SHIPPING" in footer.

**Le Labo** https://www.lelabofragrances.com/ Four-slide hero (SANTAL 33, CYPRÈS 21, MANDARIN, "HOT OFF THE PRESS"), four tiles, a refill block ("same bottle, same scent, same perfume."), four cards with "Add to Cart" and "+ 3 sizes", no prices in text, a "HELLO!" region modal on load. (h) A numeral in the name. *Steal:* the registry number inside the name for Royal American pieces ("Royal American No. 12").

**Perfumer H** https://www.perfumerh.com/
(a) About thirteen screens: hero "CLAY / A translation of the earth / Watch the film"; two product cards; "Soft Sweetness of Clay" editorial; a 14-image carousel; "Notes" on an ochre wall; variant grid; handblown bottle feature; "Iconic Fragrances"; sample service; candles; incense; newsletter; footer. (b) Uppercase only on "CLAY"; headings title case with a rule beneath; italic format line "*Eau de Parfum*" as the product eyebrow. (c) Tinted walls (ochre) as product ground. (e) "Lyn Harris sitting on a felled pine trunk", "Cracked and crumbled red clay", "A wide arid valley with a figure on the track"; filenames `clay-c08-citrus-tree-dusk.jpg`, `clay-adobe-bricks.jpg`. (f) 400–500 body words; the Clay note is 150 words (too many, but it is the product). (g) "50ml £145", "Handblown 100ml £650", "+ 2 sizes", "Add to basket". (h) One scent, one page, one landscape: the product's raw material photographed as landscape. (i) *Steal:* photograph the stone's origin (a Montana riverbed, a Tennessee creek) as the "notes" image for a design, no product in frame. (j) Welcome popup with a delivery perk; basket progress nudge.

**Coutumes** (Awwwards HM 2026-09-05) https://www.coutumes.com/ Seven screens, "95,00€", "Add to cart", a caps trust strip and a gift-bag upsell in the cart. Its house device is alt text written as a product note: "Grained camel leather, tonal stitching, round cord looping above the pocket." *Steal:* write alt text as the bench would describe the piece (also the AEO win). **Deadly Ponies** https://deadlyponies.com/ is the same template with two announcement bars and "SHOP ICONS"; negative reference.

**Unimatic** https://www.unimaticwatches.com/
(a) Promo strip ("Available at Milano Flagship Store"), hero with eyebrow "NEW MODELLO QUATTRO U4-GMT-EMJDM", eight-card new arrivals, four category tiles, eight cut-out hero models, three trust cards, footer; "Design & dev by: Evolve". (b) Model codes uppercase; "milan, italy" in lowercase as a place tag. (e) Transparent studio cut-outs (`UC1-Hero.png`) and 1200×1200 wrist shots (`Wristshot_U1-AEG_1200x1200`). (g) "795€"; "Edition of 250"; "Buy from our partner". (h) "Edition of 250" on the card; the lowercase place tag. (i) *Steal:* "Edition of 6" / "One of one" as the card's third line; "brentwood, tennessee" lowercase as the place tag. (j) Trust cards; promo strip.

**Steinway & Sons** https://www.steinway.com/
(a) Regional modal, hero carousel with "Replay with sound", six promo tiles, "Steinway & Sons / World-Class Pianos", nine model cards, quick-link tiles, Spirio feature with Lang Lang, a six-field newsletter, footer with "One Steinway Place, Astoria, NY". (b) Two-tone headlines with the first word emphasised: "*Experience* Spirio", "*Visit* Steinway". (e) `square_white` packshots, `Crown-Jewel-Renders-2025` (CGI), `spirio_room_banner`. (g) Model cards are letter + type + dimension: "Model D / Concert Grand, 8' 11 3/4"", "Macassar Ebony"; no prices; "Learn More". (h) Model letters and dimensions as the name. (i) *Steal:* dimension as the product's second line ("Band 1.8 mm, stone 6.5 mm"). (j) "Learn More" everywhere; six-field newsletter; regional modal.

**Purdey** https://www.purdey.com/
(a) Sixteen blocks from "The Sidelock Over-and-Under" to a "Build Your Own Purdey" configurator and two journal teasers; a three-step appointment modal with numbered caps eyebrows ("1. SELECT YOUR PREFERENCE", "2. SELECT YOUR SERVICE", "3. CONFIRM YOUR DETAILS"). (e) `EstateShootPRB`, `HomepageAW26Tweed`. (f) 300-400 words. (g) No cards; shop on a subdomain. (h) The appointment as a numbered three-step modal. (i) *Steal:* the numbered appointment flow (1. Which store 2. What for 3. When), numerals in Caslon old-style figures. (j) Casing drift ("LEARN MORE" / "Learn More"), "Shop Now".

**Bang & Olufsen** https://www.bang-olufsen.com/en/us
(a) Carousel hero "A familiar form. A fresh perspective." / "Inspired by the warm, earthy tones of stones and minerals."; eight bestsellers with prices; an artist feature; promos; "The House of Bang & Olufsen" newsletter; footer. (e) Lifestyle alt text ("A woman drinking coffee, sitting next to a shelf with Beosound Balance") and one packshot ("Multiple color variants of Beosound 2 laying on a plain background"). (f) 120-130 words. (g) "$5,100" no cents; product names as links; no "Shop now". (i) *Steal:* name the list "The Register" instead of "Newsletter". (j) Carousel hero; eight bestsellers.

**Leica** https://leica-camera.com/en-US (nav only rendered) (e) Alt texts: "Leica Metal Gray products on a podest", packshots "StandOnly". (h) Product on a plinth ("podest") as a recurring frame. (i) *Steal:* one plinth shot per design: the ring on a small paper block, shadow visible.

### 1.3 Hospitality, auction, galleries

**Aman** https://www.aman.com/
(a) Seven to eight screens: menu + "Reserve"; region switcher "Discover Aman in…"; "Now open." Amanvari; festive card; "HOTELS & RESORTS / Explore the World of Aman"; six experience cards; residences; "The World of Aman" three cards; "Get inspired" newsletter; destinations directory; footer. (b) Caps eyebrows ("HOTELS & RESORTS"), title eyebrows ("Now open"), lowercase eyebrows ("festive with aman", "mountain escapes"); status tags "Opening 2028". (e) Alt text with light and time of day: "…palm trees and poolside loungers at sunset", "…rugged coastline at dusk". (f) About 330 words. (g) "Reserve" with destination and date params; no prices. (h) Status as an eyebrow: "Now open", "Coming soon", "Opening 2028". (i) *Steal:* a status eyebrow on designs: "New this autumn", "Sold, may be commissioned", "In the window at Brentwood". (j) "Discover more" ×9, "Shop now" ×2.

**Rosewood** https://www.rosewoodhotels.com/en/default Ten to twelve screens and eleven carousels: four-slide video hero, eight properties, "NEW IN: THE SLEEP EDIT", "The Autumn Reset", seven culture cards, seven journeys, three offers, a five-card shop, newsletter. Pattern: caps eyebrow, title headline, one sentence, CTA; the same title appears in two casings, so caps are CSS. Promo image URLs carry `overlay:box,color:black,opacity:40`: a 40% black scrim baked into the CDN transform, the template tell of the whole hospitality category (text over photo, always). Shop cards: brand label, name, "SHOP", no price.

**Soho House** https://www.sohohouse.com/ Hero "A home for the world's creatives to come together / Apply for membership", a 130-word intro, house cards. No prices; proof is counts: "48 Houses in 19 countries", "22 gyms", "11 spas", "29 pools", "2,400 monthly events". (h) Numbers as the only adjectives. (j) Alt text "Soho house interior" twelve times.

**Sotheby's** https://www.sothebys.com/en/ Thirteen blocks and 70-plus cards. The lot card is the device: artist, title, "Estimate: 120,000 – 180,000 USD", "21 October 2026 | 7:00 PM EDT | New York", the lot number as a bare numeral, "View Lot". *Steal:* for one-of-one and commission pieces, the estimate grammar exactly: en dash, thousands separators, currency code as suffix ("From 4,800 to 6,200 USD").

**Phillips** https://www.phillips.com/
(a) Nine-slide hero, each slide: category eyebrow (title case) → title → date/location line in italics → "Browse" / "Register to bid"; video feature; three video cards; Dropshop banner "By Creators. For Collectors."; six articles; newsletter; private sales; consign; app; footer. (b) Eyebrows title case, dates italic, two all-caps instances on the whole page. (e) Artwork crops use `crop=smart`; staging hosts (`dist.stage`) are live in markup. (f) 350–400 words. (g) "Browse" + "Register to bid" as a button pair; "Buy now" only for Perpetual. (h) Italic date line under every title. (i) *Steal:* the italic second line for place/date on journal and event entries. (j) Nine-slide hero.

**Pace** https://www.pacegallery.com/
(a) Eight-slide exhibition carousel "1 / 8", three editorial slides, Journal with five cards, six museum entries, one news card, Pace Publishing, a pull quote with "View Artists →", Pace Live, a six-field newsletter, footer. (b) Title-case eyebrows that are places or categories ("New York", "Art Fairs", "Essays"); dates "Mon DD – Mon DD, YYYY"; one all-caps title. (e) "Installation view of…", "Archival photograph of Jackson Pollock in Bucks County, Pennsylvania, 1939, by Sanford McCoy"; photo credits in captions. (f) About 250 words. (g) Card format: location, artist, title, dates, CTA. (h) The place as the eyebrow. (i) *Steal:* "Brentwood" / "Mt. Juliet" as the eyebrow on anything that happens in a store. (j) "Explore Now" on most cards.

**David Zwirner** https://www.davidzwirner.com/
(a) Hero overlay card: "Exhibition / Louis Fratino / Prose / London / Now Open: September 18—October 31, 2026 / Learn More"; "Currently on View" five cards; three fairs; seven museum cards; six press; four Utopia prints; one film; five books; six podcasts; newsletter; locations with street addresses; footer. (b) Plain-text eyebrows ("Exhibition", "Fair", "Bonus Episode"); status labels "Now Open:" / "Coming Soon:". (e) "A color photograph of Robert Ryman in his studio, dated late 1990s." (f) About 1,000 words with nav. (g) Print card: artist, title and year, medium. Location card: gallery name, street address. (h) The five-line caption (type / name / title / city / dates) as the hero. (i) *Steal:* the five-line caption as our design hero: "Design / Shooting Star / Ref. AM 004 / Brentwood / Set this week". (j) Thirteen sections.

### 1.4 American houses (for §6)

**David Webb** https://www.davidwebb.com/
(a) Eight screens: "DISCOVER / Seasonal Hues" four cards; "DISCOVER / Just In from the Workshop" five cards; founder pull quote in italics; "The World of David Webb" three panels (Workshop, Archives, Heritage); "Get in Touch"; "At your service" (Chat, Call, Email, book); footer. (g) "Three to One Cuff, Malachite" then "$88,000" or "Price Upon Request"; no add-to-bag; "Talk to an expert". American codes: "+1 (212) 421 3030"; boutiques New York, Beverly Hills, Montecito; the workshop "proudly sits above our Madison Avenue Flagship Boutique"; Archives "the epicenter of David Webb", used for authentications. (h) "Just In from the Workshop" as a section name. (i) *Steal:* exactly that section name, with pieces that left the bench this week. (j) "Learn More" in three casings.

**Verdura** https://www.verdura.com/
(a) Fifteen screens: hero "Explore the Collection", then Bracelets (4), Earclips (3), Cuffs (4), Rings (5), Necklaces (5), New Arrivals (6), Zodiac feature, Polka Dot + "Very Verdura Gifts Under $20,000", "Visit / The Gallery", Heritage (55 words), newsletter, Instagram, footer; developer "The Beaux Arts". (b) H2 label + H3 title pairs ("Zodiac" / "Pendant Necklaces", "Visit" / "The Gallery"). (e) Alt: "Verdura Trio Bangle in gold with platinum and diamond accents, adapted from a 1940 archival ring design"; transparent PNG cut-outs (`…uni.png`); salon interior "PinkRoom". (g) Cards show image and title only, no price; "Arrange Visit". American codes: "745 Fifth Avenue, Suite 1205 New York, NY 10151", gallery hours "10 AM – 5 PM, Monday – Friday", "followed his passion for design to America in 1934", archival postcards from the Museum of Natural History. (h) The showroom is called "The Gallery" and is a suite number on Fifth Avenue. (i) *Steal:* "adapted from a 19xx archival design" as a line on Royal American pieces; the suite-number address. (j) Instagram feed; 27 product cards.

**Oscar Heyman** https://www.oscarheyman.com/
(a) Eleven sections: four-slide hero; "2026 Holiday Book"; "Our history" with three tiles; featured "7.40tcw Paraiba Tourmaline Earrings"; necklaces; rings; "Phenomenal Gems" four cards; brand statement; craftsmanship + history cards; footer. Nav is numbered 01–04 ("High Jewelry, Craftsmanship, History, Catalog"). (b) Caps display heads ("A COLLECTION OF PHENOMENAL GEMS"), lowercase CTA "read our story". (e) `model_…jpg`, `…_on_colored_paper_in_box…`, `Bracelets_in_the_Shop.jpg`, a 1950s family photo of "George_Oscar_Nathan_Harry". (g) No prices; titles are carat + gem + type ("45.61ct Star Sapphire Ring", "62.63tcw Cat's-Eye Bracelet"). American codes: "Madison Avenue workshop", "since 1912", toll-free "1.800.642.1912" (the founding year is the phone number), "Visit the Living Archive", catalog numbering "Holiday 2026 / Spring 2026". (h) "Living Archive" and a phone number that ends in the founding year. (i) *Steal:* carat weight in the name; "The Living Archive" as the registry's public name; seasonal catalog naming. (j) "Summer Sale!" inside the cart drawer.

**Seaman Schepps** https://www.seamanschepps.com/
(a) Twelve blocks: catalogue bar; mega-menu; cookie banner; hero "They're Classics for a reason"; ten-card "Into the Woods"; three category tiles (Women's, Home, Men's); "Our Workshop"; "Heritage"; a timeline "Today / 1904"; three boutiques with seasons; "Request a Price" form; footer. (e) "Image from our workshop making the Pave Diamond Mousetrap Bracelet"; "Image of Seaman Schepps, Jackie O'Kennedy, Blanche Knopf"; `cowrie_hand.jpg`. (g) "Sale price $8,500.00" on every card (a Shopify label leak), "From $10,500.00", "Add to cart", "Choose options", "Request a Price". American codes: "824 Madison Ave, New York, NY 10065"; Palm Beach "October 15 - May 24"; Nantucket "May 24 - October 15"; "New York's Fine Jeweler Since 1904"; workshop in the "Diamond District"; a "Shell stamp" hallmark. (h) Seasonal stores with dates, a hallmark named as a thing. (i) *Steal:* name our hallmark (the stamp inside the band) and show it; list store seasons/hours as facts. (j) "Sale price" on every card; cookie banner.

**Fred Leighton** https://www.fredleighton.com/
(a) Hero + two links; "Signed Fred Leighton"; six-type grid; spotlight; engagement; six makers; virtual viewing; 0% APR financing; Instagram; footer; sticky VISIT / CALL / EMAIL / CHAT bar. (b) All-caps section heads; title-case feature titles. (e) `…-STILL-1500` product stills. (g) No prices; spotlight copy is "Bulgari bracelet with cabochon emeralds, diamonds, and 18k karat gold, circa 1950s." American codes: "773 Madison Avenue at 66th Street", "NEW YORK | LAS VEGAS" in the top bar, a 50-state dropdown. Quality leaks: "Leram ispum", "VIEWEING", a "Kwiat boutique" reference from a sister-brand template. (h) The cross-street address ("at 66th Street"). (i) *Steal:* "157 Franklin Road at Moores Lane" style cross-street addressing. (j) Financing tile, sticky chat bar, placeholder copy live.

**Heath Ceramics** https://www.heathceramics.com/
(a) Announcement; utility nav; hero "In a New Light:" winter; seven-card story ticker; nine-product "Goods Worth Seeing"; "Who We Are"; category carousel with a set builder. (b) Eyebrows "A California Original", "Who We Are"; colon-terminated display heads. (g) "$63", "$46" no cents; "Create Yours". American codes: "555 Alabama Street San Francisco, CA 94110", "Enter at the Boiler Room", "In California since 1948", "Over 100 Glazes, All Handcrafted In California", factory tours in Sausalito and San Francisco, a named Clay Studio Director. (h) "Enter at the Boiler Room": a wayfinding instruction as brand copy. (i) *Steal:* one wayfinding sentence per store ("Park behind the building. Ring the bell."). (j) Announcement bar; "Start Building and Save 10% on Sets".

### 1.5 Studios and case studies

**14islands, 365 A Year of Cartier.** Facts from the Awwwards behind-the-scenes article: the goal was a site people browse "Like flipping through a magazine and picking out the stories that catch your eye"; a Netflix-browse / magazine-read hybrid; home page "a custom grid, divided by chapters"; a small red triangle "like a folded corner" marks a read article; endless scroll loads the next article near the bottom; a sidebar jumps between articles in a chapter; 32 articles from 15 reusable components, with highlighted articles getting one unique scroll-reactive component each (a steps-based jewellery-making sequence, a film-reel effect, a layout that splits and reverses on scroll); a debug UI for designers to tune scroll animations; WebGL adds "image distortion and interactive 3D jewellery" but "all the content is in the HTML"; landing-page WebGL images froze the page during GPU upload until converted to KTX2 (larger files, "faster and smoother page load"); React, Next.js, Framer Motion, React Three Fiber + three.js, r3f-scroll-rig, SASS/CSS Modules, Vercel for dev, S3 for production; three languages laid out by hand in Figma (105 pages). https://www.awwwards.com/behind-the-scenes-designing-and-building-365-a-year-of-cartier.html. The Cannes Lions entry for the 2022 edition describes "35 chapters" and an infinite-scroll option https://www.lovethework.com/work-awards/campaigns/365-a-year-of-cartier-761833. 14islands' own site: Sanity v3 + Next.js 13 pages router because the app router "is very limiting with transition compatibility"; r3f-scroll-rig "handles smooth scrolling and syncs 3D meshes with DOM elements"; a WebGL hover effect on project thumbnails https://sanity.io/projects/14islands. The live yearbook renders a title and a "0" counter without JS https://365ayearof.cartier.com/.

**makemepulse, Cartier Le Chœur des Pierres (Awwwards HM 2026-09-15).** "Users choose a gemstone, enter its world, and discover the necklace or ring it inspired"; interacting with the finished piece reveals the gouaché beneath it, "revealing the invisible structure behind the jewel"; "the interface stays intentionally restrained"; "crafted through a careful balance of layered imagery, light, browser-based motion and subtle visual effects"; tagged design and real-time 3D. https://www.makemepulse.com/case-study/cartier-le-choeur-des-pierres · listing https://www.awwwards.com/websites/luxury/. The public Cartier page renders only a video tag and nav without JS https://www.cartier.com/en-fr/lechoeurdespierres. makemepulse's stated beliefs: "light-as-air tech, as seamless as real life" and "creative that stops you in your tracks" https://www.makemepulse.com/.

**makemepulse + Solomei AI, Brunello Cucinelli.** "A pageless e-commerce platform, built to make each visitor's journey as personally relevant as possible"; thirty-plus interface blocks reorganised by detected intent (product-driven, discovery-led, inspirational); frosted glass, soft blur, hand-drawn sketch details; the goal "crafted, not constructed", closer to a boutique than a transactional site; results reported as "increased dwell time and deeper exploration". https://www.makemepulse.com/case-study/brunello-cucinelli-ai-shopping-experience. *Lesson for us:* the sketch and the blur are the house's hand, not the AI; we can do the hand-drawn detail with the family's own bench sketches and skip the intent engine.

**Immersive Garden, Cartier in Time / Watches & Wonders 24 / Louis Vuitton VIA.** Cartier in Time: twelve hours on a clock, each tied to one of "12 abstract films starring Jake Gyllenhaal", a scrolling carousel "inspired by clock hands", a menu redesigned as a grid, "fluid transitions and minimalist design enhancing the dreamlike quality", an On/Off sound control, triple SOTD (Awwwards, FWA, CSSDA), credits 60fps and Mooders. W&W 24: each collection in its own "immersive universe" with "seamless scroll-based interactions" and "clickable hotspots" for product detail. LV VIA: "3D scenes with a virtual LV trunk", "glitch transitions". https://immersive-g.com/projects/cartier-in-time · https://immersive-g.com/projects/cartier-watches-and-wonders-24 · https://immersive-g.com/projects/louis-vuitton-1. The studio's client list (Cartier ×3, Louis Vuitton, Longines, Omega, Girard-Perregaux, Dior-adjacent) https://immersive-g.com/.

**Miu Miu, "A House that we shaped" (Awwwards SOTD + Developer Award 2026-08-25, credited to Merci Michel on the Fashion listing).** The site without JS yields "Sound On", "miumiupresents", and the title split into "AHouse / thatwe / shaped" fragments (a word-split text reveal) https://immersivebags.miumiu.com/. Awwwards describes exploring a house and interacting with objects to find the bags; palette dark navy and bright blue https://www.awwwards.com/sites/miu-miu-a-house-that-we-shaped. Landing.love: "sound on and a poetic title treatment, followed by a Three.js house you explore object by object"; "typography and campaign photography sit inside a full WebGL space" https://www.landing.love/sites/immersivebags/. Fashion listing https://www.awwwards.com/websites/fashion/.

**AREA 17, Saint Laurent.** Four chapters (digital flagship, cultural hub Rive Droite, film, design system); the flagship "reintroduces the classic Saint Laurent logotype" from Cassandre's 1961 original; "island" layouts from the physical stores; a shift "from earlier minimalism toward a warmer, more evocative look"; headless React on SFCC. https://area17.com/clients/saint-laurent. AREA 17 also lists Fondation Cartier and the Lucas Museum https://area17.com/work.

**Instrument, Oura.** "By showing, not telling"; "layers of information, animation, and micro-interactions" as progressive disclosure; lifestyle and CGI photography mixed; the hero is an animated GIF plus a static mobile image; results claimed 42% sales/day increase one month after launch. https://instrument.com/work/oura-smart-ring. The live Oura home page shows the ring only on bodies ("Man lying in bed wearing an Oura Ring 5", "Two hands touching, each wearing an Oura Ring in different finishes"), no render references, no price above the fold, one CTA "Shop Now" https://ouraring.com/.

**Commerce-UI, Tilly Sveaas.** WooCommerce → Shopify Plus; "Charm Studio" lets shoppers "pick a chain, add charms, and preview the result"; "fully native to Shopify"; 86% desktop conversion lift claimed. https://commerce-ui.com/work/tilly-sveaas-woocommerce-to-shopify-plus-migration-case-study. Commerce-UI's Hydrogen builds are Nour Hammour, Carhartt WIP, Lady Gaga; no jewelry on Hydrogen https://commerce-ui.com/insights/6-shopify-hydrogen-examples-leveraging-headless-architecture.

**Lenis (darkroom.engineering).** "Lenis was built to keep WebGL and the DOM perfectly in sync. The smoothness was a happy accident." Defaults: `lerp 0.1`, `duration 1.2`, easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel true`, `syncTouch false`, `respectReducedMotion true` (lerp forced to 1 under reduced motion; opting out "not recommended"); native scroll preserved, "no hijacked scrollbars"; ScrollTrigger integration is `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)`. https://lenis.dev/ · https://github.com/darkroomengineering/lenis

**Others fetched, with little luxury-specific to extract:** Locomotive (45 projects, no jewelry) https://locomotive.ca/en/work · Lusion ("We do not chase trends or produce work that looks like everyone else") https://lusion.co/ · Dogstudio https://dogstudio.co/ · Hello Monday (B&O "See Yourself in Sound") https://hellomonday.com/ · Pentagram's digital/fashion filter (no jewelry identities listed; Hiut, 520 Fifth Avenue) https://www.pentagram.com/work?discipline=digital-design&sector=fashion-and-beauty · Commission Studio index (Tiffany Blue Book 2024 and 2026, HardWear, Bird on a Pearl, Zegna, Rimowa, Aesop x4; project pages unreachable) https://commission.studio/ · Instrument index https://www.instrument.com/work. Awwwards Luxury page 1 lists Cartier Roadster (Decimal) and Cartier Le Chœur (makemepulse) https://www.awwwards.com/websites/luxury/; Siteinspire's fashion list includes WWAKE, Perfumer H and Cartier 365 https://www.siteinspire.com/websites?categories=fashion. Vrai's configurator is reached from cards reading "From $1,150" and "Select diamond"; filenames encode shape, carat, size, angle and metal https://www.vrai.com/engagement-rings/settings.

---

## 2. The ten devices that separate a house from a template

1. **A hero that is a caption, not a pitch.** Zwirner: "Exhibition / Louis Fratino / Prose / London / Now Open: September 18—October 31, 2026" https://www.davidzwirner.com/. Loewe: "Fresh classics" + one line https://www.loewe.com/usa/en/home. Boucheron: three fragments https://www.boucheron.com/en/. *Build:* a five-line `<hgroup>`: eyebrow (Public Sans caps 11px, tracked), name (Caslon Display), reference (Public Sans), place, status. No verb.

2. **Names carry the material and the number.** Loewe "Sweater in wool"; Oscar Heyman "45.61ct Star Sapphire Ring"; F.P. Journe "Calibre 1518"; Breguet "5527BBYABW0"; Unimatic "Edition of 250"; Le Labo "SANTAL 33". *Build:* product schema with `name`, `material`, `reference`, `edition` and render all four, every time, in that order.

3. **Price is stated plainly or withheld with a sentence, never decorated.** Piaget "$ 16,200 Sales tax not included"; Boucheron "Price on demand"; David Webb "Price Upon Request"; Sotheby's "Estimate: 120,000 – 180,000 USD". Never "Regular price", "Sale price", "From $X.00" with cents, "4x $0 with" (Heirest, Seaman Schepps, Marrow, WWAKE all leak these). *Build:* format with `Intl.NumberFormat('en-US',{maximumFractionDigits:0})`, and a `priceNote` string; a one-of-one uses the estimate grammar.

4. **The place is the eyebrow.** Pace ("New York" above a show), Unimatic ("milan, italy"), Lizzie Mandler's address as the top bar, Verdura "Suite 1205", Seaman Schepps' seasonal dates, Heath "Enter at the Boiler Room". *Build:* every event, piece and journal entry has a `place` field; it renders above the title in Public Sans caps.

5. **One status word instead of a badge.** Aman "Now open" / "Opening 2028"; Zwirner "Now Open:" / "Coming Soon:"; Grand Seiko "Jan.2027 Release"; Emily P. Wheeler "Sold". Not "NEW • BEST SELLER • JILLIAN'S PICK" (Marrow). *Build:* a single `status` enum (`new`, `sold`, `commissionable`, `inWindow`) rendered as a sentence fragment in small type, no pill.

6. **The archive is a room, not a page.** Breguet records, David Webb Archives "the epicenter", Oscar Heyman "Living Archive", The Row "Archive", Verdura "archival ring design", Seaman Schepps' hallmark. *Build:* the Royal American registry as `/archive` with a numbered list, old-style figures, and "adapted from Registry No. 12" lines on current pieces.

7. **The workshop is upstairs.** David Webb "proudly sits above our Madison Avenue Flagship", Seaman Schepps "Diamond District", Oscar Heyman "Madison Avenue workshop", Heath factory tours, Breguet "At the heart of the Manufacture", Viltier's showroom screen. *Build:* one bench photograph, one sentence, on Home and House only, with the Brentwood address beneath it.

8. **Silence is budgeted.** Byredo's three wordless images with a deliberate `noLogo_noCTA` master; Hermès' four screens; The Row's single photograph. *Build:* a `SilentFrame` component (image, optional 4-word caption, no link styling) and a rule that at least one of the six home screens uses it.

9. **One typographic idea, repeated.** Suzanne Kalan's italic lead word; Steinway's emphasised first word; Perfumer H's italic format line; Dinh Van's caps + lowercase pair (08). *Build:* ours is the italic word inside a Caslon Display heading and the Public Sans eyebrow above it. Nothing else: no underlines on hover, no outlined buttons.

10. **Motion is owned, and switchable.** Chopard "Disable animations", Grand Seiko "Reduce Animations", Lenis `respectReducedMotion` default, Cartier 365 "all the content is in the HTML". *Build:* a footer toggle writing `data-motion` to `<html>` and `localStorage`; every GSAP context checks `prefers-reduced-motion` OR the flag; the ring falls back to a poster.

---

## 3. Motion that is allowed on a calm site

Rules first: nothing pins longer than one viewport (08 §1d.14); scroll speed is never changed on text; every recipe honours `prefers-reduced-motion` and the footer toggle; Lenis stays at defaults (`lerp 0.1`) or slightly tighter (`0.12`), never looser; under reduced motion Lenis forces `lerp 1` on its own https://github.com/darkroomengineering/lenis.

**M1. Lenis + ScrollTrigger wiring (once, in the root).**
```js
const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Source for the pattern: https://github.com/darkroomengineering/lenis.

**M2. The 12px reveal (the only reveal).** Opacity 0→1 and `y` 12→0, 600ms, `power2.out`, staggered 60ms across a block's children, triggered at 80% viewport, once.
```js
gsap.utils.toArray('[data-reveal]').forEach(el => {
  gsap.from(el.children, { opacity: 0, y: 12, duration: .6, ease: 'power2.out',
    stagger: .06, scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
});
```
CSS fallback: `@media (prefers-reduced-motion: reduce) { [data-reveal] * { opacity: 1 !important; transform: none !important; } }`

**M3. Word-split title (Miu Miu's "AHouse / thatwe / shaped").** Split a Caslon heading into words, mask each in `overflow:hidden` spans, translate 100%→0 with 40ms stagger. Do it once per page, on the design name only. https://immersivebags.miumiu.com/
```js
const words = title.textContent.split(' ');
title.innerHTML = words.map(w => `<span class="m"><span>${w}</span></span>`).join(' ');
gsap.from('.m > span', { yPercent: 110, duration: .9, ease: 'power3.out', stagger: .04 });
```
`.m { display:inline-block; overflow:hidden; vertical-align:bottom } .m > span { display:inline-block }`

**M4. Image settle, not parallax.** A full-bleed photograph scales from 1.04 to 1.00 over the viewport it occupies, scrubbed. No vertical offset, so text never drifts.
```js
gsap.fromTo(img, { scale: 1.04 }, { scale: 1, ease: 'none',
  scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
```

**M5. The read-marker (Cartier 365's folded corner).** When a design page has been visited, its thumbnail on the line page gets a 10px folded-corner triangle in gold leaf. State in `localStorage`, no animation beyond a 200ms fade. https://www.awwwards.com/behind-the-scenes-designing-and-building-365-a-year-of-cartier.html
```css
.card[data-read]::after { content:""; position:absolute; top:0; right:0;
  border: 5px solid transparent; border-top-color:#B08D57; border-right-color:#B08D57;
  opacity:0; animation: fade .2s forwards; } @keyframes fade { to { opacity:1 } }
```

**M6. Page transition: paper wipe.** On route change, a `#F5F2EC` panel covers the viewport (280ms, `power2.inOut`), the new route mounts, the panel leaves (320ms). No logo in the panel, no counter. In Hydrogen use the View Transitions API where supported and this GSAP fallback elsewhere.
```js
export async function wipe(navigate) {
  await gsap.to('#wipe', { yPercent: 0, duration: .28, ease: 'power2.inOut' });
  navigate();
  await gsap.to('#wipe', { yPercent: -100, duration: .32, ease: 'power2.inOut', delay: .05 });
}
```

**M7. Hover on a product card: nothing on the image, one thing on the text.** The name does not move; the price fades from ink to 60% ink. Never a second image (08 §1d.9).
```css
.card .price { transition: color .25s ease; } .card:hover .price { color: rgba(18,18,18,.6); }
```

**M8. Link underline that draws, once.** Editorial links get a 1px gold hairline drawing from left over 300ms; no colour change.
```css
a.ed { background: linear-gradient(#B08D57,#B08D57) no-repeat 0 100% / 0 1px; transition: background-size .3s; }
a.ed:hover, a.ed:focus-visible { background-size: 100% 1px; }
```

**M9. Accordion (PDP details).** Height auto via `grid-template-rows: 0fr → 1fr`, 320ms, plus a 90° rotation of a hairline plus sign. No chevron icons.
```css
.acc > div { display:grid; grid-template-rows: 0fr; transition: grid-template-rows .32s ease; }
.acc[open] > div { grid-template-rows: 1fr; } .acc > div > * { overflow:hidden; }
```

**M10. Numbers that count on the registry page only.** Old-style figures tick from 0 to the registry count over 800ms when first seen. One instance per site.
```js
gsap.from(obj, { v: 0, duration: .8, ease: 'power1.out', snap: { v: 1 },
  onUpdate: () => el.textContent = Math.round(obj.v), scrollTrigger: { trigger: el, once: true } });
```

**M11. The pointer-lit stone (ring only).** The key Lightformer's target follows the pointer with a lerp of 0.08; off-canvas, it eases home over 1.2s. Touch devices use the device's scroll position instead of the pointer.
```js
useFrame((_, dt) => { target.lerp(pointer3, 1 - Math.pow(0.001, dt));
  light.target.position.copy(target); });
```

**M12. The one pin: "The stone is set" (ring only).** A `ScrollTrigger` with `pin: true`, `end: '+=100%'` (exactly one viewport), `scrub: 1`, driving a GSAP timeline of four tweens (band arrives, head rises, stone lowers, claws close) plus one light sweep. Under reduced motion the pin is removed and a poster is shown.
```js
const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=100%', pin: true, scrub: 1 } });
tl.from(band.position, { y: -.6 }).from(head.position, { y: -.3 }, '<.2')
  .from(stone.position, { y: .5 }, '<.3').to(claws, { closed: 1 }, '<.4').to(sweep, { x: 1 }, '<.2');
```

Not allowed: parallax on text, marquee tickers (Tilly Sveaas), autoplay carousels with dots (Rosewood ×11, Phillips ×9), hover image swaps (Tabayer), counters in the loader, cursor followers, scroll-jacked sections longer than one viewport, scale-on-hover cards.

---

## 4. Typography system of a house

What the fetched houses do with case: sentence-case headings and uppercase only for small labels (Loewe, Boucheron, Hermès, Aman, Pace, Zwirner); name + lowercase tagline pairs (Piaget "Possession / Own the moment"); one italic word in a roman heading (Suzanne Kalan, Steinway); numerals in names (Le Labo, Oscar Heyman, Breguet). What templates do: all-caps hero lines and CTAs in two casings (Single Stone, Marrow, Purdey, Rosewood, David Webb).

**Families.** Libre Caslon Display (names, one italic word), Libre Caslon Text (body, captions, old-style figures via `onum`), Public Sans (eyebrows, references, prices, UI). No third family. Loaded as self-hosted WOFF2 with `font-display: swap` and size-adjust fallbacks so the paper does not reflow.

**Scale (fluid, 1.25 ratio at 1440, 1.2 at 390).**
```css
:root{
  --paper:#F5F2EC; --ink:#121212; --navy:#16213A; --gold:#B08D57;
  --f-display:"Libre Caslon Display",Georgia,serif;
  --f-text:"Libre Caslon Text",Georgia,serif;
  --f-ui:"Public Sans",system-ui,sans-serif;
  --t-name: clamp(2.6rem, 1.2rem + 4.2vw, 6.4rem);   /* design name */
  --t-h2:   clamp(1.8rem, 1rem + 2vw, 3rem);
  --t-body: clamp(1rem, .95rem + .25vw, 1.125rem);
  --t-cap:  .8125rem;                                  /* captions, notes */
  --t-eye:  .6875rem;                                  /* eyebrows, refs */
  --lh-display: 1.02; --lh-body: 1.5;
  --measure-display: 22ch; --measure-body: 62ch;
}
```

**Roles.**
```css
.name{ font:400 var(--t-name)/var(--lh-display) var(--f-display); letter-spacing:-.01em;
  max-width:var(--measure-display); text-wrap:balance; hanging-punctuation:first last; }
.name em{ font-style:italic; font-weight:400; }        /* the one italic word */
.eyebrow{ font:500 var(--t-eye)/1 var(--f-ui); text-transform:uppercase; letter-spacing:.14em; color:var(--navy); }
.ref{ font:400 var(--t-eye)/1 var(--f-ui); letter-spacing:.08em; font-variant-numeric: tabular-nums; }
.body{ font:400 var(--t-body)/var(--lh-body) var(--f-text); max-width:var(--measure-body);
  font-variant-numeric: oldstyle-nums proportional-nums; font-feature-settings:"onum","pnum","kern","liga"; }
.price{ font:400 var(--t-body)/1.3 var(--f-text); font-variant-numeric: lining-nums tabular-nums; }
.price .note{ font:400 var(--t-cap)/1.3 var(--f-ui); margin-left:.6em; color:rgba(18,18,18,.6); }
.caption{ font:400 var(--t-cap)/1.4 var(--f-text); font-style:italic; }  /* Phillips' italic date line */
```

**Rules.**
- Uppercase is tracked at `.14em` and never larger than `--t-eye`. No tracked caps above 12px anywhere; the house's caps are a whisper (Hermès footer heads, Aman eyebrows).
- Hanging punctuation on display names (`hanging-punctuation: first last` where supported; otherwise a `text-indent: -.4ch` on lines that open with a quote).
- Old-style figures in running text and the registry list; lining tabular figures in prices and references so columns align.
- Measure: 22ch display, 62ch body (08 §1e.2), captions 40ch.
- One italic word per heading, maximum; italic is never used for emphasis in body copy.
- No bold anywhere; weight contrast comes from family and size.
- Numerals are allowed to be the headline (Chaumet's "250 ans", Oscar Heyman's "since 1912" in the phone number).
- Headings end without punctuation; taglines end with a full stop ("Own the moment.").
- Ampersands only in the wordmark context; "and" in copy.

---

## 5. Photography standard

The shot list is read off the filenames and alt texts of the houses, not invented.

**Per design (five frames, fixed).**
1. **3/4 face packshot** on paper seamless `#F5F2EC` (Breguet `3-4FACE`; Viltier `_3_4`; Single Stone "clean white background") with a visible contact shadow (Leica "on a podest").
2. **Profile / lateral** (Breguet `LATERAL`, Viltier `-PROFIL`) at the same scale and camera height as frame 1, so the gallery reads as a turntable.
3. **Top shot** (Breguet `TOPSHOT`) for rings and brooches; **flat lay on paper** for chains (Marrow "on blush paper").
4. **Detail** at 2:1 macro of the setting or the hallmark (WWAKE `-detail`; Seaman Schepps' "Shell stamp").
5. **The hand frame**: one hand, Tennessee daylight, grey or paper ground, no face, no second ring unless it is the stack (Single Stone's hero alt; Oura's "Two hands touching"; Tilly Sveaas "on wrist"). Marrow's "Model's hand with an oval diamond engagement ring" is the reference crop.

**Per line (two frames).** A **still life** of three pieces on crumpled paper or dark velvet (Marrow's two grounds; Breguet `stilllife-2`; Byredo `PRODUCT_STILL_LIFE`), and one **origin landscape** with no product (Perfumer H's red clay and arid valley; Grand Seiko's nature key visual).

**Per house (three frames).** The bench (Seaman Schepps "Image from our workshop making…"; WWAKE `jewelry-making-workbench`; Piaget "Assembling a watch movement"), the counter with the family behind it (Sidney Garber in 08; Oscar Heyman's 1950s family photograph; Single Stone's designer in a chair), and the storefront in daylight (Yvonne Léon's boutique photo; Seaman Schepps' three store exteriors).

**Grounds.** Paper `#F5F2EC` default; light grey `#E2E2E2` (Single Stone's section background) for white metals that vanish on paper; dark velvet only for stones with fire; never pure white, never a gradient.

**Crops.** Shoot every hero at 4:5 and 3:2 as two separate compositions (Grand Seiko `_KV_5-9` and `_KV_3-2`; Boucheron `4x5`; Tabayer `4x5`). Ship both through `<picture>`. Keep a `noLogo_noCTA` master of each campaign frame (Byredo).

**Lighting.** One large soft key from upper left, a hard rim for the stone, daylight 5000–5600K for the hand frame; no coloured gels; the stone's fire comes from the rim, not from post. Shadows kept; no cut-outs on home or design pages (cut-outs belong on the line grid only, Unimatic/Verdura style).

**Alt text.** Written as the bench would say it (Coutumes: "Grained camel leather, tonal stitching…"; Verdura: "…adapted from a 1940 archival ring design"): metal, finish, stone, setting, size, ground. Never the product name alone, never empty (Anita Ko, Emily P. Wheeler, Deadly Ponies, Ashley Zhang all ship empty alts).

**Three-image discipline per piece on the PDP** (Messika's packshot / still life / worn, 08): frames 1, 3 and 5 above; frames 2 and 4 are in the gallery; a technical line drawing with millimetres is the sixth (Tilly Sveaas `Technical_Drawings`).

---

## 6. What makes an American luxury site read American without kitsch

Beyond 08 §3, five more codes, each live on a fetched site:

1. **The cross-street and the suite number.** Fred Leighton "773 Madison Avenue at 66th Street"; Verdura "745 Fifth Avenue, Suite 1205"; Heath "555 Alabama Street… Enter at the Boiler Room"; Steinway "One Steinway Place, Astoria, NY". European houses give a city (Chaumet, Viltier give "Paris"); American houses give directions. *Us:* "157 Franklin Road at Moores Lane, Brentwood. Park behind the building."

2. **Seasons and hours as facts.** Seaman Schepps: Palm Beach "October 15 - May 24", Nantucket "May 24 - October 15", "Mon - Sat, 10am - 6pm"; Lizzie Mandler "Tuesday through Saturday"; Verdura "10 AM – 5 PM, Monday – Friday". The hours are the welcome. *Us:* hours on Home (one line) and Visit (full), set in Caslon, no clock icon.

3. **The workshop upstairs and the hallmark named.** David Webb's workshop "above our Madison Avenue Flagship"; Oscar Heyman "Madison Avenue workshop"; Seaman Schepps "Diamond District" and the "Shell stamp"; Heath "All Handcrafted In California" and factory tours. American houses say where the hands are. *Us:* "Set and finished in Brentwood" once, and a photograph of the stamp inside the band.

4. **The founding year in the phone number, the catalog season, the archive name.** Oscar Heyman "1.800.642.1912", "Holiday 2026 / Spring 2026", "Living Archive"; Seaman Schepps "Since 1904" and a timeline "Today / 1904"; Heath "In California since 1948"; Verdura "to America in 1934". The year is a plain number, not a crest. *Us:* the founding year as a nav item (Chaumet's device, 08) and as the last four digits of nothing we fake; the registry named "The Register" or "Living Archive" style, dated by season.

5. **Carat weight and dimensions in the name; "Price Upon Request" as the only withholding.** Oscar Heyman "45.61ct Star Sapphire Ring", "62.63tcw"; Steinway "Model D / 8' 11¾""; David Webb "Three to One Cuff, Malachite / $88,000" or "Price Upon Request"; Sotheby's estimate grammar "120,000 – 180,000 USD". American luxury is specific about measure and plain about money. *Us:* "Shooting Star ring, 18k yellow gold, 0.42 ct Montana sapphire, band 1.8 mm" and a stated price with the tax note.

And the kitsch to refuse, seen live: 0% APR tiles and sticky VISIT/CALL/EMAIL/CHAT bars (Fred Leighton), Affirm bars (Single Stone), "Summer Sale!" in the cart (Oscar Heyman), a 50-state dropdown on the home page (Fred Leighton), "Made In New York" as a numbered icon-row value prop (WWAKE), press logo strips (Tilly Sveaas, Marrow). Place and year, never flag and font.

---

## 7. The signature ring: what the best WebGL luxury sites teach

**How they frame 3D.** The award-level luxury experiences never show a floating product in a void. Le Chœur des Pierres frames a jewel inside the world of its stone and then shows the drawing beneath it (https://www.makemepulse.com/case-study/cartier-le-choeur-des-pierres). Cartier in Time frames twelve films on a clock (https://immersive-g.com/projects/cartier-in-time). Miu Miu frames bags inside a house you walk through, with campaign photography and type "inside a full WebGL space" (https://www.landing.love/sites/immersivebags/). Oura never renders the ring in isolation on its home page; it is on a hand or a sleeper (https://ouraring.com/). *Ours:* the ring is framed by the bench: the camera sits where the setter's eye sits, the ground is the paper of the PDP, and the type beside it is the same `.name` and `.ref` as everywhere else, so the ring belongs to the page rather than hovering over it.

**How they avoid gimmick.** makemepulse: "the interface stays intentionally restrained"; "subtle visual effects". 14islands: WebGL adds effects but "all the content is in the HTML". Lenis: "no hijacked scrollbars, no accessibility trade-offs". Instrument on Oura: "progressive disclosure", "By showing, not telling". *Ours:* one thing happens (the stone is set); the ring does not spin on idle; there is no drag hint, no "scroll to explore" text; hotspots (W&W 24) are replaced by the accordion below the canvas.

**Loading and poster patterns.**
- Poster first: a 3/4 face packshot (frame 1 of §5) is the `<img>` in the DOM; the canvas mounts behind it and cross-fades in 300ms when `useProgress` hits 100 and the first frame has rendered. Under reduced motion or WebGL failure the poster stays and the pin is removed. (Cartier 365's "content in HTML" principle.)
- No counter, no percentage, no logo loader. The only loading signal is the poster's contact shadow deepening.
- Textures as KTX2 with Basis compression (14islands' GPU-upload lesson); HDRI for the Lightformers at 1k, not 4k; the GLB under 1.5 MB with Draco; everything `preload`ed on the line page so the design page opens hot.
- Hydrogen: render the poster and the HTML copy on the server; `lazy()` the R3F scene with a `<Suspense fallback={null}>` so the canvas never blocks hydration.

**How long anything pins.** The 365 case uses endless scroll and no pins; the immersive experiences (Cartier in Time, Miu Miu) are whole-page WebGL that own the scroll entirely, which is the opposite of a commerce page. Our rule stands at exactly one viewport (`end: '+=100%'`), scrubbed, reversible, and below the hero so the first screen of a design page is a photograph and a caption, not a canvas.

**Specific ideas, ranked.**
1. **The gouaché beneath.** On the House page, the ring's R3F view cross-fades to the family's own bench sketch of the same ring (a scanned pencil drawing, same camera angle) on hover or at the end of the one-viewport scroll. It is Cartier's gouaché device, and we own the drawings. Implementation: a second material (MeshBasicMaterial with the scan as `map`, `transparent`) lerped in via a `uniform` or two overlaid meshes with opacity, 600ms.
2. **The engraving read live.** The inside of the band carries the customer's text in Libre Caslon Text rendered to a `CanvasTexture`, and the camera eases to read it (08). Keep the camera move under 900ms and never on scroll; it is triggered by typing.
3. **Light that follows the pointer** (M11). The only continuous motion on the site; disabled on touch.
4. **The read-marker on the line page** (M5), so the ring's page, once visited, shows its folded gold corner.
5. **A paper-wipe transition into the design page** (M6) that lands with the poster already visible, so the ring is never seen loading.
6. **Nothing else.** No AR, no exploded view (Breguet's `ECLATE` is a watch idea), no configurator on the home page (Heirest), no hotspots.

---

## 8. Two surprising findings

1. **The award-level luxury experiences are almost all non-commerce.** Cartier 365, Cartier in Time, Le Chœur des Pierres, Miu Miu "A House that we shaped", LV VIA: none sells from the page. The commerce home pages that read as houses (Loewe, Hermès, Boucheron, The Row, Byredo) win by subtraction, not by WebGL. The ring is our one permitted exception and it must behave like the makemepulse piece: restrained, one gesture, content in HTML.
2. **Price-withholding grammar is the sharpest luxury signal in the data, and it is cheap.** "Price on demand" (Boucheron), "Price Upon Request" (David Webb), no price at all (F.P. Journe, Breguet, Oscar Heyman, Verdura, Steinway), "Sales tax not included" (Piaget), "Estimate: … USD" (Sotheby's). Every template leak in this study was a price label: "Regular price", "Sale price" on every card, "From $X.00", "4x $0 with", "You are €500 away from free shipping". We state the price plainly once, and we never let the platform's label strings reach the page.
