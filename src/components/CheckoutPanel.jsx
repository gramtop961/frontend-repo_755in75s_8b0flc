import { useState } from 'react'

const API_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function CheckoutPanel({ cart, onOrderComplete }) {
  const [tableNumber, setTableNumber] = useState('')
  const [payment, setPayment] = useState('cash')
  const [loading, setLoading] = useState(false)

  const subtotal = cart.reduce((s, it) => s + it.quantity * it.unit_price, 0)
  const tax = +(subtotal * 0.1).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  const placeOrder = async () => {
    if (cart.length === 0) return
    setLoading(true)
    try {
      const payload = {
        table_number: tableNumber || undefined,
        items: cart.map(it => ({
          item_id: it.item_id,
          name: it.name,
          quantity: it.quantity,
          unit_price: it.unit_price,
          notes: it.notes || undefined,
        })),
        subtotal: +subtotal.toFixed(2),
        tax,
        total,
        status: 'paid',
        payment_method: payment,
      }
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const order = await res.json()
      if (res.ok) {
        const rres = await fetch(`${API_URL}/orders/${order._id}/receipt`)
        const rdata = await rres.json()
        onOrderComplete(order, rdata.receipt_text)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Checkout</h2>
      <input className="w-full px-3 py-2 rounded border" placeholder="Table number / Name" value={tableNumber} onChange={e=>setTableNumber(e.target.value)} />
      <select className="w-full px-3 py-2 rounded border" value={payment} onChange={e=>setPayment(e.target.value)}>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>
      <button onClick={placeOrder} disabled={loading || cart.length===0} className="w-full bg-emerald-600 text-white rounded py-2 font-medium hover:bg-emerald-700 disabled:opacity-60">
        {loading ? 'Placing Order…' : `Pay $${total.toFixed(2)}`}
      </button>
    </div>
  )
}
