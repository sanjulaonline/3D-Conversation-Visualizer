import type React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 text-white z-50 overflow-auto p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-300">
            ✕
          </button>
        </div>
        {children}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
