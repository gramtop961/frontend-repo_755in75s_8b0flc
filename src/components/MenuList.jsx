import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

const API_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function MenuList({ onAdd }) {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', price: '', category: '' })
  const [adding, setAdding] = useState(false)

  const fetchMenu = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/menu`)
      const data = await res.json()
      setMenu(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const addMenuItem = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return
    setAdding(true)
    try {
      const res = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          category: form.category || undefined,
          is_available: true,
        }),
      })
      if (res.ok) {
        setForm({ name: '', price: '', category: '' })
        await fetchMenu()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>

      <form onSubmit={addMenuItem} className="grid grid-cols-12 gap-2 bg-white/60 backdrop-blur p-3 rounded-lg border">
        <input className="col-span-5 px-3 py-2 rounded border" placeholder="Item name" value={form.name} onChange={(e)=>setForm(v=>({...v,name:e.target.value}))} />
        <input className="col-span-3 px-3 py-2 rounded border" placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e)=>setForm(v=>({...v,price:e.target.value}))} />
        <input className="col-span-3 px-3 py-2 rounded border" placeholder="Category" value={form.category} onChange={(e)=>setForm(v=>({...v,category:e.target.value}))} />
        <button disabled={adding} className="col-span-1 bg-emerald-600 text-white rounded flex items-center justify-center hover:bg-emerald-700 disabled:opacity-60">
          <Plus size={18} />
        </button>
      </form>

      {loading ? (
        <div className="text-sm text-gray-500">Loading menu…</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {menu.map((m) => (
            <button key={m._id} onClick={() => onAdd(m)} className="text-left bg-white rounded-lg border p-3 hover:shadow">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-gray-500">${Number(m.price).toFixed(2)} {m.category ? `• ${m.category}` : ''}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
