import React, { useEffect } from 'react';

export default function KitchenTicket({ open, order, onClose }) {
  useEffect(() => {
    if (open && order) {
      // Focus print automatically to speed up workflow
      // Delay slightly to ensure DOM is painted
      const t = setTimeout(() => window.print(), 250);
      return () => clearTimeout(t);
    }
  }, [open, order]);

  if (!open || !order) return null;

  const { orderId, createdAt, tableNumber, items, orderNotes } = order;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border print:shadow-none print:border-0 print:rounded-none print:max-w-none print:w-[100%]">
        <div className="p-4 border-b flex items-center justify-between print:hidden">
          <h3 className="font-semibold">Kitchen Ticket</h3>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <div className="p-4 text-sm">
          <div className="text-center font-bold text-gray-900">KITCHEN ORDER</div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-gray-700">
            <div>Order #: <span className="font-semibold">{orderId}</span></div>
            <div className="text-right">{new Date(createdAt).toLocaleString()}</div>
            <div className="col-span-2">Table/Name: <span className="font-semibold">{tableNumber}</span></div>
          </div>

          <div className="mt-4 border-t pt-2">
            {items.map((it) => (
              <div key={it.id} className="py-2 flex items-start gap-3">
                <div className="w-8 text-right font-bold text-gray-900">{it.quantity}×</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{it.name}</div>
                  {it.note ? (
                    <div className="text-[12px] text-gray-600">Note: {it.note}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {orderNotes ? (
            <div className="mt-3 p-2 bg-yellow-50 border rounded text-[12px]">
              <span className="font-semibold">Order Notes: </span>
              {orderNotes}
            </div>
          ) : null}

          <div className="mt-4 text-center text-xs text-gray-500">Print and attach to the tray</div>
        </div>

        <div className="p-3 border-t flex items-center justify-end gap-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-3 py-2 text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
