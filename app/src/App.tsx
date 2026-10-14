import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight, Check, CheckCircle2, Leaf, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, X } from 'lucide-react'
import { products, money } from './data'
import type { Product } from './data'
import { filterProducts, subtotal } from './logic'
import type { Price, Sort } from './logic'
import { CartProvider, useCart } from './cart'
import { ProductArt } from './ProductArt'
import './App.css'

function Modal({ children, title, kind, onClose }: { children: ReactNode; title: string; kind: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    const dialog = ref.current!
    const trigger = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow; trigger?.focus() }
  }, [])
  return <dialog ref={ref} className={`modal ${kind}`} aria-label={title} onCancel={e => { e.preventDefault(); close.current() }} onClick={e => { if (e.target === e.currentTarget) close.current() }}>
    <div className="modal-inner"><button autoFocus className="icon-button modal-close" aria-label={`Close ${kind === 'cart-modal' ? 'cart' : 'product details'}`} onClick={onClose}><X size={22} /></button>{children}</div>
  </dialog>
}

function Store() {
  const { cart, dispatch, storageError } = useCart()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState<Price>('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [modal, setModal] = useState<'cart' | Product | null>(null)
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null)
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const visible = useMemo(() => filterProducts(products, query, category, price, sort), [query, category, price, sort])
  const hasFilters = !!query || category !== 'All' || price !== 'all' || sort !== 'featured'
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 3200); return () => clearTimeout(t) }, [toast])
  const add = (p: Product) => {
    if ((cart[p.id] || 0) >= 10) return
    dispatch({ type: 'add', id: p.id })
    setToast({ message: `${p.name} added to your bag.`, id: Date.now() })
  }
  const reset = () => { setQuery(''); setCategory('All'); setPrice('all'); setSort('featured') }
  return <>
    <a className="skip-link" href="#collection">Skip to collection</a>
    <div className="announcement">Considered essentials. Everyday joy. <span>Explore the edit <ArrowDown size={12} /></span></div>
    <header className="header">
      <a href="#" className="brand" aria-label="Everyday Edit home"><span className="brand-mark">e.</span>everyday edit<span className="brand-dot">®</span></a>
      <nav aria-label="Main navigation"><a className="nav-active" href="#collection">Shop the edit</a><a href="#our-story">Our philosophy</a></nav>
      <button className="bag-button" onClick={() => setModal('cart')} aria-label={`Open shopping bag, ${count} items`}><ShoppingBag size={19} /><span>Bag</span><span className="bag-count">{count}</span></button>
    </header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><span className="eyebrow"><span className="tiny-line" /> THE EVERYDAY COLLECTION</span><h1 id="hero-title">Good things.<br /><em>For everyday living.</em></h1><p>Thoughtfully chosen essentials for your home,<br className="desktop-break" /> your adventures, and the moments in between.</p><a className="primary-button" href="#collection">Find your everyday <ArrowRight size={18} /></a><div className="hero-note"><Leaf size={16} /> Fewer things. Better choices.</div></div>
        <div className="hero-art" aria-label="Illustration of a vase, tote, and lamp from the collection" role="img"><div className="hero-circle" /><img className="hero-vase" src="/images/vase-hero.svg" alt="" /><img className="hero-lamp" src="/images/lamp-hero.svg" alt="" /><img className="hero-tote" src="/images/tote-hero.svg" alt="" /><div className="hero-sticker"><Sparkles size={20} /><span>Small details.<br />Big difference.</span></div><span className="hero-caption">THE BEAUTY IN THE ORDINARY</span></div>
      </section>
      <section id="collection" className="collection" aria-labelledby="collection-title">
        <div className="collection-heading"><div><span className="eyebrow">CURATED WITH CARE</span><h2 id="collection-title">Meet your new essentials<span>.</span></h2></div><p>Made for the way you live.</p></div>
        <div className="catalog-toolbar">
          <div className="category-tabs" role="group" aria-label="Product category">{['All', 'Home', 'Travel', 'Desk'].map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c === 'All' ? 'All essentials' : c}</button>)}</div>
          <div className="search-box"><Search size={17} /><label className="sr-only" htmlFor="search">Search essentials</label><input id="search" placeholder="Search essentials..." value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}</div>
        </div>
        <div className="results-toolbar"><span aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? 'essential' : 'essentials'}{category !== 'All' ? ` for ${category.toLowerCase()}` : ' to make your own'}</span><div className="selects"><div className="select-field"><SlidersHorizontal size={14} /><label htmlFor="price" className="sr-only">Price range</label><select id="price" value={price} onChange={e => setPrice(e.target.value as Price)}><option value="all">All prices</option><option value="under">Under $50</option><option value="middle">$50–$100</option><option value="over">Over $100</option></select></div><div className="select-field"><label htmlFor="sort">Sort by:</label><select id="sort" value={sort} onChange={e => setSort(e.target.value as Sort)}><option value="featured">Featured</option><option value="ascending">Price: Low to High</option><option value="descending">Price: High to Low</option></select></div></div></div>
        {hasFilters && <div className="active-filters"><span>Showing your selection</span><button onClick={reset}>Clear all <X size={13} /></button></div>}
        {visible.length ? <div className="product-grid">{visible.map(p => <article key={p.id} className="product-card" data-product={p.id}><button className="product-image" aria-label={`View ${p.name}`} onClick={() => setModal(p)}><ProductArt product={p} />{p.tag && <span className={`product-tag ${p.tag === 'New arrival' ? 'green-tag' : ''}`}>{p.tag}</span>}<span className="view-detail">Take a closer look <ArrowRight size={15} /></span></button><div className="product-meta"><span>{p.category}</span><span className="rating" title="Simulated demo rating"><Star size={11} fill="currentColor" /> {p.rating.toFixed(1)}</span></div><div className="product-title-row"><h3><button onClick={() => setModal(p)}>{p.name}</button></h3><span className="product-price">{money(p.priceCents)}</span></div><p>{p.description}</p><button className="card-add" onClick={() => add(p)} disabled={(cart[p.id] || 0) >= 10} aria-label={`Add ${p.name} to bag`}><span>{(cart[p.id] || 0) >= 10 ? 'Limit reached · 10 in bag' : 'Add to bag'}</span><Plus size={17} /></button></article>)}</div> : <div className="empty-state"><Search size={32} /><h3>No essentials found</h3><p>Try another search or give your filters a fresh start.</p><button className="primary-button" onClick={reset}>Clear all filters <ArrowRight size={17} /></button></div>}
        <p className="demo-note">A considered collection, imagined for this demo. Product ratings are simulated.</p>
      </section>
      <section id="our-story" className="philosophy"><span className="eyebrow">LESS, BUT BETTER</span><h2>A little more intention.<br /><em>A little more everyday joy.</em></h2><p>We believe the things you bring into your life should earn their place.<br className="desktop-break" /> Useful, beautiful, and a pleasure to reach for. That’s our edit.</p><Leaf size={24} /></section>
    </main>
    <footer><a className="brand" href="#">everyday edit<span className="brand-dot">®</span></a><span>A demo store. No real purchases.</span><span>English · USD $</span><span>© {new Date().getFullYear()} Everyday Edit</span></footer>
    {storageError && <div className="storage-notice" role="status">Your bag works for this visit, but this browser can’t save it for later.</div>}
    <div className="toast-region" aria-live="polite" aria-atomic="true">{toast && <div className="toast" key={toast.id}><CheckCircle2 size={20} /><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={16} /></button></div>}</div>
    {modal && <Modal key={modal === 'cart' ? 'cart' : modal.id} title={modal === 'cart' ? 'Your shopping bag' : modal.name} kind={modal === 'cart' ? 'cart-modal' : 'detail-modal'} onClose={() => setModal(null)}>{modal === 'cart' ? <><div className="cart-heading"><span className="eyebrow">YOUR EVERYDAY EDIT</span><h2>Your bag <span>({count})</span></h2></div>{count ? <><div className="cart-items">{products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><ProductArt product={p} /><div className="cart-item-copy"><span className="eyebrow">{p.category}</span><h3>{p.name}</h3><p>{p.color} · {money(p.priceCents)} each</p><div className="quantity-row"><div className="quantity-control"><button disabled={cart[p.id] <= 1} aria-label={`Decrease ${p.name} quantity`} onClick={() => dispatch({ type: 'decrease', id: p.id })}><Minus size={14} /></button><output aria-label={`${p.name} quantity`}>{cart[p.id]}</output><button disabled={cart[p.id] >= 10} aria-label={`Increase ${p.name} quantity`} onClick={() => dispatch({ type: 'add', id: p.id })}><Plus size={14} /></button></div><button className="remove-button" aria-label={`Remove ${p.name}`} onClick={() => dispatch({ type: 'remove', id: p.id })}>Remove</button></div>{cart[p.id] >= 10 && <p className="limit-note">Maximum 10 per item.</p>}</div><strong className="line-price">{money(p.priceCents * cart[p.id])}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal (USD)</span><strong>{money(subtotal(cart))}</strong></div><p>Shipping and taxes are not calculated in this demo.</p><div className="demo-checkout"><Check size={16} /><span>Your edit is ready. This is a demo bag — no payment or order will be placed.</span></div><button className="primary-button" onClick={() => setModal(null)}>Keep exploring <ArrowRight size={17} /></button></div></> : <div className="empty-state cart-empty"><ShoppingBag size={40} /><h3>Your bag is waiting</h3><p>Find a little something for your everyday.</p><button className="primary-button" onClick={() => setModal(null)}>Explore the collection <ArrowRight size={17} /></button></div>}</> : <div className="detail-layout"><div className="detail-image"><ProductArt product={modal} /></div><div className="detail-copy"><span className="eyebrow">{modal.category} / THE EVERYDAY COLLECTION</span><h2>{modal.name}</h2><div className="detail-price">{money(modal.priceCents)} <span><Star size={13} fill="currentColor" /> {modal.rating} <small>Demo rating</small></span></div><p className="detail-description">{modal.detail}</p><dl><div><dt>Material</dt><dd>{modal.material}</dd></div><div><dt>Dimensions</dt><dd>{modal.dimensions}</dd></div><div><dt>Color</dt><dd>{modal.color}</dd></div></dl><button className="primary-button detail-add" disabled={(cart[modal.id] || 0) >= 10} onClick={() => add(modal)}>{(cart[modal.id] || 0) >= 10 ? 'Limit reached · 10 in bag' : `Add to bag — ${money(modal.priceCents)}`}<Plus size={18} /></button>{cart[modal.id] > 0 && <button className="text-button" onClick={() => setModal('cart')}>View your bag ({count}) <ArrowRight size={16} /></button>}<p className="detail-footnote"><Leaf size={14} /> Thoughtfully chosen for everyday living.</p></div></div>}</Modal>}
  </>
}
export default function App() { return <CartProvider><Store /></CartProvider> }
