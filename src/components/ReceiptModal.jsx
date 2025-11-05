import { useEffect, useRef } from 'react'
import { X, Printer } from 'lucide-react'

export default function ReceiptModal({ open, onClose, receiptText }) {
  const ref = useRef(null)

  useEffect(() => {
    if (open && ref.current) {
      ref.current.focus()
    }
  }, [open])

  if (!open) return null

  const printNow = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[480px] max-w-[92vw] rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold">Receipt</div>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="p-4">
          <pre ref={ref} className="whitespace-pre-wrap text-sm bg-gray-50 border rounded p-3 max-h-[50vh] overflow-auto">
{receiptText}
          </pre>
          <button onClick={printNow} className="mt-3 w-full bg-gray-900 text-white rounded py-2 flex items-center justify-center gap-2 print:hidden">
            <Printer size={18} /> Print
          </button>
        </div>
      </div>
    </div>
  )
}
