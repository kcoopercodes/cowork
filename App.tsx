import React, { FormEvent, useEffect, useMemo, useState } from "react";
import "./App.css";

type MenuItem = {
  name: string;
  category: string;
  description?: string;
  price: string;
};

type Space = {
  id: number;
  name: string;
  neighborhood: string;
  type: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  priceValue: number;
  open?: boolean;
  free: boolean;
  tags: string[];
  address: string;
  zipCode?: string;
  hours: string;
  description: string;
  bestFor: string[];
  map: { x: number; y: number };
  menu?: MenuItem[];
  menuUrl?: string;
  websiteUrl?: string;
};

const spaces: Space[] = [
  { id: 1, name: "Artifact Coffee", neighborhood: "Woodberry", type: "Neighborhood café", image: "photo-1445116572660-236099ec97a0", rating: 4.8, reviews: 126, price: "Purchase something", priceValue: 0, open: true, free: false, tags: ["Fast Wi-Fi", "Coffee", "Outlets", "Bright"], address: "1500 Union Ave, Baltimore, MD", zipCode: "21211", hours: "Today · 7:30 AM – 4 PM", description: "A light-filled neighborhood café for a focused morning, a good cup, and a change of scenery.", bestFor: ["Coffee breaks", "Solo work", "Creative energy"], map: { x: 45, y: 35 }, menuUrl: "https://toast.app/r/artifactcoffee/order/r-d194d71e-ac14-4710-859a-696945e98f63", menu: [
    { category: "Coffee & tea", name: "Chai Latte", description: "House-made chai concentrate and steamed milk.", price: "$6.50" },
    { category: "Coffee & tea", name: "Matcha Latte", description: "Ceremonial-grade matcha and steamed milk.", price: "$6.50" },
    { category: "Coffee & tea", name: "Earl Grey Latte", price: "$6.50" },
    { category: "Coffee & tea", name: "Thread Cold Brew", price: "$6.00" },
    { category: "Coffee & tea", name: "Hot Chocolate", price: "$4.50" },
  ] },
  { id: 2, name: "Open Works", neighborhood: "Station North", type: "Coworking & makerspace", image: "photo-1497366811353-6870744d04b2", rating: 4.9, reviews: 84, price: "$25 day pass", priceValue: 25, open: true, free: false, tags: ["Fast Wi-Fi", "Meeting rooms", "Phone booths", "Community"], address: "1400 Greenmount Ave, Baltimore, MD", zipCode: "21202", hours: "Today · 9 AM – 6 PM", description: "A creative home base with room to focus, meet, and make things alongside Baltimore builders.", bestFor: ["Deep work", "Meetings", "Meeting people"], map: { x: 55, y: 26 } },
  { id: 3, name: "Red Emma’s Bookstore Coffeehouse", neighborhood: "Waverly", type: "Bookshop café", image: "photo-1554118811-1e0d58224f24", rating: 4.7, reviews: 213, price: "Free with purchase", priceValue: 0, open: true, free: true, tags: ["Coffee", "Quiet corners", "Vegetarian food", "Wi-Fi"], address: "3128 Greenmount Ave, Baltimore, MD", zipCode: "21218", hours: "Today · 9 AM – 9 PM", description: "Settle in with a book, a meal, or a laptop at this welcoming community bookstore and café.", bestFor: ["Reading", "Long sessions", "Affordable work"], map: { x: 63, y: 20 }, menuUrl: "https://toast.app/r/red-emma-s/order", menu: [
    { category: "Coffee & tea", name: "Drip Coffee", description: "Berkman’s blend roasted for Red Emma’s by Thread.", price: "$1.00+" },
    { category: "Coffee & tea", name: "Cold Brew", description: "Thread coffee steeped overnight.", price: "$4.00+" },
    { category: "Coffee & tea", name: "Latte", description: "Espresso and milk.", price: "$4.50+" },
    { category: "Coffee & tea", name: "Iced Latte", description: "Espresso and milk served over ice.", price: "$5.50+" },
    { category: "Coffee & tea", name: "Iced Matcha Latte", price: "$6.00+" },
    { category: "Bakery", name: "Blueberry Muffin", price: "$4.00" },
    { category: "Bakery", name: "Brownie (GF)", price: "$4.00" },
    { category: "Food", name: "Grilled Cheez", description: "Vegan and soy-free; gluten-free bread available.", price: "$5.00" },
  ] },
  { id: 4, name: "The Bun Shop", neighborhood: "Mount Vernon", type: "Café", image: "photo-1495474472287-4d71bcdd2085", rating: 4.6, reviews: 98, price: "Free with purchase", priceValue: 0, open: true, free: true, tags: ["Late hours", "Coffee", "Wi-Fi", "Casual"], address: "239 W Read St, Baltimore, MD", zipCode: "21201", hours: "Today · 8 AM – 10 PM", description: "A casual Mount Vernon café with late hours when you need a comfortable place to keep going.", bestFor: ["Late nights", "Casual work", "Coffee breaks"], map: { x: 43, y: 48 } },
  { id: 5, name: "Impact Hub Baltimore", neighborhood: "Downtown", type: "Coworking space", image: "photo-1497366216548-37526070297c", rating: 4.7, reviews: 61, price: "Day pass", priceValue: 20, open: true, free: false, tags: ["Meeting rooms", "Fast Wi-Fi", "Community", "Coffee"], address: "10 E North Ave, Baltimore, MD", zipCode: "21202", hours: "Check official site", description: "A coworking community in Baltimore. Day passes are available.", bestFor: ["Networking", "Meetings", "Team days"], map: { x: 37, y: 59 }, websiteUrl: "https://baltimore.impacthub.net/" },
  { id: 6, name: "Good Neighbor", neighborhood: "Hampden", type: "Coffee shop", image: "photo-1501339847302-ac426a4a7cbb", rating: 4.6, reviews: 73, price: "Free with purchase", priceValue: 0, open: false, free: true, tags: ["Coffee", "Patio", "Neighborhood favorite", "Wi-Fi"], address: "3827 Falls Rd, Baltimore, MD", zipCode: "21211", hours: "Opens tomorrow · 8 AM", description: "A relaxed neighborhood stop with a sunny patio and plenty of local character.", bestFor: ["Outdoor seating", "Coffee breaks", "Casual work"], map: { x: 27, y: 28 } },
  { id: 7, name: "à demain Cafe", neighborhood: "Hampden", type: "Coffee shop & café", image: "photo-1495474472287-4d71bcdd2085", rating: 0, reviews: 0, price: "Menu prices vary", priceValue: 0, free: true, tags: ["Coffee", "Specialty lattes", "Croffles"], address: "830 W 36th St, Baltimore, MD", zipCode: "21211", hours: "Tue–Sat · 8 AM–3 PM", description: "A Hampden coffee shop with espresso drinks, specialty lattes, and croffles. The current online menu lists a cookie butter latte served iced.", bestFor: ["Specialty coffee", "Breakfast", "Croffles"], map: { x: 32, y: 31 }, menuUrl: "https://toast.app/r/a-demain-cafe-830-w-36th-st/order?diningOption=delivery", menu: [
    { category: "Coffee", name: "House Drip Coffee · 12 oz", price: "$3.00" },
    { category: "Coffee", name: "Iced Latte", price: "$5.00" },
    { category: "Specialty drinks", name: "Cookie Butter Latte", description: "Iced only · espresso, house-made cookie butter syrup, milk, and cookie butter cream.", price: "$6.00" },
    { category: "Specialty drinks", name: "Strawberry Matcha", price: "$6.00" },
    { category: "Specialty drinks", name: "Pumpkin Spice Latte", price: "$5.50" },
    { category: "Pastries", name: "Classic Croffle", price: "$5.00" },
    { category: "Pastries", name: "Biscoff Cookie Croffle", price: "$6.50" },
  ] },
  ,{ id: 8, name: "Civic Lounge at 4MLK", neighborhood: "Downtown", type: "Free drop-in · Bun Shop café inside", image: "", rating: 0, reviews: 0, price: "Free", priceValue: 0, free: true, tags: ["Free", "Coffee", "Work lounge"], address: "4 N. Martin Luther King Jr. Blvd., Baltimore, MD", zipCode: "21201", hours: "Mon–Fri · 8 AM–7 PM", description: "Free drop-in workspace. The Bun Shop coffee bar is inside the lounge.", bestFor: ["Drop-in work", "Coffee"], map: { x: 45, y: 54 }, websiteUrl: "https://www.4mlk.com/civiclounge" },
];

