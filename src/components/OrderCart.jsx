import { Minus, Plus, Trash } from 'lucide-react'

export default function OrderCart({ cart, onInc, onDec, onRemove }) {
  const subtotal = cart.reduce((s, it) => s + it.quantity * it.unit_price, 0)
  const tax = +(subtotal * 0.1).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Order</h2>
      {cart.length === 0 ? (
        <div className="text-sm text-gray-500">No items yet. Add from menu.</div>
      ) : (
        <div className="space-y-2">
          {cart.map((it) => (
            <div key={it.item_id} className="flex items-center justify-between bg-white rounded border p-2">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-gray-500">${it.unit_price.toFixed(2)} each</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onDec(it.item_id)} className="p-1 rounded border hover:bg-gray-50"><Minus size={16} /></button>
                <div className="w-8 text-center">{it.quantity}</div>
                <button onClick={() => onInc(it.item_id)} className="p-1 rounded border hover:bg-gray-50"><Plus size={16} /></button>
                <button onClick={() => onRemove(it.item_id)} className="p-1 rounded border text-red-600 hover:bg-red-50"><Trash size={16} /></button>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-gray-900 text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  )
}
