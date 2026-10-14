import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { cartReducer, parseCart, STORAGE_KEY } from './logic'
import type { Action, Cart } from './logic'
type CartValue = { cart: Cart; dispatch: Dispatch<Action>; storageError: boolean }
const Context = createContext<CartValue | null>(null)
export function CartProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => { try { return { cart: parseCart(localStorage.getItem(STORAGE_KEY)), error: false } } catch { return { cart: {}, error: true } } })
  const [cart, dispatch] = useReducer(cartReducer, initial.cart)
  const [storageError, setStorageError] = useState(initial.error)
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: cart })); setStorageError(false) } catch { setStorageError(true) } }, [cart])
  return <Context.Provider value={{ cart, dispatch, storageError }}>{children}</Context.Provider>
}
export function useCart() { const value = useContext(Context); if (!value) throw new Error('CartProvider is required'); return value }