const venuePhotos: Record<number, { src: string; alt: string }> = {
  1: { src: "https://www.darlenenugent.com/projects/Union-Mill-Artifact-Coffee/images/artifact-5.jpg", alt: "Inside Artifact Coffee at Union Mill" },
  2: { src: "https://images.squarespace-cdn.com/content/v1/598c7914bf629a6017f34c96/1507564147464-T8GSFWK0ZZFWZNH01I71/Open%2BWorks%2BAfter-6.jpg", alt: "Open Works makerspace interior" },
  3: { src: "https://www.thebanner.com/resizer/v2/3PXM5C46J5DLPBD3OVIOLQNKVY.JPG?auth=3542e0f7ae6f45f5e08a84d311d180d6be512e293b3602d2c16d8d32afd024f7&quality=85&smart=true&width=768", alt: "Red Emma’s current Waverly café and bookstore" },
  4: { src: "https://s3-media0.fl.yelpcdn.com/bphoto/_z6SDV4XFaAld_FpZR4r3A/l.jpg", alt: "The Bun Shop café interior on West Read Street" },
  5: { src: "https://baltimore.impacthub.net/wp-content/uploads/2017/11/Open-Space-East.jpg", alt: "Open lounge at Impact Hub Baltimore" },
  6: { src: "https://smp-architects.com/wp-content/uploads/2021/07/goodneighbor6.jpg", alt: "Good Neighbor café in Hampden" },
  7: { src: "https://pub-ba1a74be17d7442a9f2541946eb9510e.r2.dev/shops/fe44807a-aac6-42de-ad69-652a30dea5f9/0.jpg", alt: "Outdoor seating at à demain Cafe" },
  8: { src: "https://images.squarespace-cdn.com/content/v1/65d7589230abc31b91ba59c0/599836cd-673c-4b76-8efe-683c728ec022/N23874_00_N145%2Bcropped.jpg", alt: "Civic Lounge at 4MLK" },
};

