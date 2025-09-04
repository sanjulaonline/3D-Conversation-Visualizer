import type React from "react"

interface MessageModalProps {
  message: string | null
  onClose: () => void
}

const MessageModal: React.FC<MessageModalProps> = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md text-white z-50 p-6 rounded-xl max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw] border border-slate-600 shadow-2xl">
      <button 
        onClick={onClose} 
        className="absolute top-3 right-3 text-xl hover:text-gray-300 transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
      >
        ✕
      </button>
      <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed pr-8">
        {message}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-600">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default MessageModal
