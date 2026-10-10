# 08. Remake design direction: a designer house, not a jewelry store

**For:** American Jewelry (Brentwood + Mt. Juliet, TN), rebuilt on Shopify Hydrogen (React, react-three-fiber, GSAP, Lenis)
**Date:** 2026-10-09
**Owner's brief, verbatim:** "it looks cookie cutter. make this a DESIGNER, LUXURY, AMERICANA jewelry store site. no vibe code slop, no cookie cutter, no jareds.com. locate the highest end inspiration. make everything as least wordy as possible. research how to make the site stunning, maybe a super stunning cool feature, that's not in the way but super cool."
**Builds on:** 01 (house teardowns, sections 3–4), 05 (watch houses, section 5), 06 (visual field notes), HANDOFF.md "Rules the family has set." Nothing in those is repeated here except where a rule changes what gets built.
**Method:** every outside site below was fetched live on 2026-10-09 as text (WebFetch). Sites that walled themselves off are named and skipped, not guessed. Typeface identification from text alone is impossible, so no outside site's typeface is asserted here.

---

## 0. The direction in one screen

**Thesis.** The current site is correct and still reads as a template because it is built from equal cards in equal rows, repeats the same intro block on every page, and explains everything in full. A designer house does three things differently: it shows **one subject per screen**, it lets **names and photographs do the work words are doing now**, and it keeps **one quiet piece of motion** that belongs to the product. Americana is not a flag or a slab typeface. It is a Caslon, daylight, a street address, a numbered registry, and plain declarative sentences.

**The signature feature.** *The stone is set.* On every design page and at the top of the builder, the house's own parametric ring (already built: band, head, claws, refractive stone, studio Lightformers, a camera that eases to what changed) assembles itself over one scroll of the viewport: the band arrives, the head rises, the stone lowers into it, the four claws close, and one sweep of light crosses the stone. It is scrubbed by scroll, so it runs backward when you scroll up, it never pins for more than one screen, and it falls back to a still frame under `prefers-reduced-motion`. It is the ring the family actually sells, made at the bench, doing the thing the bench does. Cost: about three weeks, because the geometry and materials exist. Two small moments ride on the same renderer: **light that follows the pointer** on the 3D view (the key Lightformer's target tracks the cursor, so the stone throws fire as the hand moves), and **the engraving read live**, typed on the inside of the band with the camera turning to read it.

**The three biggest changes from the current site.**
1. **Kill the card grid as the page's grammar.** Home goes from eleven card rows (hero, feature, three product cards, three numbered line cards, three builder tiles, an eight-card grid, a text block, two store cards, a trust line, a brand block) to six screens, each with one subject. Product cards survive only on the line page, in an asymmetric 2 + 1 rhythm, four lines of text each, no second image on hover.
2. **Cut words by two thirds and move the rest into accordions and the journal.** The product page shows about 700 words with every section expanded; the budget is 90 words above the fold and 160 in accordions. The repeated brand intro ("A house of fine jewelry in Tennessee. Designed in Tennessee…") leaves every page except the House and the footer.
3. **Replace the current type and palette with a Caslon system on warm paper.** EB Garamond and Jost read as Paris and Bauhaus. Libre Caslon Display + Libre Caslon Text + Public Sans (all SIL OFL) read as an American printed thing. Paper #F5F2EC, ink #121212, navy velvet #16213A, gold leaf #B08D57 for hairlines and numerals only.

---

## 1. What reads as "Jared's" and what reads as designer

### 1a. The template tells, with the sites that have them

Fetched 2026-10-09. Each line is a convention that marks a site as a retail template; the source shows it live.

- **A rotating promo ticker with percent-off and footnote marks.** Jared's top bar runs "20% Off** Engagement, Wedding & Anniversary Rings" / "Extra 25% Off◇ Previously Owned Jewelry" in a loop. https://www.jared.com/
- **A hero that is an offer, not an object.** Jared: "The One Worth Celebrating" + "20% Off**" + "SHOP NOW". The family's old site: three-slide carousel with a "swipe left" cue, "Forever starts here… SHOP BRIDAL". https://www.jared.com/ · https://american.jewelry
- **"Shop by Category" tiles, each with "Shop Now".** Old site: eight tiles. Jared: seven. Catbird: "SHOP UNDER $200", "SHOP LITTLE LUXURIES". https://american.jewelry · https://www.catbirdnyc.com/
- **An icon row of value props.** Old site: "Full Service Repairs / Over 1,000 Five Star Reviews / One-of-a-kind Custom Design". Jared: four service tiles each with "Learn More". Marla Aaron has one too. https://american.jewelry · https://www.jared.com/ · https://marlaaaron.com/
- **A 16-product grid on the home page with wishlist hearts.** Old site "Shop American Classics". Jared "Chosen by Jared" with 20%-off badges and metal swatches on every card. https://american.jewelry · https://www.jared.com/
- **Price-band chips.** Catbird: Under $150 / $300 / $500 / $1000. Jade Trau: gifts "under $2,500 through over $10,000". https://www.catbirdnyc.com/ · https://jadetrau.com/pages/about
- **Discount capture.** Catbird: 10% first purchase + birthday treat; "Our Spring Gift to You". Old site: "VIP Birthday Club Discount". Mejuri: "Mejuri+" membership pitch. https://www.catbirdnyc.com/ · https://american.jewelry · https://www.mejuri.com/
- **Financing above the fold or in nav.** Jared: Preferred Credit Card, Lease Purchase Program, Affirm. Spinelli Kilcollin's utility bar: "Affirm + Klarna". https://www.jared.com/ · https://spinellikilcollin.com/collections/all
- **Five-star graphics and testimonials on the home page.** Catbird: five-star graphic with three named testimonials. Old site: "Middle TN's favorite jeweler". https://www.catbirdnyc.com/ · https://american.jewelry
- **Exclamation points.** Old site custom page: "we love helping you bring your ideas to life!", "completely unique!", "Gone are the days of someone taking your precious jewelry behind some door and out of view!" https://american.jewelry/service/custom-design/ · https://american.jewelry/service/about/
- **"For Her / For Him" toggles, "Shop the Look" carousels, "Stay in the loop!" newsletter.** Jared and the old site. https://www.jared.com/ · https://american.jewelry
- **Announcement bars for shipping thresholds.** Shinola "free U.S. shipping over $125", Filson "Free Shipping over $99", Stetson "$99+", Schott "$100", Red Wing "Save Up To 40%". Every heritage brand does it; no jewelry house does. https://www.shinola.com/ · https://www.filson.com/ · https://www.stetson.com/ · https://www.schottnyc.com/ · https://www.redwingshoes.com/heritage/

### 1b. What the current site does that still reads as template

Read from https://american-jewelry.vercel.app on 2026-10-09 (home, /americana, /pieces/shooting-star-ring, /build/ring, /house).

1. **Equal cards in equal rows, eleven times on the home page.** Three Shooting Star product cards, three numbered line cards, three builder tiles, an eight-card "From the bench" grid, two store cards. The eye never gets one subject.
2. **The same brand intro block on every page.** "American Jewelry / A house of fine jewelry in Tennessee. Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported. / Book an appointment" appears above the content on /americana and on the product page, then again as the footer brand block. That repetition is the single strongest "generated" signal.
3. **"Book an appointment" four to six times per page.** Hero, trust line, brand block, mobile menu, footer, and the PDP's "book an hour".
4. **Every product card carries two images and a hover swap**, and every card has the same four lines. Fine on a line page, numbing on the home page.
5. **The product page is fully expanded**: details, stones, care and warranty, delivery and returns, a question, a summary blurb, behind the design, complete the set. About 700 words with nothing folded.
6. **The builder landing is three equal cards with two bulleted lists each**, then two explanatory sections ("One quality for each stone", "How the price is made"). It explains the builder instead of being the builder.
7. **Photography is reused across pages.** The hand with stacked rings is the Americana hero and a PDP thumbnail; the PDP main image shows bezel-set gemstone rings that are not the Shooting Star Ring. Field notes 06 already said this is the biggest gap; it remains so.
8. **Trust line on the home page** ("2,537 Google reviews across both stores"). 01 §3.5 already moved reviews to Visit and Services; the home still has it.
9. **A text-heavy House page** (about 800 body words) with a four-step numbered process list and a three-card "What we make" grid, which is the home page again.