const filters = ["All", "No day pass", "Coffee", "Quiet", "Coworking", "Wi-Fi"];
const neighborhoods = ["All neighborhoods", "Canton", "Downtown", "Fells Point", "Federal Hill", "Hampden", "Mount Vernon", "Remington", "Station North", "Waverly", "Woodberry"];
const searchStopWords = new Set("a an and are around at best can find for have i in is it looking me near need of now open place please sells show some somewhere that the to want with work workspace spaces zip zipcode code postal".split(" "));
const normalizeSearchText = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const searchTerms = (value: string) => normalizeSearchText(value).split(/\s+/).filter((term) => term && !searchStopWords.has(term));
const matchingMenuItem = (space: Space, terms: string[]) => {
  if (!terms.length) return undefined;
  const menu = space.menu || [];
  const menuTokens = new Set(menu.flatMap((item) => searchTerms(`${item.name} ${item.description || ""}`)));
  const menuQueryTerms = terms.filter((term) => menuTokens.has(term));
  return menu.find((item) => menuQueryTerms.length > 0 && menuQueryTerms.every((term) => searchTerms(`${item.name} ${item.description || ""}`).includes(term)));
};
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const base = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    heart: <path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    wifi: <><path d="M5 9a11 11 0 0 1 14 0"/><path d="M8 12a6.5 6.5 0 0 1 8 0"/><path d="M11 15a2 2 0 0 1 2 0"/><path d="m12 19 .01 0"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    coffee: <><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z"/><path d="M17 11h1a3 3 0 1 1 0 6h-2M7 3v3m5-3v3"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  };
  return <svg {...base}>{paths[name] || paths.arrow}</svg>;
}

