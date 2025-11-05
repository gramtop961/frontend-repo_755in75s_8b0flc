import React, { useMemo, useState } from 'react';

const currency = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export default function CheckoutPanel({ cart, onCheckout }) {
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [orderNotes, setOrderNotes] = useState('');

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const vat = subtotal * 0.12; // 12% VAT
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [cart]);

  const disabled = cart.length === 0 || !tableNumber;

  const placeOrder = () => {
    const payload = {
      tableNumber,
      paymentMethod,
      orderNotes,
      items: cart.map(({ id, name, quantity, price }) => ({ id, name, quantity, price })),
      totals,
    };
    onCheckout(payload);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Checkout</h2>

      <div className="bg-white rounded-xl shadow border p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Table / Name</label>
            <input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="e.g. Table 5 or Juan D."
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Payment</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Cash</option>
              <option>GCash</option>
              <option>Credit/Debit Card</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes for Kitchen</label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Less rice, extra spicy, no peanuts, etc."
            rows={3}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Subtotal</div>
          <div className="text-right font-medium">{currency.format(totals.subtotal)}</div>
          <div className="text-gray-500">VAT (12%)</div>
          <div className="text-right font-medium">{currency.format(totals.vat)}</div>
          <div className="text-gray-700">Total</div>
          <div className="text-right text-lg font-semibold">{currency.format(totals.total)}</div>
        </div>

        <button
          disabled={disabled}
          onClick={placeOrder}
          className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-medium px-4 py-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place order & Print Kitchen Ticket
        </button>
      </div>
    </section>
  );
}
