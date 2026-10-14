import type { Product } from './data'
export function ProductArt({ product, className = '' }: { product: Product; className?: string }) {
  return <img className={`product-art ${className}`} src={`/images/${product.art}.svg`} alt={`${product.name} in ${product.color}`} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.svg' }} />
}
