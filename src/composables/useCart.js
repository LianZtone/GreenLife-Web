import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'cart.items.v1'

const cartItems = ref([])

function parseStoredItems(value) {
  try {
    if (!value) return []
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []

    // Normalisasi struktur (id, name, image, price, quantity, category)
    return parsed
      .filter(Boolean)
      .map((it) => ({
        id: it.id,
        name: it.name,
        category: it.category ?? it.categoryLabel ?? '',
        image: it.image,
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1
      }))
  } catch {
    return []
  }
}

function formatPriceStringToNumber(price) {
  if (typeof price === 'number') return price
  if (!price) return 0

  // Contoh: "Rp 95.000" -> 95000
  if (typeof price === 'string') {
    const digits = price.replace(/[^0-9]/g, '')
    return Number(digits) || 0
  }

  return 0
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY)
  cartItems.value = parseStoredItems(raw)
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  loadFromStorage()
}

watch(
  cartItems,
  (items) => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  { deep: true }
)

function addToCart(product, quantity = 1) {
  if (!product) return

  const id = product.id
  if (id === undefined || id === null) return

  const price = formatPriceStringToNumber(product.price ?? product.currentPrice)

  const normalized = {
    id,
    name: product.name,
    category: product.category ?? product.categoryLabel ?? '',
    image: product.image,
    price,
    quantity: Number(quantity) || 1
  }

  const existing = cartItems.value.find((i) => i.id === id)
  if (existing) {
    existing.quantity += normalized.quantity
  } else {
    cartItems.value.push(normalized)
  }
}

function removeFromCart(id) {
  cartItems.value = cartItems.value.filter((i) => i.id !== id)
}

function increaseQty(id) {
  const item = cartItems.value.find((i) => i.id === id)
  if (!item) return
  item.quantity += 1
}

function decreaseQty(id) {
  const item = cartItems.value.find((i) => i.id === id)
  if (!item) return
  item.quantity = Math.max(1, item.quantity - 1)
}

function clearCart() {
  cartItems.value = []
}

const cartCount = computed(() => cartItems.value.reduce((sum, it) => sum + (it.quantity || 0), 0))

export function useCart() {
  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  }
}