### 1c. The designer tells, with the sites that have them

- **One subject per feature block, a name and one line.** Mikimoto's blocks (Bow Charm, L'éclat, Prestige Rendezvous) each carry one subject; its one blurb is a single sentence, "Light that is released suddenly from amidst stillness." Repossi gives each collection one block and one sentence ("the meeting of the round and the point"). https://www.mikimotoamerica.com/ · https://www.repossi.com/
- **Names, not categories, as the navigation.** Juri's home page is six collection names with counts and nothing else: "Rivulet (12)", "Ribonette (06)", "Berryware (06)". No "Shop now" anywhere on the page. Fernando Jorge's nav is eleven collection names (Vertex, Fluid, Stream, Flame…). Irene Neuwirth lists fourteen collection names and says "Hover" to explore them. https://www.jurijewelry.com/ · https://fernandojorge.co.uk/ · https://ireneneuwirth.com/
- **Copy under 150 words on the whole home page.** Fernando Jorge about 100, Brent Neale 100–150, Mikimoto 100–150, Marla Aaron 150–200, Buccellati's longest passage about 60. https://fernandojorge.co.uk/ · https://brentneale.com/ · https://www.mikimotoamerica.com/ · https://marlaaaron.com/ · https://www.buccellati.com/en/
- **Object photography on a plain ground; faces only when they are the designer's.** Sophie Bille Brahe: product alt text "a beige background", grey backdrops in filenames, named portraits (Dree Hemingway, Laila Gohar), and "Bille Brahe Family" imagery. Messika splits "packshot" and "Still Life" from "Outfit Femme". Jessica McCormack: still life and stop-motion. https://sophiebillebrahe.com/ · https://www.messika.com/en/ · https://www.jessicamccormack.com/
- **A single ornament that is not a sales device.** Juri's two live clocks (PARIS, TOKYO, with temperature). Sidney Garber's "80th ANNIVERSARY" as a nav item. https://www.jurijewelry.com/ · https://www.sidneygarber.com/
- **Display name + one tagline, then "Discover".** Chaumet: "Joséphine" / "Une joaillerie à l'allure résolument parisienne, entre élégance et audace." / "Découvrir la collection". Dinh Van: "A SIGNATURE, CRAFTED" / "An icon among icons." https://www.chaumet.com/ · https://www.dinhvan.com/en/
- **A one-of-one path that stays open after the sale.** Retrouvaí's "Inquire about recreating this piece". https://retrouvai.com/
- **A builder presented as the brand's device, not a tool.** Foundrae "Build Your Story" / "START BUILDING"; Marla Aaron "Build your own". https://foundrae.com/ · https://marlaaaron.com/
- **A voice with a person in it.** Marla Aaron: "Emails are boring. We try not to be." Jade Trau's pull quote: "WHEN I LOOK AT A DIAMOND, EVEN AFTER DOING THIS FOR ALMOST 20 YEARS, I GET EXCITED." https://marlaaaron.com/ · https://jadetrau.com/pages/about

### 1d. Never-do list (binding for the remake)

1. No promo bar, ticker, shipping-threshold banner, or announcement strip. The top of the page is the wordmark.
2. No "Shop now", "Learn more", "Click here", "Get started". Commerce CTAs name the thing ("Every Shooting Star ring", "Build on Signal"); editorial links say "The design" or "The story".
3. No category tiles with buttons on them. Categories live in the menu.
4. No icon rows. No value-prop trios. No star graphics. No review counts on the home page or any product page.
5. No percent, no "free", no "gift with purchase", no member tier, no financing above the footer.
6. No carousel the visitor must operate. No autoplay slider with dots.
7. No "For Her / For Him". Pieces are named; the wearer decides.
8. No eight-up product grid on the home page. Maximum one row of three, once, and only on the line page.
9. No hover image-swap on cards. The second photograph belongs on the product page.
10. No repeated intro block. A sentence is said once per site, not once per page.
11. No exclamation points, no "stunning / gorgeous / exquisite / elevate / curated / timeless", no "Maison / atelier / bespoke / savoir-faire", no "handmade", no "Made in America", no em dashes (HANDOFF rules).
12. No equal-width cards with 1px borders as the page's building block. No chips. No line drawings. No gradients as decoration. (HANDOFF rule 8.)
13. No text set over a photograph without the overlay class and a real contrast check. (HANDOFF rule 6.)
14. No scroll-jacking: nothing pinned longer than one viewport; nothing that changes scroll speed on text.
15. No stock, no AI imagery, no model faces that are not the family's.

### 1e. Designer tells (binding for the remake)

1. One subject per screen on home, line, design, house. The subject is a photograph or the ring; the words sit beside it, never on top of a product.
2. Asymmetric composition: a 7/5 or 8/4 column split, the image bleeding to one edge, the text column narrow (max 34 characters per line for display, 62 for body).
3. Type as design: the design's name set large in Caslon Display with an uppercase Public Sans eyebrow above it and one line below. The name is the decoration.
4. Object photography on seamless paper, four fixed views, one detail per feature, one hand frame in Tennessee daylight.
5. Editorial pacing: screens alternate image-left / image-right / full-bleed / text-only, never the same twice in a row.
6. Negative space measured in viewport heights: 20vh above and below every section on desktop, 12vh on mobile.
7. Restrained motion: opacity and 12px of travel on reveal; the ring is the only thing that does more.
8. Names, numbers and places as the adjectives: "Shooting Star", "Ref. AM 004", "157 Franklin Road", "Registry No. 12".
9. Price stated plainly, once, with its tax note, in the same type as the name.
10. The footer is a sitemap in small Caslon, the two addresses, and the legal line. Nothing promotional below the fold.

---

## 2. Highest-end inspiration beyond the houses already studied

Cartier, VCA, Harry Winston, Tiffany, Bulgari, Graff, Rolex and Patek are in 01/05/06 and are not repeated. Each site below was fetched live; "what to steal" is one thing per site. Skipped, with the reason: **Tasaki** (503 on both tasaki-global.com and tasaki.co.jp/en), **Pomellato** (only the navigation rendered; nav shows campaign names like "The Dualism of Milan", "Magnetic Gold", and a "Collezione 1967" named for the founding year, which is itself a usable Americana code: name an edit after a year), **Spinelli Kilcollin** (home truncated; the collection page rendered with no products), **Hodinkee Shop** (fetch refused), **Floema** (domain no longer resolves), **Eden Garden** (403), **David Yurman / Mejuri / Catbird** (covered in 01; Mejuri and Catbird re-read only for template tells above).

**Repossi** (repossi.com). One block per collection in a vertical stack, each with a name and a single sentence, then "Shop Now". The "Letters" block is a short story about the Place Vendôme boutique's 40th year. Nav: Jewellery, High Jewellery, Gift Inspirations, The Maison, Services, Journal. *Steal:* the collection page as a stack of one-sentence blocks; no grid until you click in. https://www.repossi.com/

**Messika** (messika.com). Separates "packshot" and "Still Life" from campaign ("Outfit Femme") imagery; product cards show image, name, metal, price, gold-color swatches. Body copy is one line per section ("The iconic motif is reimagined in a bangle bracelet, now offered in a slimmer, more delicate silhouette."). *Steal:* the three-image discipline per piece: packshot, still life, worn. https://www.messika.com/en/

**Chaumet** (chaumet.com, French page; the US path 404s). Display name as the heading, one tagline, "Découvrir". Headlines are names and nouns: "Joséphine", "Haute Joaillerie", "L'art du diadème", "Les diamants Chaumet", "Les pierres de couleurs", "Liens". A "Contraste amélioré" accessibility toggle in the footer. *Steal:* a nav item that is simply a number: "250 ans d'histoire". For us, the founding year as a link. https://www.chaumet.com/

