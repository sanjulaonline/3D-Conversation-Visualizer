import type React from "react"

interface HowToModalProps {
  isOpen: boolean
  onClose: () => void
}

const HowToModal: React.FC<HowToModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 text-white z-50 overflow-auto p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">How to Export ChatGPT Conversations as JSON</h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-300">
            ✕
          </button>
        </div>
        <div className="space-y-4 text-lg">
          <p>1. Go to chat.openai.com and log in.</p>
          <p>
            2. Open your conversation and click the <kbd className="bg-gray-700 px-1 rounded">⋮</kbd> menu in the
            top-right of the chat window.
          </p>
          <p>3. Select "Export data" and choose JSON format.</p>
          <p>
            4. Save the downloaded <code className="bg-gray-700 px-1 rounded">conversations.json</code> file.
          </p>
          <p>5. Upload it here to visualize.</p>
        </div>
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

export default HowToModal
