import { useMemo, useState } from 'react'
import MenuList from './components/MenuList'
import OrderCart from './components/OrderCart'
import CheckoutPanel from './components/CheckoutPanel'
import ReceiptModal from './components/ReceiptModal'

export default function App() {
  const [cart, setCart] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [receiptText, setReceiptText] = useState('')

  const addToCart = (menuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item_id === menuItem._id)
      if (existing) {
        return prev.map((i) => (i.item_id === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [
        ...prev,
        {
          item_id: menuItem._id,
          name: menuItem.name,
          quantity: 1,
          unit_price: Number(menuItem.price),
        },
      ]
    })
  }

  const inc = (id) => setCart((prev) => prev.map((i) => (i.item_id === id ? { ...i, quantity: i.quantity + 1 } : i)))
  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.item_id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    )
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.item_id !== id))

  const onOrderComplete = (_order, receipt) => {
    setReceiptText(receipt)
    setModalOpen(true)
    setCart([])
  }

  const taxInfo = useMemo(() => {
    const subtotal = cart.reduce((s, it) => s + it.quantity * it.unit_price, 0)
    const tax = +(subtotal * 0.1).toFixed(2)
    const total = +(subtotal + tax).toFixed(2)
    return { subtotal, tax, total }
  }, [cart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Restaurant POS</h1>
          <p className="text-gray-600">Take orders, charge payment, and print receipts.</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <MenuList onAdd={addToCart} />
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-6">
            <div className="bg-white/70 backdrop-blur rounded-xl border p-4">
              <OrderCart cart={cart} onInc={inc} onDec={dec} onRemove={removeItem} />
            </div>
            <div className="bg-white/70 backdrop-blur rounded-xl border p-4">
              <CheckoutPanel cart={cart} onOrderComplete={onOrderComplete} />
              <div className="text-xs text-gray-500 mt-2">Subtotal ${taxInfo.subtotal.toFixed(2)} • Tax ${taxInfo.tax.toFixed(2)} • Total ${taxInfo.total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <ReceiptModal open={modalOpen} onClose={() => setModalOpen(false)} receiptText={receiptText} />
    </div>
  )
}