**Buccellati** (buccellati.com). Very sparse: headline + one or two CTAs per block; uppercase tracked labels ("MADE IN ITALY HIGH JEWELLERY"); the longest passage is about 60 words. It also has the template tells (newsletter popup on load, "Add to Compare"), proof that sparseness alone does not make a house. *Steal:* the tracked uppercase eyebrow over a title-case name. https://www.buccellati.com/en/

**Mikimoto** (mikimotoamerica.com). One subject per feature block (Bow Charm, L'éclat, Prestige Rendezvous); a single poetic sentence as the whole blurb: "Light that is released suddenly from amidst stillness."; product images on plain white with secondary angles; CTAs "View Details", never "Shop". *Steal:* one sentence per design, written as an image, not a description. https://www.mikimotoamerica.com/

**Dinh Van** (dinhvan.com). All-caps four-word headlines with a sentence-case line beneath: "A SIGNATURE, CRAFTED" / "An icon among icons."; "60 YEARS OF FREEDOM AND CREATION"; a four-item service row at the bottom, not the top; prices from €990. *Steal:* the headline pair (caps noun phrase + one lowercase sentence). https://www.dinhvan.com/en/

**Fernando Jorge** (fernandojorge.co.uk). About 100 words of body copy on the home page. Collections are names only (Vertex, Deep Vertex, Parallel, Fluid, Stream, Flame, Brilliant, Aerial…). Locations are three cities as a row. Bespoke opens "For a piece that's truly yours, consider a bespoke creation." *Steal:* the collection list as a list of names with no images, and a Locations row that is just city names. https://fernandojorge.co.uk/

**Jessica McCormack** (jessicamccormack.com). A video element in the hero; still-life and stop-motion product photography; "Make an Enquiry" and "Book an appointment" as the two human CTAs; "Our World" holds "Meet Jessica", "Craftsmanship", "The Art". *Steal:* stop-motion stills as the motion budget for a page that has no film. https://www.jessicamccormack.com/

**Sophie Bille Brahe** (sophiebillebrahe.com). Product on beige and grey seamless; named portraits instead of anonymous models; "Bille Brahe Family" imagery; "Universe" as the house section with "Meet Sophie" and "Archive". Headlines are names: "L'Histoire d'Amis", "Tangerine Sky". *Steal:* "Archive" as a section (our Royal American registry) and the family photographed as the family. https://sophiebillebrahe.com/

**Foundrae** (foundrae.com). The builder is the brand ("Build Your Story", "START BUILDING", "BUILD YOUR NECKLACE NOW"); "Tenet Highlight" is a multi-paragraph meaning block; a 2x2 category grid. *Steal:* the builder named as a thing the house does, not a tool; the rest is template. https://foundrae.com/

**Marla Aaron** (marlaaaron.com). Voice: "Infinite ways to play", "Emails are boring. We try not to be.", "Let's dig in." Hover-swap tiles and an icon row are template; the voice is not. *Steal:* one line of actual personality per page. https://marlaaaron.com/

**Sidney Garber** (sidneygarber.com). "80th ANNIVERSARY" is a top-level nav item; "Charitable Mission" and "Our World" cards show the designer behind the counter; product cards carry name, type, material, price only. *Steal:* the year as navigation and the owner behind the counter as the only lifestyle frame. https://www.sidneygarber.com/

**Jade Trau** (jadetrau.com/pages/about). All-caps pull quote from the designer; "Meet the Designer" with a four-image grid; info blocks of one or two sentences ("IN-STOCK AVAILABILITY", "INSURED SHIPPING"). *Steal:* the designer's own sentence set as the page's largest type. For us: one sentence from the brother, on the House page and nowhere else. https://jadetrau.com/pages/about

**Irene Neuwirth** (ireneneuwirth.com). "Irene's Favorites" row; a list of fourteen collection names you hover to preview; trunk-show list; brand line "Everything at Irene Neuwirth is made with love." *Steal:* the hover-to-preview list of design names as a line page's header. https://ireneneuwirth.com/

**Brent Neale** (brentneale.com). 100–150 words on the home page; product names that describe ("Sunfish Boat Torque Necklace", "One-of-a-Kind Off-Set Rings"); a "Visit Our Showroom" tile; "shop now" in lowercase. *Steal:* descriptive piece names beside the design name. https://brentneale.com/

**Retrouvaí** (retrouvai.com). One-of-a-kind pieces with "Inquire about recreating this piece"; dark-ground product shots ("dark" in filenames); all-caps section heads; "Your Idea Brought to Life". *Steal:* the after-sale CTA on a sold one-of-one. https://retrouvai.com/

**Awwwards jewelry winners (fetched list).** The Awwwards jewelry category lists 27 sites; Site of the Day winners are ORE Bespoke Diamond Jewelry (Developer Award + SOTD, 2022-07-28), Floema (2021), Aroz (2021), Limnia (2019), Papazian (2016), Ron Rizzo (2011); Honorable Mentions 2024–2026 are Nida Tabba (2024-10-21), Eden Garden (2025-03-13) and Juri (2026-03-17). No jewelry SOTD in 2024–2026 was found; the Cartier 365 yearbook by 14islands took SOTD at Awwwards and FWA plus a Lovie silver, built as "stories and chapters that unfold as you browse" with the 2025 edition's "homepage and intro animation built around" the panther. https://www.awwwards.com/websites/jewelry/ · https://www.14islands.com/work/cartier365
- **ORE** (ore.co): numbered nav ("1 Bridal, 2 Custom, 3 Sourcing"), lowercase serif-style headlines broken across lines ("Bespoke Diamond Jewelry."), a project grid with play icons ("10CT Cushion… watch our full assembly video"), a "01 / 05" slider counter. *Steal:* numbered navigation and the making-of video as the product's proof. https://ore.co/
- **Juri** (jurijewelry.com): the sparsest home page in this study; collection names with counts; two live clocks as the only ornament; design and development credited in the footer. *Steal:* counts beside names ("Shooting Star (6)"). https://www.jurijewelry.com/
- **Nida Tabba** (nidatabba.com): collections named by place ("Mystery of Mexico", "Indus Valley", "Italian Warmth"); an interactive map promised in copy; "Explore" as the only CTA. *Steal:* place as the collection's name. https://nidatabba.com/

---

## 3. Americana luxury codes (outside jewelry)

Fetched: Shinola, Filson, Tecovas, Buck Mason (served as a Markdown index), Red Wing Heritage (redirects to redwingshoes.com/heritage), Stetson, Schott. Not fetched: Ralph Lauren (PerimeterX wall, see 01 §0), Hodinkee (refused), Tiffany's heritage page (403; 01 §1.4 records its line "As the first American high jewelry house…").

**What they actually do on the page.**
- **A one-line origin claim with a year, in the header or the first block.** Shinola's header: "The American Watchmaker." Filson: "Unfailing Goods Since 1897" and "The Original Outfitter since 1897." Schott: "THE AMERICAN ORIGINAL SINCE 1913." Stetson: "over 160 years of craftmanship" (and, inconsistently, "150 years" on the same page). Red Wing: "Heritage #1907". https://www.shinola.com/ · https://www.filson.com/ · https://www.schottnyc.com/ · https://www.stetson.com/ · https://www.redwingshoes.com/heritage/
- **Place as proof.** Shinola: "roots in Detroit", newsletter "dispatched from Detroit", a store locator tile named Tribeca. Buck Mason: "based in Los Angeles", "Made at BM Knitting Mills in Mohnton, PA", "Designed in Hollywood". Filson: the Alaska Gold Rush. https://www.shinola.com/ · https://www.buckmason.com/ · https://www.filson.com/
- **Materials named like proper nouns.** Filson: Mackinaw Wool, Tin Cloth, Rugged Twill. Red Wing: Rough & Tough Leather, Oro Legacy Leather. Tecovas: Regenerative Bison. https://www.filson.com/ · https://www.redwingshoes.com/heritage/ · https://www.tecovas.com/
- **Numbers as craft.** Stetson: "Handmade in over 200 individual steps". Shinola: 5-year limited warranty and a watch registration page. Schott: "four generations of family ownership", a factory tour ("TAKE THE TOUR"). https://www.stetson.com/ · https://www.shinola.com/ · https://www.schottnyc.com/
- **Plain declarative taglines, often with a verb missing.** Tecovas: "One West" / "The edge of everywhere." Stetson: "Out here, nobody tells you who to be. You find out." Red Wing: "Still the standard", "Well worn, never worn out", "Roots That Run Cold". Shinola: "The Runwell set our pace." https://www.tecovas.com/ · https://www.stetson.com/ · https://www.redwingshoes.com/heritage/ · https://www.shinola.com/
- **A guarantee with a name.** Filson "Unfailing Guarantee" (its own page). Shinola "BECAUSE TIME IS WORTH KEEPING". https://www.filson.com/ · https://www.shinola.com/
- **"Made in USA" as a label on the card, with the honest variant.** Red Wing: "Made in USA w/ Imported Materials" on one card. That honest variant is the model for our legal line. https://www.redwingshoes.com/heritage/
- **What they all also do, which we will not:** shipping-threshold bars, "SHOP NOW" tiles, 40%-off events, "Refer a Friend, You'll Both Get $50 Off" (Tecovas). The Americana brands are heritage *retailers*; we take their nouns and leave their promotions.

**Americana without kitsch: the rule set.**
1. **Say the year once, in the header line, and never say "heritage."** "Brentwood and Mt. Juliet, Tennessee. Since [year]." The year is the claim.
2. **Name the street.** "157 Franklin Road" and "401 S Mt Juliet Road, Suite 165" appear where a European house would put "Place Vendôme." Addresses are the house's crest.
3. **Name materials as nouns, not adjectives.** "Solid 14k gold, karat-marked." "Natural diamond, F–G, VS1, GIA." "Man-made diamond (laboratory-grown), D–F, VVS, IGI." Never "premium", "ethically sourced", "finest".
4. **Number things.** Reference numbers on every piece ("Ref. AM 004" exists; keep it). A registry number on every Royal American piece. "Registry No. 12. Acquired 2026." Counts beside design names ("Shooting Star (6)").
5. **Type: a Caslon, not a slab.** Slabs (Clarendon, Rockwell) say Western saloon; Caslon says a printed American document. Pair it with a plain gothic (Public Sans, which the U.S. Web Design System adapted from Libre Franklin; both are American gothic lineage). https://digital.gov/resources/an-introduction-to-typography
6. **Photograph daylight and a place, not a flag.** One frame per page in Tennessee daylight: porch rail, kitchen table, church step, truck tailgate at the Mt. Juliet lot. Never a barn, a bald eagle, denim-on-denim, bunting, or a Western font.
7. **Hands at work, no faces required.** The brother's hands at the bench with a graver, a loupe, a stone in tweezers. Schott's factory video and Stetson's "200 steps" are the model; we have the bench behind glass (the current site already says so).
8. **Plain declarative sentences, eight to fourteen words, verb optional.** "One stone, and nothing in its way." "The star sits on the finger." "Price before Tennessee sales tax."
9. **A guarantee with a name and a mechanism.** "Lifetime Care Program: cleaning, claw checks and polishing at either store, while you wait." (Exists; keep it, cut it to one line on PDPs.)
10. **The honest origin line, every time, Red Wing style.** "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported." Once per page, small, in the spec table, not in a hero.
11. **No "American" as an adjective except in the names.** Royal American, Americana, New American carry it. The copy never says "American-made", "American craftsmanship", "American quality".
12. **A registry, not a loyalty program.** The one Americana device that is pure luxury: a numbered ledger of one-of-ones with the wearer's name (consented), acquired year, and the stone's report number.

---

## 4. Signature feature shortlist

Scoring: *Fit* is for a calm luxury site where the feature must be "not in the way" (5 = invisible until it rewards you; 1 = demands attention). *Weeks* assume one engineer who already has the ParametricRing renderer (`site/src/components/three/ParametricRing.tsx`: MeshPhysicalMaterial gold, MeshRefractionMaterial stone with `bounces={3} ior={2.42}`, five Lightformers inside `<Environment resolution={256}>`, ContactShadows, OrbitControls, and a `useFrame` camera lerp to per-step presets).

| # | Feature | What it is | Real example | How on Hydrogen | Weeks | Fit |
|---|---|---|---|---|---|---|
| 1 | **Scroll-driven assembly of the house ring** | Over one viewport of scroll the band arrives, head rises, stone lowers, claws close, one light sweep | Apple AirPods Pro uses start-frame/end-frame image sequences per feature and "Take a closer look" angle tiles (https://www.apple.com/airpods-pro/); "Marvelous Stone" R3F concept keeps one ring on screen across the whole scroll with GSAP-driven camera (https://contra.com/p/cQAMEkLc-marvelous-stone-immersive-luxury) | GSAP ScrollTrigger `scrub: 1`, `pin` for exactly one viewport, labels + `snap: "labels"`; timeline drives mesh positions and the key Lightformer's intensity; Lenis feeds `ScrollTrigger.update` and `gsap.ticker` per the Lenis README; Canvas mounted client-only with a poster `<Image>` as SSR fallback; reduced-motion = poster | 3 | 4 |
| 2 | **Pointer-reactive light on metal and stone** | The key Lightformer's `target` tracks the pointer (eased), so moving the hand moves the fire in the stone and the highlight on the band | drei Lightformer has `target` and `intensity` props (https://drei.docs.pmnd.rs/staging/lightformer); drei's Diamonds example uses MeshRefractionMaterial on instanced stones (https://drei.docs.pmnd.rs/shaders/mesh-refraction-material) | `onPointerMove` on the Canvas writes a ref; `useFrame` lerps `lightformer.target`; touch devices use device orientation lightly or nothing | 0.5 | 5 |
| 3 | **Engraving read live inside the band** | Text typed in the builder appears inside the shank as you type; the camera turns to read it | iJewel's band builder updates "dimensions, materials, and details… live in 3D" (https://docs.ijewel3d.com/wedding-band-builder/why.html); the three.js forum's canvas-texture approach (https://discourse.threejs.org/t/how-to-engrave-words-name-into-a-ring-in-three-js/19163.md) | Already partly built: `engravingTex` on a BackSide MeshPhysicalMaterial. Add a camera preset "read the engraving" and a 400 ms debounce; Caslon rendered to the canvas texture | 0.5 | 5 |
| 4 | WebGL turntable on every PDP | Drag-to-rotate ring | Graff and Bulgari badge "3D" on cards (01 §1.5, §1.7); Hydrogen ships `ModelViewer` for Shopify Model3d files (https://shopify.dev/docs/api/hydrogen-react/latest/components) | Reuse ParametricRing for the three builder designs; GLB via ModelViewer for photographed pieces later | 1 | 4 |
| 5 | Cartier-style scroll texture (pavé/panther) | Scroll reveals a macro texture as full-bleed | Cartier 365 yearbook, SOTD at Awwwards and FWA (https://www.14islands.com/work/cartier365) | CSS `animation-timeline: view()` on a macro photo's clip-path; no JS (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) | 0.5 | 4 |
| 6 | Animated motifs (VCA style) | Looping drawn motif animation | VCA's Alhambra films are campaign video, not site interaction (search found no on-site motif animation: https://ecomm.design/site/van-cleef-arpels) | Lottie or SVG; needs an illustrator | 2 | 2 (line drawings are banned by HANDOFF rule 8) |
| 7 | Royal American registry (ledger of one-of-ones) | A numbered list: No., piece, stone report, year, "Acquired" | Sophie Bille Brahe "Archive"; VCA Heritage collection (01 §1.2); Retrouvaí's after-sale inquiry CTA (https://retrouvai.com/) | A Shopify collection with metafields (`registry_no`, `acquired_year`, `report_no`); plain HTML table in Caslon | 1 | 5 |
| 8 | "On a hand" photo that follows the cursor | Hand photograph parallaxes with pointer | Common on Awwwards; no jewelry house example found | Two-layer image with 4px transform | 0.3 | 2 (parallax on photography reads as template) |
| 9 | Hallmark reveal | Last gallery frame tilts the ring to show the AJ star inside the shank, with a 1px gold caption | Rolex "Discover in 360°" and one close-up per feature (06) | A sixth gallery frame + a 300 ms tilt via CSS; or camera preset in the 3D view | 0.3 | 5 |
| 10 | Stone report that unfolds | Click the report number; the GIA/IGI line opens into a folded card with the grades | Tiffany's inline diamond selector (01 §1.4) | `<details>` styled as a folded paper; data from metafields | 0.5 | 4 |
| 11 | Gold price of the day | A line in the footer: "Gold today: $X / oz" | Shopify app SpotMetal ships a ticker widget, hourly on free tier (https://pickyourapp.com/de/products/spotmetal-pricing-buyback) | Hydrogen loader fetches a metals API once an hour, cached; one line of Public Sans in the footer | 0.3 | 3 (useful for "how the price is made", but a ticker is a store tell; keep it to the builder's price breakdown) |

**Recommendation.**
- **Hero signature: #1, "The stone is set."** It uses the asset the family already paid for, it is the thing the bench does, it is reversible and finite (one viewport), and no fetched jewelry house does it. Place it on the three design pages (Signal, Shooting Star, Prism) and as the top of `/build`. Do not put it on the home page; the home hero is a photograph.
- **Moment one: #2, light follows the pointer**, on every 3D view (builder, PDP "3D" tab). Half a week, and it makes the stone feel real in a way photographs cannot.
- **Moment two: #3, the engraving read live**, in the builder. Already half-built; finishing it and giving it a camera preset makes the builder's last step the most memorable one.
- **Quiet features that are not "moments" but should ship:** #7 the registry page (it is the Royal American product page's natural home), #9 the hallmark frame, #10 the folded stone report.
- **Explicitly not recommended:** #6 (illustration budget, rule 8), #8 (reads as template), #11 as a ticker.

**Elevating the existing builder rather than replacing it.** Keep ParametricRing's materials and Lightformer rig. Changes: (a) move from `OrbitControls` to a fixed set of camera presets plus a gentle drag (drei `PresentationControls`), so the ring is never seen from below; (b) swap the studio HDRI for a warm one, since the Lightformers already give the softboxes (Poly Haven's studio category has 97 CC0 HDRIs, e.g. `brown_photostudio_02`, `cyclorama_hard_light`: https://api.polyhaven.com/assets?type=hdris&category=studio · https://polyhaven.com/license); (c) keep `MeshRefractionMaterial` for the stone; consider drei's `MeshTransmissionMaterial` only for colored birthstones (it adds chromatic aberration and roughness blur but costs an extra render pass: https://drei.docs.pmnd.rs/shaders/mesh-transmission-material); (d) render the canvas inside a paper-colored frame at 4:5, never full-bleed; (e) under `prefers-reduced-motion`, no auto-rotation and no scrub.

---

## 5. Copy density

### 5a. Measurements (approximate words of body copy, excluding nav and footer unless stated)

| Page | Words | Source |
|---|---|---|
| Patek Philippe home hero | 6-word headline + 1 line + "Discover more" | 05 §1 |
| Audemars Piguet home hero | 4-word headline + 32-word paragraph, no CTA | 05 §1 |
| Cartier home hero | 2 words + 15-word line + CTA | 05 §1 |
| Mikimoto home | 100–150 | https://www.mikimotoamerica.com/ |
| Fernando Jorge home | about 100 | https://fernandojorge.co.uk/ |
| Brent Neale home | 100–150 | https://brentneale.com/ |
| Marla Aaron home | 150–200 | https://marlaaaron.com/ |
| Buccellati home | longest passage about 60 | https://www.buccellati.com/en/ |
| Mejuri home | about 250 body (700 with nav/footer) | https://www.mejuri.com/ |
| Jared home | 700–900 body, plus 1,500+ in mega-menus | https://www.jared.com/ |
| Old american.jewelry home | about 1,100 total, mostly nav and footer; about 140 on the About page | https://american.jewelry · https://american.jewelry/service/about/ |
| **Current site home** | about 800 incl. nav/footer | https://american-jewelry.vercel.app |
| **Current /americana** | about 650 | https://american-jewelry.vercel.app/americana |
| **Current product page** | about 700, nothing folded | https://american-jewelry.vercel.app/pieces/shooting-star-ring |
| **Current /build/ring** | 900–1,000 | https://american-jewelry.vercel.app/build/ring |
| **Current /house** | about 1,000 (800 body) | https://american-jewelry.vercel.app/house |

The current site sits between Mejuri and Jared on words. The target is the Mikimoto / Fernando Jorge band.

### 5b. Word budgets per section (body words visible without opening anything)

**Home (total 110–150).** Hero: headline ≤6 words, one line ≤14, one CTA. Design screen: name + one sentence ≤16. Lines screen: three names, three taglines ≤6 each. Builder screen: one sentence ≤14 + CTA. Bench screen: one sentence ≤14. Stores: two addresses, hours line each. No brand block. No trust line.

**Line page, e.g. /americana (60–90 above the grid).** Eyebrow (3 words) · name · one sentence ≤16 · one honesty line ≤10 ("Natural diamonds, F–G, VS1, GIA, on every piece."). Grid cards: 4 lines each, ≤12 words total. Bridal note at the end: one sentence.

**Design page, e.g. /design/shooting-star (120–180).** Eyebrow · name · tagline ≤8 · the assembly (no words during it) · three feature captions ≤18 each with their own photograph (star, tail, hallmark) · pieces row (cards) · one sentence on bridal.

**Product page (90 above the fold; ≤160 in accordions).** Title · Ref line · one sentence ≤18 · price + tax note (≤8) · version / metal / size / engraving labels · two buttons · spec table (label : value, no prose). Accordions: Stones (≤45), Care and warranty (≤35), Delivery and returns (≤40), A question (≤25). "Complete the set" cards. Behind the design: one sentence + link.

**Builder (≤60 visible).** Name of the setting · price · "Made to order, about 2 weeks. Price before sales tax." · the decision labels (Stone, Carat, Metal, Fit, Engraving) · one disclosure "The jeweler's adjustments" · two buttons. "Where the price comes from" stays as a disclosure with three lines. All explanatory prose ("One quality for each stone", "How the price is made") moves to /natural-or-man-made and the journal.

**Stores (≤80 per store).** Name · address · phone · hours by day · "What happens here" ≤25 words · one photograph · one button.

**House (250–350).** The letter ≤180, signed with first names when supplied. "How a piece is made here" as four captions ≤14 each with photographs. "The mark" ≤60. The legal line once.

**Journal.** Unbudgeted; this is where the words go.

### 5c. The fifteen "least wordy" rules

Rules 1–12 of 05 §5b stand (title grammar, noun-phrase heroes, object as subject, mechanism/place/year, contrast taglines, specs as tables, second person for service, one honesty line, banned words, numbers as adjectives, CTAs name the thing, 8–14-word sentences). These fifteen are the cuts.

1. **Say it once per site.** If a sentence exists on another page, link to it; do not repeat it. The origin line lives in the spec table and the House page only.
2. **One CTA per screen; "Book an appointment" at most twice per page** (utility bar, and one place in the content).
3. **No sentence that explains the page.** "Three settings we drew. Three choices that are yours." describes the builder; the builder should just be there.
4. **No sentence before a photograph that the photograph says.** "Image of gold signet rings in a navy velvet box" needs no caption.
5. **Every paragraph over 30 words becomes an accordion, a table, or a journal entry.**
6. **Captions, not paragraphs, for features.** Eyebrow in caps, one sentence.
7. **Delete the second adjective.** "sharp five-point star" → "five-point star".
8. **Delete "we" unless a person is doing something now.** "We size in store, free, and resize once at no charge." stays. "We are proud to…" never.
9. **Delete the reassurance.** "honest advice on which stones suit daily wear" → "We will tell you which stones wear well."
10. **Delete the preamble.** "A store buys what vendors make and sells it." is a good first line for the letter; it is not a hero.
11. **Spec lines are the description.** "Solid 14k or 18k gold, karat-marked." replaces any paragraph about metal.
12. **Policies are one line on the page and a link.** "Ready-to-ship pieces return within 30 days. Made-to-order pieces exchange." + "Returns".
13. **Prices speak once.** Never "from $1,900" on a card and "$1,900" and "Solid gold ($1,900)" on the same page; the version selector carries the delta, not the base.
14. **Numbers in digits, never in words.** "3 weeks", "20 characters", "2,537".
15. **The footer is a sitemap, two addresses, the legal line.** No brand blurb, no newsletter sentence longer than three words ("The journal, monthly.").

### 5d. Eight real sentences from the current site, rewritten

1. **Before (home hero subhead):** the designs are made in-house in Tennessee by one designer and one workshop.
   **After:** One designer. One bench. Tennessee.

2. **Before (home builder intro):** choosing band, prongs, stone, metal, and fit, with pricing that updates as you choose.
   **After:** Band, claws, stone, metal, fit. The price follows.

3. **Before (/americana):** The signature designs of the house, drawn in Tennessee and worked in solid gold, birthstone and natural diamond.
   **After:** Our designs, in solid gold and natural diamond.

4. **Before (PDP, stones):** Center stones include a GIA report, and any treatments are disclosed before purchase.
   **After:** GIA report with every center stone. Treatments disclosed.

5. **Before (PDP, care):** Describes the Lifetime Care Program (cleaning, prong checks, polishing at either store) and one free resize within 60 days on rings the house made.
   **After:** Cleaning, claw checks and polishing at either store, for life. One resize free within 60 days.

6. **Before (House hero):** A store buys what vendors make and sells it. [The page contrasts this with a house that designs, makes, and stands behind its work.]
   **After (hero):** The House. [eyebrow: Brentwood and Mt. Juliet, Tennessee.] The first sentence moves into the letter, where it belongs.

7. **Before (builder):** Three settings we drew. Three choices that are yours. The rest is decided the way we would decide it, and the ring is made to order at our bench.
   **After:** Three settings. Your stone, your metal, your size. Made to order at our bench.

8. **Before (home, stores):** The bench is behind glass. Paragraph about watching stones being set in Mt. Juliet.
   **After:** The bench is behind glass. Mt. Juliet, Tuesday to Saturday. [hours from the store record]

All eight keep the family's rules: no "handmade", no "Made in America", man-made diamond wording untouched where it appears, no discounts, no counting of the lines, no em dashes.

---

## 6. Type, color, photography and motion system

### 6a. Typeface pairings (three candidates; pick A)

**A. Libre Caslon Display + Libre Caslon Text + Public Sans (ship this).**
- *Libre Caslon Text* (Impallari Type, SIL OFL 1.1, Google Fonts, variable since 2020) is tuned for 16px body; *Libre Caslon Display* is the headline companion. The family draws on mid-century American hand-lettered Caslons rather than the 18th-century specimens, which is exactly the register we want: American printed, not Georgian. https://fonts.google.com/specimen/Libre+Caslon+Text/about · https://fontsource.org/fonts/libre-caslon-text/about
- *Public Sans* (U.S. Web Design System, SIL OFL, adapted from Libre Franklin; digital.gov notes it is no longer maintained, which does not matter for a static webfont) for eyebrows, specs, prices, controls. An American gothic from an American government design system, with no tech-startup associations. https://digital.gov/resources/an-introduction-to-typography
- Roles: Display for names and headlines (56–120px, tracking −1%); Text for the letter, journal, PDP sentence (17–19px, line-height 1.5); Public Sans for everything in caps (11–12px, tracking +8%), numbers, buttons, tables.
- Why not the current EB Garamond + Jost: Garamond is Paris; Jost is Futura, which is Bauhaus. Neither says Tennessee. (Current tokens from `site/src/app/globals.css` and HANDOFF.)

**B. Fraunces (display) + Libre Caslon Text + Public Sans (if the family wants warmer).**
- *Fraunces* (Undercase Type, SIL OFL 1.1) is a soft old-style serif after Windsor, Souvenir and the Cooper Series, the early-twentieth-century American advertising faces; variable axes opsz 9–144, wght 100–900, SOFT 0–100, WONK on/off. Set at opsz 144, SOFT 30, WONK 0, wght 400 it is a quiet, warm American display face; at WONK 1 it is a bakery. https://github.com/undercasetype/Fraunces
- Risk: it is friendlier than a jewelry house usually is; test it on the Royal American page before committing.

**C. Adobe Caslon Pro / Big Caslon + Neue Haas Grotesk (paid, if budget exists).**
- *Adobe Caslon Pro* (Carol Twombly, Adobe Originals, from Caslon's 1734–1770 specimens; the whole Adobe Fonts library is "cleared for both personal and commercial use", web use through a Web Project; self-hosting is a separate purchase) and *Big Caslon* (Font Bureau on Adobe Fonts, three weights as webfonts; the Carter & Cone version on Fontspring is $35 per style, $190 for six). https://fonts.adobe.com/fonts/adobe-caslon · https://fonts.adobe.com/fonts/big-caslon-fb · https://www.fontspring.com/fonts/carter-and-cone/big-caslon-cc/big-caslon-cc-black
- *Williams Caslon Text* (William Berkson, Font Bureau, 2010, two weights with italics) is the text-size Caslon of record; the price was not visible in the fetched pages, so get a quote from Type Network. https://www.typewolf.com/williams-caslon-text
- Verdict: A is 90% of C at zero cost and no CDN dependency; C is the upgrade if the family wants the Caslon of the printed Declaration (that association is widely repeated but was not verified in this pass).

*Instrument Serif* (Rodrigo Fuenzalida for Instrument, SIL OFL, narrow display old-style) was considered for Display and rejected: it is the default "tasteful startup" serif of 2024–2026 and would read as vibe-coded. https://github.com/Instrument/instrument-serif

### 6b. Palette (exact values)

| Token | Hex | Use |
|---|---|---|
| `--paper` | #F5F2EC | page background (warmer than the current #F6F5F2) |
| `--bone` | #ECE7DD | second tint for the velvet-box frames and the registry table rows |
| `--white` | #FFFFFF | product photography ground only |
| `--ink` | #121212 | all type |
| `--ink-2` | #3F3F3F | secondary type |
| `--muted` | #63676E | tertiary type (kept; 4.9:1 on paper, passes AA) |
| `--hair` | #DDD8CF | 1px rules and control borders |
| `--navy` | #16213A | velvet: the bag drawer, Royal American page ground, the box |
| `--gold` | #B08D57 | hairlines, registry numerals, the hallmark caption at ≥24px only (2.7:1 on paper, fails for text; never body copy, never a background) |
| `--stone` | #E9E7E2 | the 3D canvas frame and gallery ground (a pale grey the ring sits on) |

Rules: white backgrounds only behind photographs; paper everywhere else; navy only for Royal American and the bag; gold never fills an area; no other hue anywhere on the site. The 3D materials (yellow/white/rose gold, platinum) are the only color that varies.

### 6c. Photography brief

- **Object on seamless.** Every piece: four fixed views (front, three-quarter, profile, inside-shank hallmark) on #FFFFFF seamless graded to #E9E7E2 at the bottom, 50mm macro, f/11, daylight-balanced strobes, no reflections of the room. One detail per feature named on the design page (the star, the tail, the claws). 4:5 crop for cards, 1:1 for the gallery.
- **The hand frame.** One per piece, in Tennessee daylight, the hand of a family member or staff, no manicure, no props: porch rail, kitchen table, church step, the Mt. Juliet lot's tailgate. Never a yacht, a vineyard, a field of wheat, a flag.
- **Bench hands.** A standing set at the Mt. Juliet bench: the brother's hands with graver, loupe, tweezers, the stone going into the head. Ten stills and one 12-second loop. No face required; if a face appears it is a family member, named.
- **The two stores.** One exterior at golden hour each, one interior with the bench behind glass, one of the counter with whoever is at it that day.
- **The velvet box.** The navy box on paper, open, for Royal American.
- **Never:** stock, AI, renders presented as photographs (the 3D view is always labeled "3D"), models who are not the family, text over the product.

### 6d. Motion grammar

- **Reveal.** Every block enters once with opacity 0→1 and translateY 12px→0 over 600ms, `cubic-bezier(0.2, 0, 0, 1)`, staggered 60ms within a block. CSS only, `animation-timeline: view()` where supported, IntersectionObserver fallback. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- **Image settle.** Photographs enter at scale 1.02 and settle to 1 over 900ms, same easing. Never on hover.
- **The ring.** The only thing that moves more than 12px. Scroll-scrubbed assembly on design pages and the builder top (GSAP ScrollTrigger `scrub: 1`, pinned one viewport, labels + `snap: "labels"`). Pointer light and engraving read in the 3D view. Lenis drives the page scroll (MIT, 1.3.x, `lenis/react`) and feeds `ScrollTrigger.update`, `gsap.ticker.add(lenis.raf)`, `gsap.ticker.lagSmoothing(0)`. https://gsap.com/docs/v3/Plugins/ScrollTrigger/ · https://github.com/darkroomengineering/lenis
- **Page transitions.** A 300ms crossfade with the wordmark persisting (View Transitions API; Hydrogen's React Router navigation can opt in). No wipes, no curtains, no preloader counters.
- **Controls.** State changes by color and 1px border only. Nothing scales, lifts, or shifts on hover or press (HANDOFF rule 8). Buttons have fixed heights.
- **Never moves:** the navigation, the price, any text being read, product cards, the footer, the bag drawer's contents once open. No parallax on photographs. No marquee. No autoplay carousel. No cursor replacement.
- **Reduced motion:** everything above becomes opacity-only or static; the ring shows its poster frame; the assembly is a single still of the finished ring.

---

## 7. Open-source assets and tools that raise the bar

- **GSAP, all plugins, free for commercial use** since Webflow's 2025 announcement (SplitText, MorphSVG, ScrollTrigger included; the only prohibition is building a competing no-code animation tool). https://webflow.com/blog/gsap-becomes-free · https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Lenis** smooth scroll, MIT, 1.3.26, `lenis/react`, documented ScrollTrigger sync. https://github.com/darkroomengineering/lenis
- **react-three-fiber + drei.** `MeshRefractionMaterial` (envMap, bounces, ior 2.4, aberrationStrength, fastChroma; needs a BVH index) for diamonds; `MeshTransmissionMaterial` for colored stones; `Environment` with `files` for a self-hosted HDRI (gainmap `.jpg`/`.webp` is the smallest; the CDN presets are "not meant for production"); `Lightformer` (`form: rect | circle | ring`, `intensity`, `color`, `scale`, `target`) for the softbox rig; `@pmndrs/assets` for self-hosted HDRIs via dynamic import. https://drei.docs.pmnd.rs/shaders/mesh-refraction-material · https://drei.docs.pmnd.rs/shaders/mesh-transmission-material · https://drei.docs.pmnd.rs/staging/environment · https://drei.docs.pmnd.rs/staging/lightformer
- **Poly Haven HDRIs**, CC0, 97 in the studio category (`brown_photostudio_01…07`, `cyclorama_hard_light`, `ferndale_studio_01…07`, `blocky_photo_studio`); download 1k for the web and convert to gainmap. https://api.polyhaven.com/assets?type=hdris&category=studio · https://polyhaven.com/license
- **Typefaces (all SIL OFL):** Libre Caslon Text + Display (Google Fonts / Fontsource), Public Sans (GitHub, uswds), Fraunces (GitHub). Self-host as woff2 via Fontsource; subset to Latin. https://fontsource.org/fonts/libre-caslon-text/about · https://github.com/undercasetype/Fraunces · https://digital.gov/resources/an-introduction-to-typography
- **Hydrogen / hydrogen-react components worth using:** `Image` (Storefront image with srcset), `Video` and `ExternalVideo` (the bench loop from Shopify Files), `MediaFile`, `ModelViewer` (Shopify Model3d via the model-viewer element, for photographed pieces scanned later), `Money` and `ProductPrice` (locale-correct prices, no hand formatting), `RichText` (journal metafields), `CartProvider` / `CartCost` / `CartLineQuantity` (the bag drawer), `AddToCartButton`, `ShopPayButton`, `ShopifyProvider`. https://shopify.dev/docs/api/hydrogen-react/latest/components
- **CSS scroll-driven animations** (`animation-timeline: scroll() | view()`) for every reveal that does not involve the ring, so GSAP is loaded only on pages with the canvas. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- **Procedural textures.** The velvet of the bag drawer and the Royal American ground is a flat navy with a 2% noise overlay (a 128px tiled PNG, not a shader); paper is flat. No velvet shader in the 3D scene; the ring sits on `ContactShadows` over the paper-grey frame. (Engineering note, not sourced.)
- **Page-transition pattern.** View Transitions API crossfade; the wordmark gets `view-transition-name: mark` so it stays put between pages. (Engineering note.)
- **Not recommended:** Awwwards-style custom cursors, preloaders, horizontal scroll sections, WebGL distortion on images, text splitting that animates every letter. Each was present on at least one site in the Awwwards jewelry list and each is a 2021 tell.

---

## Page-by-page blueprint

Order is top to bottom. Word counts are body copy visible without opening anything. "Screen" means roughly one viewport with 20vh of paper above and below.

### Home (110–150 words, six screens)
1. **Wordmark line.** Centered mark; eight text items; utility: Appointment · Saved · Bag. Nothing above it.
2. **Hero (photograph).** One piece on the navy box, bleeding right, 8/4 split. Eyebrow in caps: BRENTWOOD AND MT. JULIET, TENNESSEE. Headline ≤6 words ("An American house of fine jewelry." stays). One line ≤14. One CTA: "The designs". 20 words.
3. **The design of the season.** Full-bleed macro of one design (the star). Name set large. One sentence ≤16. "The design". 22 words.
4. **The three lines.** Three names stacked as type, each with its tagline, no cards, no numbers, no images: Royal American / "One of one. Never made again." · Americana / "Natural diamonds. Our own designs." · New American / "Man-made diamonds. The same hands." Hover shows one photograph at right. 21 words.
5. **Build a ring.** The finished parametric ring as a still (poster of the assembly), one sentence ≤14, "Build on Signal". 16 words.
6. **The bench.** The 12-second bench loop (Hydrogen `Video`, muted, no controls), one sentence, "The House". 12 words.
7. **The stores.** Two columns: name, street, hours line, phone. No cards, no map. "Brentwood" / "Mt. Juliet". 30 words.
8. **Footer.** Sitemap in small Caslon, the two addresses, the legal line, "The journal, monthly." field.
Removed from today's home: the three product cards, the three builder tiles, the eight-card grid, the natural-vs-man-made block, the trust line, the brand block.

### Line page (/americana, /new-american, /royal-american) (60–90 words above the grid)
1. Eyebrow (the stone standard, one line: "Natural diamonds, F–G, VS1, GIA." / "Man-made diamonds (laboratory-grown), D–F, VVS, IGI." / "One of one. Price on request.").
2. Name set large. One sentence ≤16.
3. One photograph, full-bleed, the hand frame.
4. The design list as names with counts ("Shooting Star (6) · Prism (4) · Signal (3)"), hover previews.
5. The grid, asymmetric: rows of 2 + 1 (one card double width) alternating; four lines per card (name, line · metal · stone, price, nothing else); no second image, no badge.
6. One bridal sentence and "Build a ring".
Royal American differs: navy ground, no grid; the registry table (No. · piece · stone report · year · state) with "Acquired" rows kept; each row opens the piece page; "Request a private viewing" once.

### Design page (/design/shooting-star) (120–180 words)
1. Eyebrow (the idea, 3 words) · name · tagline ≤8.
2. **The stone is set** (the signature). One viewport, scrubbed. No words on it. Poster for reduced motion.
3. Three feature screens, alternating sides: the star (photograph + caption ≤18), the tail (photograph + caption), the hallmark (the inside-shank frame + caption with the gold numeral).
4. The pieces in this design, as the line-page grid (2 + 1).
5. One sentence: "Every Shooting Star setting takes a natural or a man-made stone; the name on the box follows the stone." + "Build on Shooting Star".
6. Complete-the-set is not needed here; it lives on the product page.

### Product page (90 words above the fold, ≤160 folded)
1. Gallery left (7 columns): four views + hand frame + hallmark frame; "Photo | 3D" toggle; the 3D view has pointer light.
2. Buy column right (5 columns, sticky): name · "Ref. AM 004 · Americana" · one sentence ≤18 · price · "Solid 14k or 18k gold, karat-marked." · "Made to order, about 3 weeks. Price before Tennessee sales tax." · Version (three labelled image tiles) · Metal (swatches) · Size (dropdown + "Sizing help") · Engraving (field, "20 characters, included") · "Add to bag" · "See it in store" · Save.
3. Spec table (label : value): Band · Star · Hallmark · Stone · Report · Made (the origin line, once).
4. Accordions: The stones · Care and warranty · Delivery and returns · A question about this piece.
5. "Complete the set": four cards, 2 + 2, four lines each.
6. "Behind the design": one sentence and "The Shooting Star design".
Removed: the page-top brand intro, the summary blurb, the repeated origin sentence under the buttons, the second "book an hour" CTA.

### Builder (/build and /build/ring) (≤60 words visible)
1. **The stone is set** as the page top (the same scrubbed assembly), then the three settings as three names with the poster of each; "Build on Signal". No cards, no bullet lists.
2. The configurator: 4:5 canvas on the stone-grey frame, left (7 columns); decisions right (5 columns): name + price once; "Made to order, about 2 weeks. Price before sales tax."; Stone (two labelled tiles: Natural · Man-made) · Carat · Metal · Fit · Engraving (typed live; camera turns to read it); one disclosure "The jeweler's adjustments" (profile, width, claws, taper, hidden halo); one disclosure "Where the price comes from" (metal / bench / stone, three lines); "Add to bag" · "See it in store first" · Save · Copy link; the design code line.
3. The origin and stone disclosure as two lines under the table, not a paragraph.
Removed: "One quality for each stone" and "How the price is made" sections (one line each in the disclosures; full text in /natural-or-man-made and the journal), "Send a hint", "Certificate" (becomes the folded report).

### Stores (/stores, /stores/brentwood, /stores/mt-juliet) (≤80 words per store)
1. Exterior photograph, full-bleed.
2. Name · street · phone · hours by day (a table) · "What happens here" ≤25 words (Brentwood: Royal American and bridal, by appointment. Mt. Juliet: the bench behind glass, casting, setting, repair, lifetime care).
3. One interior photograph (the bench / the counter with the person at it, named).
4. "Book Brentwood" / "Book Mt. Juliet" once. The Google review count may live here, in one line, and nowhere else.

### House (250–350 words)
1. Eyebrow · "The House" · one photograph (the loose stones on the bench).
2. The letter, ≤180 words, in Libre Caslon Text at 19px, signed with first names (when supplied) and the two towns.
3. "How a piece is made here" as four photographs with captions ≤14 (Drawn, Modeled, Cast, Set and finished). No numbers on them.
4. "The mark": the hallmark frame, ≤60 words, the three marks named (crown, star, line) without counting them.
5. The brother's one sentence, set large (Jade Trau's device), only if he supplies it.
6. "Come and see the bench." One sentence, two store links.
Removed: the three-card "What we make" grid (it is the home page's lines screen), the compliance paragraph (it moves to /natural-or-man-made and the policies).

### Journal (/journal)
1. A list: date · title · one line. No cards, no thumbnails above the fold; one photograph per entry inside.
2. Entries are where the long copy goes: how a ring is made at the bench, how to read an IGI report, ring size honestly (all three exist).
3. Entry template: eyebrow (date) · title · one photograph · text in Caslon Text at 62 characters per line · "The design" or "Build a ring" at the end.

### Utility pages (appointments, natural-or-man-made, policies, saved, bag)
- Appointments: one form, four steps (store · purpose · date/time · contact), same-day allowed, on paper, centered, ≤40 words of guidance.
- Natural or man-made: the only page where both stones are explained; two columns, the two standards as tables, ≤200 words, the family's wording rules in force.
- Bag drawer: navy ground, Caslon, "Your bag is empty." · "Checkout" · "See it in store first" · the tax line. Nothing else.

---

## Source list

**Current and old site**
- https://american-jewelry.vercel.app · https://american-jewelry.vercel.app/americana · https://american-jewelry.vercel.app/pieces/shooting-star-ring · https://american-jewelry.vercel.app/build/ring · https://american-jewelry.vercel.app/house
- https://american.jewelry · https://american.jewelry/service/custom-design/ · https://american.jewelry/service/about/
- Local: `D:\american-jewelry\HANDOFF.md` (rules), `site/src/components/three/ParametricRing.tsx`, `site/src/components/builder/RingBuilder.tsx`, `site/src/app/globals.css`; research 01 §3–4, 05 §5, 06.

**Template tells**
- https://www.jared.com/ · https://www.catbirdnyc.com/ · https://www.mejuri.com/ · https://spinellikilcollin.com/collections/all

**Houses and designers (fetched)**
- https://www.repossi.com/ · https://www.messika.com/en/ · https://www.chaumet.com/ · https://www.buccellati.com/en/ · https://www.mikimotoamerica.com/ · https://www.dinhvan.com/en/ · https://fernandojorge.co.uk/ · https://www.jessicamccormack.com/ · https://sophiebillebrahe.com/ · https://foundrae.com/ · https://marlaaaron.com/ · https://www.sidneygarber.com/ · https://jadetrau.com/pages/about · https://ireneneuwirth.com/ · https://brentneale.com/ · https://retrouvai.com/ · https://www.pomellato.com/en-us/ (nav only)
- Not fetchable this pass: https://www.tasaki-global.com/ (503) · https://www.tasaki.co.jp/en/ (404) · https://spinellikilcollin.com/ (truncated) · https://www.hodinkee.com/shop (refused) · https://floema.jewelry/ (DNS) · https://edengardenjewelry.com/ (403) · https://www.chaumet.com/us/en/ (404)

**Awards**
- https://www.awwwards.com/websites/jewelry/ · https://ore.co/ · https://www.jurijewelry.com/ · https://nidatabba.com/ · https://www.14islands.com/work/cartier365 · https://www.awwwards.com/inspiration/thumbnail-floema-jewelry · https://www.awwwards.com/inspiration/john-hardy-product-page-john-hardy

**Americana brands**
- https://www.shinola.com/ · https://www.filson.com/ · https://www.tecovas.com/ · https://www.buckmason.com/ · https://www.redwingshoes.com/heritage/ · https://www.stetson.com/ · https://www.schottnyc.com/

**Signature-feature references**
- https://www.apple.com/airpods-pro/ · https://contra.com/p/cQAMEkLc-marvelous-stone-immersive-luxury · https://docs.ijewel3d.com/wedding-band-builder/why.html · https://discourse.threejs.org/t/how-to-engrave-words-name-into-a-ring-in-three-js/19163.md · https://ecomm.design/site/van-cleef-arpels · https://pickyourapp.com/de/products/spotmetal-pricing-buyback

**Tools, libraries, assets**
- https://webflow.com/blog/gsap-becomes-free · https://gsap.com/docs/v3/Plugins/ScrollTrigger/ · https://github.com/darkroomengineering/lenis
- https://drei.docs.pmnd.rs/shaders/mesh-refraction-material · https://drei.docs.pmnd.rs/shaders/mesh-transmission-material · https://drei.docs.pmnd.rs/staging/environment · https://drei.docs.pmnd.rs/staging/lightformer
- https://api.polyhaven.com/assets?type=hdris&category=studio · https://polyhaven.com/license
- https://shopify.dev/docs/api/hydrogen-react/latest/components
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations

**Type**
- https://fonts.google.com/specimen/Libre+Caslon+Text/about · https://fontsource.org/fonts/libre-caslon-text/about · https://digital.gov/resources/an-introduction-to-typography · https://github.com/undercasetype/Fraunces · https://github.com/Instrument/instrument-serif · https://fonts.adobe.com/fonts/adobe-caslon · https://fonts.adobe.com/fonts/big-caslon-fb · https://www.fontspring.com/fonts/carter-and-cone/big-caslon-cc/big-caslon-cc-black · https://www.typewolf.com/williams-caslon-text
