import React from 'react';

const currency = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export default function OrderCart({ cart, onInc, onDec, onRemove, onClear }) {
  const empty = cart.length === 0;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Current Order</h2>
        <button
          onClick={onClear}
          disabled={empty}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-40"
        >
          Clear
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border divide-y">
        {empty ? (
          <div className="p-6 text-center text-gray-500">No items yet.</div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{currency.format(item.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDec(item.id)}
                  className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-50"
                >
                  −
                </button>
                <div className="w-8 text-center">{item.quantity}</div>
                <button
                  onClick={() => onInc(item.id)}
                  className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold">
                {currency.format(item.price * item.quantity)}
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-end gap-6">
        <div className="text-sm text-gray-500">Subtotal</div>
        <div className="text-lg font-semibold">{currency.format(subtotal)}</div>
      </div>
    </section>
  );
}
