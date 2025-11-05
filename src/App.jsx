import React, { useMemo, useState } from 'react';
import MenuList from './components/MenuList.jsx';
import OrderCart from './components/OrderCart.jsx';
import CheckoutPanel from './components/CheckoutPanel.jsx';
import KitchenTicket from './components/KitchenTicket.jsx';

const sampleMenu = [
  {
    id: 'adobo',
    name: 'Chicken Adobo',
    category: 'Main',
    price: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1604908553980-7f5e2f6ff8ad?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'sinigang',
    name: 'Sinigang na Baboy',
    category: 'Soup',
    price: 220,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'sisig',
    name: 'Pork Sisig',
    category: 'Main',
    price: 200,
    imageUrl:
      'https://images.unsplash.com/photo-1625944523862-63eefd16ddb3?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'halo',
    name: 'Halo-Halo',
    category: 'Dessert',
    price: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1653068044030-702d002b4b79?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'lumpia',
    name: 'Lumpiang Shanghai',
    category: 'Starter',
    price: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'silog',
    name: 'Tapsilog',
    category: 'All-day',
    price: 160,
    imageUrl:
      'https://images.unsplash.com/photo-1611171711524-06fd71a5a0dc?q=80&w=1600&auto=format&fit=crop',
  },
];

const currency = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
});

export default function App() {
  const [menu] = useState(sampleMenu);
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [showKitchen, setShowKitchen] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i))
        .filter((i) => i.quantity > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const vat = subtotal * 0.12;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [cart]);

  const handleCheckout = (payload) => {
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    const createdAt = new Date().toISOString();
    const order = {
      orderId,
      createdAt,
      tableNumber: payload.tableNumber,
      paymentMethod: payload.paymentMethod,
      orderNotes: payload.orderNotes,
      items: payload.items.map((i) => ({ ...i })),
      totals: payload.totals,
    };
    setLastOrder(order);
    setShowKitchen(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kusina POS</h1>
          <div className="text-sm text-gray-600">Total: <span className="font-semibold">{currency.format(totals.total)}</span></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MenuList items={menu} onAdd={addToCart} />
        </div>
        <div className="space-y-6">
          <OrderCart cart={cart} onInc={inc} onDec={dec} onRemove={removeItem} onClear={clearCart} />
          <CheckoutPanel cart={cart} onCheckout={handleCheckout} />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} Kusina POS — Prices in Philippine pesos</footer>

      <KitchenTicket
        open={showKitchen}
        order={lastOrder}
        onClose={() => setShowKitchen(false)}
      />
    </div>
  );
}
