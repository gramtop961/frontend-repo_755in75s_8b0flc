import React from 'react';

const currency = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export default function MenuList({ items, onAdd }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow border overflow-hidden flex flex-col"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  {currency.format(item.price)}
                </span>
              </div>
              <button
                onClick={() => onAdd(item)}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-medium px-3 py-2 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Add to order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
