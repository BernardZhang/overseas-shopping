import { products } from './data.ts'
import type { Product } from './data.ts'
export type Cart = Record<string, number>
export type Sort = 'featured' | 'ascending' | 'descending'
export type Price = 'all' | 'under' | 'middle' | 'over'
export const STORAGE_KEY = 'everyday-edit:cart:v1'
export function filterProducts(list: Product[], query: string, category: string, price: Price, sort: Sort) {
  const q = query.trim().toLowerCase()
  return list.filter(p => (!q || `${p.name} ${p.description}`.toLowerCase().includes(q)) && (category === 'All' || p.category === category) && (price === 'all' || (price === 'under' && p.priceCents < 5000) || (price === 'middle' && p.priceCents >= 5000 && p.priceCents <= 10000) || (price === 'over' && p.priceCents > 10000))).sort((a, b) => (sort === 'ascending' ? a.priceCents - b.priceCents : sort === 'descending' ? b.priceCents - a.priceCents : 0) || a.featuredRank - b.featuredRank)
}
export function parseCart(raw: string | null): Cart {
  if (!raw) return {}
  try {
    const value = JSON.parse(raw)
    if (value?.version !== 1 || !value.items || typeof value.items !== 'object' || Array.isArray(value.items)) return {}
    return Object.fromEntries(Object.entries(value.items).filter(([id, qty]) => products.some(p => p.id === id) && Number.isInteger(qty) && Number(qty) >= 1 && Number(qty) <= 10)) as Cart
  } catch { return {} }
}
export type Action = { type: 'add' | 'remove' | 'decrease'; id: string }
export function cartReducer(cart: Cart, action: Action): Cart {
  if (!products.some(p => p.id === action.id)) return cart
  const qty = cart[action.id] || 0
  if (action.type === 'remove') { const next = { ...cart }; delete next[action.id]; return next }
  if (action.type === 'add') return { ...cart, [action.id]: Math.min(10, qty + 1) }
  return qty > 1 ? { ...cart, [action.id]: qty - 1 } : cart
}
export const subtotal = (cart: Cart) => products.reduce((sum, p) => sum + p.priceCents * (cart[p.id] || 0), 0)
