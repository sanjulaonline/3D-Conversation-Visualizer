import type React from "react"
import { WordCountWarning } from "@/types"

interface ControlsProps {
  autoRotation: boolean
  onAutoRotationChange: (checked: boolean) => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
  wordCount: number
  onWordCountChange: (count: number) => void
  wordCountWarning: WordCountWarning
}

const Controls: React.FC<ControlsProps> = ({
  autoRotation,
  onAutoRotationChange,
  onToggleFullscreen,
  isFullscreen,
  wordCount,
  onWordCountChange,
  wordCountWarning,
}) => {
  return (
    <div className="flex gap-4 items-center text-sm">
      <label className="flex items-center gap-1">
        <input 
          type="checkbox" 
          checked={autoRotation} 
          onChange={(e) => onAutoRotationChange(e.target.checked)} 
        />
        Auto Rotate
      </label>
      <button 
        onClick={onToggleFullscreen} 
        className="px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
      >
        {isFullscreen ? "[ ] Exit Fullscreen" : "[ ] Fullscreen"}
      </button>
      <div>📊 Displaying top {wordCount} words from your conversations</div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={wordCount}
          onChange={(e) => onWordCountChange(Number.parseInt(e.target.value))}
          className="w-20"
        />
        <span>{wordCount}</span>
        <span className={`font-bold ${wordCountWarning.color}`}>
          {wordCountWarning.text}
        </span>
      </div>
    </div>
  )
}

export default Controls
