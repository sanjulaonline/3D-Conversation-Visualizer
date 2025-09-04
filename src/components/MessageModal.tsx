import type React from "react"

interface MessageModalProps {
  message: string | null
  onClose: () => void
}

const MessageModal: React.FC<MessageModalProps> = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white z-50 p-5 rounded-lg max-w-[80vw]">
      <button onClick={onClose} className="absolute top-2 right-2 text-xl hover:text-gray-300">
        ✕
      </button>
      <div className="whitespace-pre-line">{message}</div>
    </div>
  )
}

export default MessageModal
