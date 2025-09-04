import type React from "react"

interface HowToModalProps {
  isOpen: boolean
  onClose: () => void
}

const HowToModal: React.FC<HowToModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 text-white z-50 overflow-auto p-4 sm:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How to Export ChatGPT Conversations as JSON
          </h2>
          <button 
            onClick={onClose} 
            className="text-2xl hover:text-gray-300 transition-colors p-2 hover:bg-slate-800 rounded-lg"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4 text-base sm:text-lg">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
              Go to <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">chat.openai.com</a> and log in.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
              Click your profile icon in the bottom left corner.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
              Select "Settings & Beta" from the menu.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
              Click on "Data Controls" in the left sidebar.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
              Click "Export data" and confirm your request.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
              Wait for the email with your data download link.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="flex items-center gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">7</span>
              Download and extract the ZIP file, then upload the 
              <code className="bg-slate-700 px-2 py-1 rounded text-blue-300 mx-1">conversations.json</code> 
              file here.
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium transition-all duration-200 text-center"
          >
            Got it!
          </button>
          <a
            href="https://chat.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-lg font-medium transition-all duration-200 text-center"
          >
            Open ChatGPT
          </a>
        </div>
      </div>
    </div>
  )
}

export default HowToModal