function App() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [neighborhood, setNeighborhood] = useState("All neighborhoods");
  const [sortBy, setSortBy] = useState("Sort");
  const [selected, setSelected] = useState<Space | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector<HTMLInputElement>(".header-search input")?.focus();
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    const dialog = document.querySelector<HTMLElement>("[role='dialog']");
    if (!dialog) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const initialFocus = dialog.querySelector<HTMLElement>("[data-dialog-initial]");
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (initialFocus || dialog).focus();

    const onDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selected) setSelected(null);
        else if (submitOpen) setSubmitOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", onDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [selected, submitOpen]);

  const visibleSpaces = useMemo(() => {
    const term = query.trim().toLowerCase();
    const terms = searchTerms(query);
    const matching = spaces.filter((space) => {
      const searchIndex = normalizeSearchText([space.name, space.neighborhood, space.type, space.address, space.zipCode || "", ...space.tags, space.description, ...space.bestFor, ...(space.menu || []).flatMap((item) => [item.name, item.category, item.description || ""])].join(" ")).split(" ");
      const matchesTerm = !term || terms.every((token) => searchIndex.includes(token));
      const matchesNeighborhood = neighborhood === "All neighborhoods" || space.neighborhood === neighborhood;
      const matchesFilter = activeFilter === "All"
        || activeFilter === "No day pass" && space.free
        || activeFilter === "Coffee" && /café|coffee|bookshop/i.test(space.type)
        || activeFilter === "Quiet" && space.tags.some((tag) => /quiet/i.test(tag))
        || activeFilter === "Coworking" && /coworking/i.test(space.type)
        || activeFilter === "Wi-Fi" && space.tags.some((tag) => /wi-fi/i.test(tag));
      return matchesTerm && matchesNeighborhood && matchesFilter;
    });
    if (sortBy === "Lowest price") return matching.sort((a, b) => a.priceValue - b.priceValue);
    if (terms.length) return matching.sort((a, b) => {
      const menuScore = (space: Space) => matchingMenuItem(space, terms) && (space.menu || []).length ? 1 : 0;
      return menuScore(b) - menuScore(a);
    });
    return matching;
  }, [activeFilter, neighborhood, query, sortBy]);

  const goToResults = () => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  const submitSpace = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#workspace-list">Skip to workspace results</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Charm City Cowork home"><span className="brand-mark">cc</span><span className="brand-name">Charm City<br/><b>Cowork</b></span></a>
        <form className="header-search" onSubmit={(event) => { event.preventDefault(); goToResults(); }}>
          <Icon name="search" size={20}/>
          <input aria-label="Search by ZIP code, neighborhood, place, or menu item" aria-describedby="search-hint" aria-keyshortcuts="Control+K Meta+K" placeholder="ZIP, area, or menu" value={query} onChange={(event) => setQuery(event.target.value)}/>
          <span id="search-hint" className="visually-hidden">Try 21211, Hampden, or cookie butter latte.</span>
          <kbd>Ctrl / ⌘ K</kbd>
        </form>
        <nav className="header-actions" aria-label="Main navigation">
          <button className="suggest-button" onClick={() => { setSubmitOpen(true); setSubmitted(false); }}>Suggest a place</button>
        </nav>
      </header>

      <main id="top" className="directory-main">
        <div className="directory-intro"><div><p className="eyebrow">Baltimore</p><h1>Find a place to work.</h1></div></div>
        <section className="directory-tools" id="results" aria-label="Workspace search and filters">
          <div className="filter-bar" role="group" aria-label="Workspace filters">{filters.map((filter) => <button key={filter} type="button" aria-pressed={activeFilter === filter} className={`filter-chip ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="result-controls"><span className="result-count" aria-live="polite" aria-atomic="true"><b>{visibleSpaces.length}</b> places</span><div className="result-control-group"><label><Icon name="pin" size={15}/><span className="visually-hidden">Neighborhood</span><select aria-label="Filter by neighborhood" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)}>{neighborhoods.map((item) => <option key={item}>{item}</option>)}</select></label><label className="sort-control"><select aria-label="Sort spaces by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="Sort">Sort</option><option value="Lowest price">Lowest price</option></select></label></div></div>
        </section>

        <section className="workspace-layout" id="workspace-list" aria-labelledby="results-heading">
          <h2 className="visually-hidden" id="results-heading">Workspace results</h2>
          <div className="listing-column">
            <div className="listing-heading"><span>PLACES</span><span>PRICE</span></div>
            {visibleSpaces.map((space) => {
              const menuItem = matchingMenuItem(space, searchTerms(query));
              const photo = venuePhotos[space.id];
              const isMenuMatch = menuItem && searchTerms(query).some((term) => searchTerms(`${menuItem.name} ${menuItem.description || ""}`).includes(term));
              return <article className="space-row" key={space.id}>
                <button type="button" className="space-photo" onClick={() => setSelected(space)} aria-label={`View details for ${space.name}`}><img src={photo.src} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}/></button>
                <div className="space-row-info">
                  <div className="space-row-top"><span className="space-type">{space.type}</span></div>
                  <button type="button" className="space-row-title" onClick={() => setSelected(space)}>{space.name}</button>
                  <p className="space-address">{space.neighborhood} <span aria-hidden="true">·</span> {space.address}{space.zipCode && <><span aria-hidden="true"> · </span>ZIP {space.zipCode}</>}</p>
                  {menuItem && space.menuUrl && <div className="menu-preview"><span className="menu-preview-label">{isMenuMatch ? "MENU MATCH" : menuItem.category.toUpperCase()}</span><p><b>{menuItem.name}</b><span>{menuItem.price}{menuItem.description?.includes("Iced only") ? " · Iced only" : ""}</span></p><a href={space.menuUrl} target="_blank" rel="noreferrer">Full menu <Icon name="arrow" size={13}/></a></div>}
                  <div className="space-row-tags">{space.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="space-row-price"><b>{space.price}</b><button type="button" onClick={() => setSelected(space)}>Details <Icon name="arrow" size={14}/></button></div>
              </article>;
            })}
            {visibleSpaces.length === 0 && <div className="empty-state"><h2>No places found</h2><p>Try another search or clear a filter.</p><button onClick={() => { setQuery(""); setNeighborhood("All neighborhoods"); setActiveFilter("All"); }}>Clear filters</button></div>}
          </div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">cc</span><span className="brand-name">Charm City<br/><b>Cowork</b></span></a><span>Baltimore, Maryland</span><a href="#top">Back to top ↑</a></footer>
      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="space-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}><button className="modal-close" data-dialog-initial onClick={() => setSelected(null)} aria-label="Close details"><Icon name="close"/></button><img className="modal-photo" src={venuePhotos[selected.id].src} alt={venuePhotos[selected.id].alt}/><div className="modal-content"><p className="eyebrow">{selected.type} · {selected.neighborhood}</p><h2 id="modal-title">{selected.name}</h2><div className="modal-rating"><b>{selected.price}</b></div><div className="modal-details"><span><Icon name="pin" size={16}/>{selected.address}{selected.zipCode && ` · ${selected.zipCode}`}</span><span><Icon name="clock" size={16}/>{selected.hours}</span></div>{selected.websiteUrl && <p className="official-site-link"><a href={selected.websiteUrl} target="_blank" rel="noreferrer">Official site <Icon name="arrow" size={14}/></a></p>}{selected.menu && selected.menu.length > 0 && <section className="menu-details" aria-labelledby="menu-heading"><div className="menu-details-heading"><div><p className="eyebrow">Menu</p><h3 id="menu-heading">What they serve</h3></div><a href={selected.menuUrl} target="_blank" rel="noreferrer">Full menu <Icon name="arrow" size={14}/></a></div>{Array.from(new Set(selected.menu.map((item) => item.category))).map((category) => <div className="menu-category" key={category}><h4>{category}</h4><ul>{selected.menu?.filter((item) => item.category === category).map((item) => <li key={item.name}><div><b>{item.name}</b>{item.description && <p>{item.description}</p>}</div><span>{item.price}</span></li>)}</ul></div>)}<p className="menu-source-note">Menu and prices may change.</p></section>}</div></section></div>}
      {submitOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSubmitOpen(false); }}><section className="submit-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title" tabIndex={-1}><button className="modal-close" data-dialog-initial onClick={() => setSubmitOpen(false)} aria-label="Close form"><Icon name="close"/></button>{submitted ? <><p className="eyebrow">Thanks for the tip</p><h2 id="submit-title">Suggestion received.</h2><p>This prototype doesn’t publish suggestions yet.</p><button className="primary-button" onClick={() => setSubmitOpen(false)}>Done</button></> : <><p className="eyebrow">Help others find it</p><h2 id="submit-title">Suggest a place</h2><form className="submit-form" onSubmit={submitSpace}><label>Place name<input required placeholder="Coffee shop, library, or workspace"/></label><label>Neighborhood<select required defaultValue=""><option value="" disabled>Choose neighborhood</option>{neighborhoods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label>Address<input required placeholder="Street address"/></label><label>What should people know? <span>(optional)</span><textarea rows={2} placeholder="Quiet, good coffee, lots of outlets…"/></label><button className="primary-button" type="submit">Send suggestion</button></form></>}</section></div>}
    </div>
  );
}

export default App;
